/**
 * Serverless Function para Meta Conversions API
 *
 * Este archivo funciona con Vercel Functions.
 * Si usas otro hosting, adapta según su documentación.
 *
 * Variables de entorno necesarias (configurar en Vercel/Netlify):
 * - META_ACCESS_TOKEN: Tu token de acceso de Meta
 * - META_PIXEL_ID: Tu ID de pixel (3094747720691850)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const PIXEL_ID = process.env.META_PIXEL_ID || '3094747720691850';
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';
const API_VERSION = 'v18.0';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar que tenemos el token
  if (!ACCESS_TOKEN) {
    console.error('META_ACCESS_TOKEN not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid payload: data array required' });
    }

    // Agregar IP del cliente si está disponible
    const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
    if (clientIP && data[0]?.user_data) {
      data[0].user_data.client_ip_address = Array.isArray(clientIP) ? clientIP[0] : clientIP;
    }

    // Enviar a Meta Conversions API
    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta API Error:', result);
      return res.status(response.status).json(result);
    }

    console.log('Meta CAPI Success:', result);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error sending to Meta CAPI:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
