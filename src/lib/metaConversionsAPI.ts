/**
 * Meta Conversions API Integration
 *
 * IMPORTANTE: Este código es para propósitos de desarrollo/prueba.
 * En producción, el token de acceso NUNCA debe estar en el frontend.
 * Debes usar una función serverless (Vercel, Netlify) o un backend.
 */

const PIXEL_ID = '3094747720691850';
const API_VERSION = 'v18.0';

// Para producción, este token debe estar en variables de entorno del servidor
// NUNCA expongas el token en código del cliente en producción
const ACCESS_TOKEN = import.meta.env.VITE_META_ACCESS_TOKEN || '';

interface UserData {
  em?: string; // Email (hashed)
  ph?: string; // Phone (hashed)
  fn?: string; // First name (hashed)
  ln?: string; // Last name (hashed)
  ct?: string; // City (hashed)
  st?: string; // State (hashed)
  zp?: string; // Zip code (hashed)
  country?: string; // Country (hashed)
  external_id?: string; // External ID (hashed)
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string; // Facebook click ID
  fbp?: string; // Facebook browser ID
}

interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  search_string?: string;
  status?: string;
}

interface EventData {
  event_name: string;
  event_time: number;
  event_id?: string;
  event_source_url?: string;
  action_source: 'website' | 'app' | 'phone_call' | 'chat' | 'email' | 'other';
  user_data: UserData;
  custom_data?: CustomData;
}

/**
 * Hash a string using SHA-256
 * Meta requires user data to be hashed
 */
async function hashData(data: string): Promise<string> {
  if (!data) return '';

  const normalized = data.toLowerCase().trim();
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Get Facebook click ID from cookie
 */
function getFbc(): string | undefined {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbc') return value;
  }
  return undefined;
}

/**
 * Get Facebook browser ID from cookie
 */
function getFbp(): string | undefined {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp') return value;
  }
  return undefined;
}

/**
 * Generate a unique event ID
 */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Send event to Meta Conversions API
 *
 * NOTA: En producción, esta función debe llamar a tu backend/serverless
 * que luego envía el evento a Meta (para proteger el access token)
 */
export async function sendConversionEvent(
  eventName: string,
  userData: Partial<UserData> = {},
  customData: CustomData = {}
): Promise<boolean> {
  try {
    const eventTime = Math.floor(Date.now() / 1000);
    const eventId = generateEventId();

    // Hash user data
    const hashedUserData: UserData = {
      client_user_agent: navigator.userAgent,
      fbc: getFbc(),
      fbp: getFbp(),
    };

    if (userData.em) {
      hashedUserData.em = await hashData(userData.em);
    }
    if (userData.ph) {
      hashedUserData.ph = await hashData(userData.ph);
    }
    if (userData.fn) {
      hashedUserData.fn = await hashData(userData.fn);
    }
    if (userData.ln) {
      hashedUserData.ln = await hashData(userData.ln);
    }

    const eventData: EventData = {
      event_name: eventName,
      event_time: eventTime,
      event_id: eventId,
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: hashedUserData,
      custom_data: customData,
    };

    const payload = {
      data: [eventData],
    };

    // Por ahora solo logueamos - la Conversions API server-side
    // se habilitará cuando configures Vercel con las env vars
    console.log('📊 Meta CAPI Event:', eventName, payload);

    // TODO: Descomentar cuando Vercel esté configurado con META_ACCESS_TOKEN
    // const response = await fetch('/api/meta-conversion', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return true;
  } catch (error) {
    console.error('❌ Error sending Meta CAPI event:', error);
    return false;
  }
}

// ============================================
// Eventos predefinidos para Aventuras Cartagena
// ============================================

/**
 * Track PageView event
 * Nota: El pixel en index.html ya dispara PageView automáticamente
 * Esta función solo envía a la Conversions API (server-side)
 */
export function trackPageView() {
  sendConversionEvent('PageView');
  // El fbq('track', 'PageView') ya se dispara en index.html
}

/**
 * Track ViewContent - cuando ven un tour específico
 */
export function trackViewContent(tourName: string, tourId: string, price: number, currency = 'COP') {
  sendConversionEvent('ViewContent', {}, {
    content_name: tourName,
    content_ids: [tourId],
    content_type: 'product',
    value: price,
    currency,
  });

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: tourName,
      content_ids: [tourId],
      content_type: 'product',
      value: price,
      currency,
    });
  }
}

/**
 * Track InitiateCheckout - cuando hacen clic en WhatsApp para reservar
 */
export function trackInitiateCheckout(tourName: string, tourId: string, price: number, currency = 'COP') {
  sendConversionEvent('InitiateCheckout', {}, {
    content_name: tourName,
    content_ids: [tourId],
    content_type: 'product',
    value: price,
    currency,
    num_items: 1,
  });

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      content_name: tourName,
      content_ids: [tourId],
      content_type: 'product',
      value: price,
      currency,
      num_items: 1,
    });
  }
}

/**
 * Track Lead - cuando envían un mensaje de WhatsApp
 */
export function trackLead(tourName?: string, value?: number, currency = 'COP') {
  sendConversionEvent('Lead', {}, {
    content_name: tourName,
    value,
    currency,
  });

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: tourName,
      value,
      currency,
    });
  }
}

/**
 * Track Contact - cuando hacen clic en el botón de contacto
 */
export function trackContact() {
  console.log('🔔 trackContact() llamado');
  sendConversionEvent('Contact');

  if (typeof window !== 'undefined' && (window as any).fbq) {
    console.log('📤 Disparando fbq Contact...');
    (window as any).fbq('track', 'Contact');
  } else {
    console.warn('⚠️ fbq no está disponible');
  }
}

/**
 * Track Search - si implementan búsqueda
 */
export function trackSearch(searchQuery: string) {
  sendConversionEvent('Search', {}, {
    search_string: searchQuery,
  });

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Search', {
      search_string: searchQuery,
    });
  }
}

/**
 * Track Purchase - cuando confirmas una compra (llamar desde backend idealmente)
 */
export function trackPurchase(
  tourName: string,
  tourId: string,
  value: number,
  currency = 'COP',
  userData: Partial<UserData> = {}
) {
  sendConversionEvent('Purchase', userData, {
    content_name: tourName,
    content_ids: [tourId],
    content_type: 'product',
    value,
    currency,
    num_items: 1,
  });

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      content_name: tourName,
      content_ids: [tourId],
      content_type: 'product',
      value,
      currency,
      num_items: 1,
    });
  }
}
