import { motion } from 'framer-motion';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  MessageCircleMore,
  Sparkles,
} from 'lucide-react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import Map from '../../components/Map/Map';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { trackWhatsAppCtaClick } from '../../utils/analytics';
import {
  campaign,
  faqs,
  heroPhoto,
  photoGallery,
  proofPoints,
  reservationPolicy,
  roomOptions,
  services,
} from './content';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const campaignWhatsappUrl = buildWhatsAppUrl({
  source: 'parasuramericanos-landing',
  message: campaign.whatsappMessage,
  details: {
    Evento: 'Juegos Parasuramericanos Valledupar 2026',
    Ciudad: 'Valledupar',
  },
});

function CampaignCta({ children = campaign.primaryCta, variant = 'solid', size = 'default', ctaLocation }) {
  const className =
    variant === 'outline'
      ? 'inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-secondaryYellow px-6 py-3 text-center font-bold text-primaryGray transition active:scale-[0.98] hover:-translate-y-0.5 hover:bg-secondaryYellow sm:min-h-12'
      : size === 'large'
        ? 'inline-flex min-h-16 items-center justify-center gap-3 rounded-full bg-accentGreen px-8 py-4 text-center text-lg font-black text-white shadow-[0_20px_55px_rgba(76,175,80,0.42)] transition active:scale-[0.98] hover:-translate-y-0.5 hover:bg-secondaryYellow hover:text-primaryGray'
        : 'inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accentGreen px-6 py-3 text-center font-bold text-white shadow-[0_18px_45px_rgba(76,175,80,0.35)] transition active:scale-[0.98] hover:-translate-y-0.5 hover:bg-secondaryYellow hover:text-primaryGray sm:min-h-12';

  return (
    <a href={campaignWhatsappUrl} target="_blank" rel="noopener noreferrer" className={className} aria-label="Consultar disponibilidad por WhatsApp para los Juegos Parasuramericanos Valledupar 2026" onClick={() => trackWhatsAppCtaClick({ ctaLocation, campaign: 'parasuramericanos-2026' })}>
      <MessageCircleMore className="h-5 w-5" />
      {children}
    </a>
  );
}

CampaignCta.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['solid', 'outline']),
  size: PropTypes.oneOf(['default', 'large']),
  ctaLocation: PropTypes.string.isRequired,
};

