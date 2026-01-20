import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    id: '1',
    question: '¿Los tours se ofrecen en inglés y español?',
    questionEn: 'Are tours offered in English and Spanish?',
    answer: 'Sí. Contamos con guías bilingües (inglés/español) en la mayoría de tours, por lo que no necesitas dominar el español para disfrutar la experiencia.',
    answerEn: 'Yes. We have bilingual guides (English/Spanish) on most tours, so you don\'t need to speak Spanish to enjoy the experience.',
  },
  {
    id: '2',
    question: '¿Cómo reservo y pago un tour?',
    questionEn: 'How do I book and pay for a tour?',
    answer: 'Puedes reservar fácilmente vía WhatsApp con el botón en cada plan. Aceptamos pagos en línea, tarjetas de crédito y efectivo (USD o COP). La tarifa se muestra en dólares y pesos para tu comodidad.',
    answerEn: 'You can easily book via WhatsApp using the button on each plan. We accept online payments, credit cards and cash (USD or COP). Rates are shown in dollars and pesos for your convenience.',
  },
  {
    id: '3',
    question: '¿Ofrecen opciones vegetarianas o especiales en los almuerzos?',
    questionEn: 'Do you offer vegetarian or special lunch options?',
    answer: '¡Por supuesto! Varios tours incluyen menú con opciones vegetarianas, y podemos acomodar restricciones dietéticas avisando con anticipación.',
    answerEn: 'Of course! Several tours include menus with vegetarian options, and we can accommodate dietary restrictions with advance notice.',
  },
  {
    id: '4',
    question: '¿Es segura Cartagena para los turistas?',
    questionEn: 'Is Cartagena safe for tourists?',
    answer: 'Sí, Cartagena es un destino turístico popular y seguro. Nuestro equipo sigue protocolos de seguridad y te daremos recomendaciones (ej. zonas, horarios) para que disfrutes con tranquilidad.',
    answerEn: 'Yes, Cartagena is a popular and safe tourist destination. Our team follows safety protocols and we will give you recommendations (e.g., areas, schedules) so you can enjoy with peace of mind.',
  },
  {
    id: '5',
    question: '¿Puedo cancelar o reprogramar mi tour?',
    questionEn: 'Can I cancel or reschedule my tour?',
    answer: 'Entendemos que los planes pueden cambiar. Ofrecemos políticas de cancelación flexibles (hasta 24-48h antes) y posibilidad de reprogramar según disponibilidad, para brindarte máxima tranquilidad.',
    answerEn: 'We understand that plans can change. We offer flexible cancellation policies (up to 24-48h before) and the option to reschedule based on availability, to give you maximum peace of mind.',
  },
];

export function FAQSection() {
  const { language, t } = useLanguage();

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card rounded-2xl px-6 shadow-card border border-border/50 data-[state=open]:shadow-card-hover transition-shadow"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:no-underline py-5">
                  {language === 'es' ? faq.question : faq.questionEn}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {language === 'es' ? faq.answer : faq.answerEn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
