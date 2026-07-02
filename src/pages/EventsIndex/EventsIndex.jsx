import { ArrowRight, CalendarDays, Home, MapPin } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
import { campaign } from '../ParasuramericanosLanding/content';

const PARASURAMERICANOS_PATH = '/parasuramericanos-valledupar-2026';

const upcomingEvents = [
  {
    title: 'Juegos Parasuramericanos Valledupar 2026',
    dates: '5 al 15 de julio de 2026',
    location: 'Valledupar, Cesar',
    summary:
      'Temporada de alta movilidad para deportistas, familias, acompañantes, voluntarios y prensa que necesitan hospedaje claro en la ciudad.',
    href: PARASURAMERICANOS_PATH,
    cta: 'Ver hospedaje para este evento',
    badge: 'Evento destacado',
  },
];

export default function EventsIndex() {
  return (
    <div className="min-h-screen bg-[#fffaf0] text-gray-900">
      <header className="sticky top-0 z-40 border-b border-secondaryYellow/30 bg-[#fffaf0]/95 backdrop-blur">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
          <a href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-primaryGray sm:tracking-[0.3em]">
            <Home className="h-4 w-4 text-accentGreen" /> Hostal Donde Maru
          </a>
          <a href={PARASURAMERICANOS_PATH} className="inline-flex min-h-11 items-center justify-center rounded-full border border-accentGreen/30 px-4 text-sm font-bold text-accentGreen transition hover:bg-accentGreen hover:text-white">
            Parasuramericanos 2026
          </a>
        </div>
      </header>

      <main>
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col gap-3 sm:mb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-bold uppercase tracking-[0.25em] text-accentGreen">Eventos próximos</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-primaryGray md:text-4xl">Agenda para viajeros</h2>
              </div>
              <p className="max-w-xl text-gray-700">
                Información básica para decidir fechas, consultar disponibilidad y moverte hacia la página específica de cada evento.
              </p>
            </div>

            <div className="grid gap-6">
              {upcomingEvents.map((event) => (
                <article key={event.title} className="group overflow-hidden rounded-[2rem] border border-secondaryYellow/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
                    <div className="relative min-h-64 bg-primaryGray p-6 text-white sm:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,193,7,0.38),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(76,175,80,0.4),transparent_35%)]" aria-hidden="true" />
                      <div className="relative flex h-full flex-col justify-between gap-10">
                        <span className="w-fit rounded-full bg-secondaryYellow px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primaryGray">{event.badge}</span>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Valledupar recibe</p>
                          <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">{event.title}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 lg:p-10">
                      <div className="grid gap-3 text-sm font-semibold text-primaryGray sm:grid-cols-2">
                        <span className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#fffaf0] px-4 py-3">
                          <CalendarDays className="h-5 w-5 text-accentGreen" /> {event.dates}
                        </span>
                        <span className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#fffaf0] px-4 py-3">
                          <MapPin className="h-5 w-5 text-accentGreen" /> {event.location}
                        </span>
                      </div>
                      <p className="mt-6 text-lg leading-8 text-gray-700">{event.summary}</p>
                      <p className="mt-4 text-gray-700">
                        Referencia actual: {campaign.location}. La disponibilidad se confirma por WhatsApp según fechas, número de personas y tipo de habitación.
                      </p>
                      <a href={event.href} className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accentGreen px-6 py-3 text-center font-black text-white shadow-[0_18px_45px_rgba(76,175,80,0.28)] transition active:scale-[0.98] group-hover:gap-3 hover:bg-secondaryYellow hover:text-primaryGray">
                        {event.cta} <ArrowRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
