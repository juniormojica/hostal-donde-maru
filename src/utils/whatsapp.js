import { trackWhatsAppCtaClick } from './analytics';

export const WHATSAPP_PHONE = '573218710632';

const DEFAULT_MESSAGE = '¡Hola! Me gustaría recibir información para reservar en Hostal Donde Maru.';

const isPresent = (value) => value !== undefined && value !== null && String(value).trim() !== '';

export function buildWhatsAppUrl({ source = 'general', message = DEFAULT_MESSAGE, details = {} } = {}) {
  const detailLines = Object.entries(details)
    .filter(([, value]) => isPresent(value))
    .map(([key, value]) => `${key}: ${String(value).trim()}`);

  const text = [message, isPresent(source) ? `Origen: ${source}` : '', ...detailLines]
    .filter(isPresent)
    .join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function openTrackedWhatsApp({ ctaLocation, tracking = {}, target = '_blank', features = 'noopener,noreferrer', ...whatsappOptions } = {}) {
  trackWhatsAppCtaClick({ ctaLocation, ...tracking });
  window.open(buildWhatsAppUrl(whatsappOptions), target, features);
}
