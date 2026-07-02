import fachadaCampaign from '../../assets/fachada_modified-campaign.webp';
import h1Campaign from '../../assets/h1-campaign.webp';
import h3Campaign from '../../assets/h3-campaign.webp';
import h4Campaign from '../../assets/h4-campaign.webp';
import p2Campaign from '../../assets/p2-campaign.webp';

export const campaign = {
  eyebrow: 'Reservas para temporada de evento',
  title: 'Hospedaje para los Juegos Parasuramericanos 2026',
  intro:
    'Consulta disponibilidad para viajar a Valledupar con información de habitaciones, servicios y condiciones.',
  dates: 'Evento: 5 al 15 de julio de 2026',
  stayWindow: 'Reservas sugeridas: 2 al 16 de julio',
  location: 'Valledupar, Cesar · Cerca de la UPC',
  primaryCta: 'Consultar disponibilidad por WhatsApp',
  secondaryCta: 'Ver condiciones de reserva',
  whatsappMessage:
    'Hola, vengo de la pagina del Hostal Donde Maru. Quiero consultar disponibilidad para los Juegos Parasuramericanos Valledupar 2026. Mis fechas son: ____. Numero de personas: ____. Tipo de habitacion: ____.',
};

export const proofPoints = [
  'Respuesta directa por WhatsApp',
  'Habitaciones con baño interno y aire acondicionado',
  'Amplio espacio para descansar y organizar la estadia',
];

export const heroPhoto = {
  src: fachadaCampaign,
  alt: 'Fachada real de Hostal Donde Maru en Valledupar',
  caption: 'Fachada del hostal para reconocer el lugar al llegar.',
  width: 1200,
  height: 1600,
};

export const photoGallery = [
  {
    src: p2Campaign,
    alt: 'Pasillo y zona comun real de Hostal Donde Maru en Valledupar',
    caption: 'Zonas comunes.',
    width: 1600,
    height: 1200,
  },
  {
    src: h3Campaign,
    alt: 'Habitacion real de Hostal Donde Maru preparada para huespedes',
    caption: 'Espacio privado para mayor privacidad.',
    width: 1600,
    height: 1200,
  },
  {
    src: h1Campaign,
    alt: 'Habitacion real con cama y espacio privado en Hostal Donde Maru',
    caption: 'Habitaciones compartidas para descansar durante los dias del evento.',
    width: 1600,
    height: 1200,
  },
  {
    src: h4Campaign,
    alt: 'Habitacion real de Hostal Donde Maru con cama y mobiliario',
    caption: 'Habitacion con cama y mobiliario para descansar durante los dias del evento.',
    width: 1600,
    height: 1200,
  },
];
export const roomOptions = [
  {
    name: 'Habitacion individual',
    description: 'Opcion privada para quien necesita dormir bien, organizar su jornada y tener un espacio tranquilo.',
  },
  {
    name: 'Habitacion compartida',
    description: 'Alternativa practica para acompañantes, amigos o grupos pequeños que quieren cuidar presupuesto.',
  },
  {
    name: 'Suite Junior',
    description: 'Mas privacidad y comodidad para estadias de varios dias o viajeros que priorizan recuperacion.',
  },
];

export const services = [
  'Internet WiFi.',
  'Cocina equipada y comedor.',
  'Zonas comunes amplias.',
];

export const reservationPolicy = [
  {
    title: 'Atencion personalizada',
    body: 'Revisamos contigo las fechas, la cantidad de huespedes y el tipo de habitacion que necesitas.',
  },
  {
    title: 'Confirmacion sencilla',
    body: 'Despues de acordar los detalles, puedes asegurar tu reserva con un abono.',
  },
  {
    title: 'Fechas de evento',
    body: 'Durante los dias principales del evento puede manejarse un minimo de noches. Te confirmamos esta informacion segun disponibilidad.',
  },
];

export const faqs = [
  {
    question: 'Como confirmo disponibilidad para las fechas del evento?',
    answer:
      'Usa el boton de WhatsApp e indica fechas, numero de personas y tipo de habitacion. El hostal confirma la disponibilidad.',
  },
  {
    question: 'Cuales fechas deberia consultar?',
    answer:
      'El evento esta previsto del 5 al 15 de julio de 2026. Si viajas por entrenamientos, llegada anticipada o salida posterior, consulta entre el 2 y el 16 de julio.',
  },
  {
    question: 'Puedo preguntar por alojamiento para un grupo?',
    answer:
      'Si. Comparte cuantos viajan, si prefieren habitaciones privadas o compartidas, y cualquier necesidad de descanso o movilidad.',
  },
  {
    question: 'Que servicios estan incluidos?',
    answer:
      'Las opciones publicadas incluyen servicios como WiFi, acceso a cocina, zonas comunes y bano privado segun el tipo de habitacion.',
  },
  {
    question: 'La reserva se hace en una pagina web?',
    answer:
      'La conversion principal es por WhatsApp para resolver detalles del viaje antes de confirmar.',
  },
];