export default function ParasuramericanosLanding() {
  return (
    <div className="min-h-screen bg-[#fffaf0] pb-28 text-gray-900 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-secondaryYellow/30 bg-[#fffaf0]/95 backdrop-blur">
        <div className="container mx-auto flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between md:py-5">
          <a href="/" className="inline-flex min-h-11 items-center text-xs font-black uppercase tracking-[0.24em] text-primaryGray sm:text-sm sm:tracking-[0.3em]">Hostal Donde Maru</a>
          <div className="flex flex-col gap-1.5 text-xs font-bold text-gray-700 sm:flex-row sm:items-center sm:gap-4 sm:text-sm">
            <span className="hidden items-center gap-2 sm:inline-flex"><CalendarDays className="h-4 w-4 text-accentGreen" /> {campaign.dates}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-accentGreen" /> {campaign.location}</span>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,193,7,0.38),transparent_32%),linear-gradient(135deg,#fffaf0_0%,#ffffff_48%,rgba(76,175,80,0.13)_100%)]">
          <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-secondaryYellow/25 blur-3xl" aria-hidden="true" />
          <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-accentGreen/20 blur-3xl" aria-hidden="true" />

          <div className="container relative mx-auto grid gap-8 px-4 py-10 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:py-24">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accentGreen/20 bg-white/80 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-accentGreen shadow-sm sm:text-xs sm:tracking-[0.22em]">
                <Sparkles className="h-4 w-4" /> {campaign.eyebrow}
              </p>
              <h1 className="max-w-4xl text-[2.45rem] font-black leading-[1] tracking-[-0.045em] text-primaryGray sm:text-5xl md:text-6xl lg:text-7xl">
                {campaign.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg sm:leading-8 md:text-xl">{campaign.intro}</p>

              <div className="mt-5 grid gap-2.5 text-sm text-gray-800 sm:mt-6 sm:grid-cols-3 sm:text-base">
                <span className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-sm">
                  <CalendarDays className="h-5 w-5 text-accentGreen" /> {campaign.dates}
                </span>
                <span className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-sm">
                  <CalendarDays className="h-5 w-5 text-accentGreen" /> {campaign.stayWindow}
                </span>
                <span className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-sm">
                  <MapPin className="h-5 w-5 text-accentGreen" /> {campaign.location}
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CampaignCta ctaLocation="campaign_hero" />
                <a href="#politica" className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-primaryGray px-6 py-3 text-center font-semibold text-primaryGray transition active:scale-[0.98] hover:bg-primaryGray hover:text-white sm:min-h-12">
                  {campaign.secondaryCta}
                </a>
              </div>

            </motion.div>

            <motion.aside className="relative self-start rounded-[1.6rem] bg-primaryGray p-3 text-white shadow-2xl sm:rounded-[2rem] sm:p-4" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="absolute -right-1 -top-3 rounded-2xl bg-secondaryYellow px-3 py-2 text-xs font-black text-primaryGray shadow-lg sm:-right-3 sm:px-4 sm:text-sm">
                Reserva anticipada
              </div>
              <figure className="relative overflow-hidden rounded-[1.35rem] border border-white/15 bg-white/10 sm:rounded-[1.6rem]">
                <img
                  src={heroPhoto.src}
                  alt={heroPhoto.alt}
                  width={heroPhoto.width}
                  height={heroPhoto.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primaryGray/95 via-primaryGray/75 to-transparent px-4 pb-4 pt-12 text-sm font-semibold leading-6 text-white">
                  <span className="mb-1 block text-[0.68rem] font-black uppercase tracking-[0.22em] text-secondaryYellow">Hostal Donde Maru</span>
                  <span>{heroPhoto.caption}</span>
                </figcaption>
              </figure>
              <div className="mt-4 grid gap-2.5 text-sm font-semibold text-white sm:text-base">
                {proofPoints.map((point) => (
                  <span key={point} className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-secondaryYellow" /> {point}
                  </span>
                ))}
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 max-w-3xl sm:mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accentGreen sm:tracking-[0.25em]">Fotos del hostal</p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-primaryGray sm:text-3xl md:text-4xl">Mira donde llegas antes de escribir</h2>
              <p className="mt-4 text-gray-700">Zonas comunes y habitaciones reales para que consultes con mas confianza antes de reservar por WhatsApp.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {photoGallery.map((photo) => (
                <figure key={photo.alt} className="overflow-hidden rounded-3xl border border-gray-100 bg-[#fffaf0] shadow-sm">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="p-4 text-sm font-semibold leading-6 text-primaryGray">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-bold uppercase tracking-[0.25em] text-accentGreen">Habitaciones y servicios</p>
                <h2 className="mt-3 text-3xl font-black text-primaryGray md:text-4xl">Opciones para descanso durante el evento</h2>
              </div>
              <CampaignCta ctaLocation="campaign_rooms_header" variant="outline">Consultar habitacion disponible</CampaignCta>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {roomOptions.map((room) => (
                <article key={room.name} className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <BedDouble className="mb-4 h-9 w-9 text-accentGreen" />
                  <h3 className="text-2xl font-bold text-primaryGray">{room.name}</h3>
                  <p className="mt-3 text-gray-700">{room.description}</p>
                  <a href={campaignWhatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accentGreen/10 px-4 text-sm font-black text-accentGreen transition active:scale-[0.98] group-hover:gap-3 sm:w-auto sm:justify-start sm:bg-transparent sm:px-0" onClick={() => trackWhatsAppCtaClick({
                    ctaLocation: `campaign_room_${room.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`,
                    campaign: 'parasuramericanos-2026',
                    roomType: room.name,
                  })}>
                    Consultar esta opcion <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-primaryGray">Servicios incluidos o sujetos a disponibilidad</h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {services.map((service) => (
                  <li key={service} className="flex gap-3 text-gray-700"><ClipboardCheck className="h-5 w-5 shrink-0 text-accentGreen" /> {service}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="politica" className="scroll-mt-24 py-12 sm:py-16">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-bold uppercase tracking-[0.25em] text-accentGreen">Politica de reserva</p>
              <h2 className="mt-3 text-3xl font-black text-primaryGray md:text-4xl">Reserva conversada, sin pasos confusos</h2>
              <p className="mt-4 text-gray-700">La disponibilidad y condiciones se confirman por WhatsApp para evitar promesas incompletas durante temporada de alta demanda.</p>
            </div>
            <div className="space-y-4">
              {reservationPolicy.map((policy) => (
                <article key={policy.title} className="rounded-3xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-primaryGray">{policy.title}</h3>
                  <p className="mt-2 text-gray-700">{policy.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primaryGray py-12 text-white sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl font-black tracking-[-0.03em] text-secondaryYellow sm:text-3xl md:text-4xl">Listo para consultar fechas?</p>
            <div className="mt-8"><CampaignCta ctaLocation="campaign_bottom_banner" size="large">Escribir a Hostal Donde Maru</CampaignCta></div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 max-w-3xl">
              <p className="font-bold uppercase tracking-[0.25em] text-accentGreen">Preguntas frecuentes</p>
              <h2 className="mt-3 text-3xl font-black text-primaryGray md:text-4xl">Lo que normalmente se confirma antes de viajar</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-3xl bg-gray-50 p-6">
                  <h3 className="text-lg font-bold text-primaryGray">{faq.question}</h3>
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <p className="font-bold uppercase tracking-[0.25em] text-accentGreen">Ubicacion</p>
            </div>
            <div><Map /></div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-secondaryYellow/30 bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-2xl backdrop-blur md:hidden">
        <div className="[&>a]:w-full">
          <CampaignCta ctaLocation="campaign_mobile_sticky">Consultar disponibilidad</CampaignCta>
        </div>
      </div>

      <Footer />
    </div>
  );
}
