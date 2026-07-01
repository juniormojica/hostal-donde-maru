import { motion } from "framer-motion";
import { Button } from "../ui/Button/Button";
import { scrollToSection } from "../../utils/scrollToSection";
import { buildWhatsAppUrl } from "../../utils/whatsapp";
import heroImage from "../../assets/salacomedor.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-cream pt-20 sm:pt-28">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-mustard/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-caribbeanGreen/15 blur-3xl" aria-hidden="true" />
      <div className="container relative z-10 mx-auto grid gap-7 px-4 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 inline-flex rounded-full border border-caribbeanGreen/25 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-caribbeanGreen shadow-sm sm:mb-5">
            Valledupar, Cesar
          </p>
          <motion.h1 
            className="mb-4 max-w-4xl text-[2.35rem] font-black leading-[0.98] tracking-[-0.052em] text-terracotta sm:mb-6 sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hospedaje cálido para llegar, resolver y descansar en Valledupar.
          </motion.h1>
          <motion.p 
            className="mb-6 max-w-2xl text-base leading-7 text-gray-700 sm:mb-8 sm:text-lg sm:leading-8 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Un hostal local, práctico y confiable para viajeros, profesionales y familias que necesitan una estancia tranquila sin vueltas.
          </motion.p>
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                handleClick={() => window.open(buildWhatsAppUrl({
                  source: 'homepage-hero',
                  message: '¡Hola! Me gustaría consultar disponibilidad en Hostal Donde Maru.',
                }), '_blank', 'noopener,noreferrer')}
                variant="solid"
                className="min-h-14 rounded-full bg-caribbeanGreen px-8 py-3 text-base text-white shadow-[0_18px_45px_rgba(76,175,80,0.28)] transition-all hover:bg-mustard hover:text-ink focus:ring-4 focus:ring-caribbeanGreen/25"
              >
                Consultar disponibilidad
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                handleClick={() => scrollToSection("galeria")}
                variant="outline"
                className="min-h-14 rounded-full border-2 border-terracotta bg-white/60 px-8 py-3 text-base font-bold text-terracotta transition-all hover:bg-terracotta hover:text-white focus:ring-4 focus:ring-mustard/40"
              >
                Ver habitaciones
              </Button>
            </motion.div>
          </motion.div>
          <dl className="mt-5 grid max-w-xl grid-cols-3 gap-2 text-xs text-gray-700 sm:mt-10 sm:gap-3 sm:text-sm">
            <div className="rounded-2xl border border-mustard/30 bg-white/70 p-2 sm:p-4">
              <dt className="font-black text-terracotta">Estancias</dt>
              <dd>Cortas y prácticas</dd>
            </div>
            <div className="rounded-2xl border border-mustard/30 bg-white/70 p-2 sm:p-4">
              <dt className="font-black text-terracotta">Reserva</dt>
              <dd>Por WhatsApp</dd>
            </div>
            <div className="rounded-2xl border border-mustard/30 bg-white/70 p-2 sm:p-4">
              <dt className="font-black text-terracotta">Ambiente</dt>
              <dd>Local y familiar</dd>
            </div>
          </dl>
        </motion.div>
        <motion.figure
          className="relative mx-auto w-full max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="absolute -inset-4 rotate-2 rounded-[2rem] bg-terracotta" aria-hidden="true" />
          <img
            src={heroImage}
            alt="Sala comedor de Hostal Donde Maru"
            className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl sm:aspect-[4/5]"
          />
          <figcaption className="absolute -bottom-4 left-4 right-4 rounded-2xl bg-white/95 px-4 py-3 text-sm font-semibold text-ink shadow-xl backdrop-blur sm:-bottom-5 sm:left-5 sm:right-5 sm:px-5 sm:py-4">
            Espacios sencillos, limpios y pensados para descansar después de moverse por la ciudad.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default Hero
