import { motion } from "framer-motion";
import CardP from "../CardP/CardP";
import { buildWhatsAppUrl } from "../../utils/whatsapp";

const planPricings = [
  {
    packageName: "Habitación Compartida",
    priceRange: "$350.000 - $500.000",
    billingPeriod: "/Día",
    summary: "Una opción práctica para descansar con espacios compartidos y servicios esenciales incluidos.",
    features: [
      "Cama individual",
      "Colchón ortopédico",
      "WiFi",
      "Acceso a cocina",
      "Acceso a zonas comunes",
      "Parqueadero sujeto a disponibilidad",
    ],
  },
  {
    packageName: "Habitación Individual",
    priceRange: "$600.000 - $800.000",
    billingPeriod: "/Día",
    summary: "Más privacidad para descansar, manteniendo acceso a las zonas comunes del hostal.",
    features: [
      "Cuarto privado",
      "Cama individual",
      "Colchón",
      "WiFi",
      "Acceso a cocina",
      "Acceso a zonas comunes",
      "Parqueadero sujeto a disponibilidad",
    ],
  }
];

const CardPricing = () => {
  const handleWhatsAppClick = (packageName) => {
    const whatsappUrl = buildWhatsAppUrl({
      source: 'homepage-pricing',
      message: 'Hola, me interesa obtener información sobre un plan de alojamiento en Hostal Donde Maru.',
      details: {
        Habitación: packageName,
      },
    });
    window.open(whatsappUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="planes" aria-labelledby="pricing-heading" className="overflow-hidden bg-gradient-to-b from-white via-cream to-warmStone py-16 sm:py-20">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="mx-auto mb-12 max-w-3xl text-center"
          variants={headingVariants}
        >
          <motion.p
            className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-caribbeanGreen"
            variants={itemVariants}
          >
            Tarifas claras
          </motion.p>
          <motion.h2 
            id="pricing-heading"
            className="mb-4 text-4xl font-black tracking-[-0.035em] text-terracotta sm:text-5xl"
            variants={itemVariants}
          >
            Habitaciones disponibles
          </motion.h2>
          <motion.p 
            className="mx-auto max-w-2xl text-lg leading-8 text-gray-700"
            variants={itemVariants}
          >
            Elegí entre habitación individual o compartida. Te damos el valor final por WhatsApp según disponibilidad y servicios.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {planPricings.map((planPricing, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <CardP 
                plan={planPricing} 
                handleWhatsAppClick={() => handleWhatsAppClick(planPricing.packageName)} 
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p 
            className="mb-4 text-gray-700"
            variants={itemVariants}
          >
            ¿Necesitás confirmar disponibilidad o servicios incluidos?
          </motion.p>
          <motion.button 
            onClick={() => handleWhatsAppClick('Información General')}
            className="inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-white px-6 py-3 font-bold text-terracotta shadow-sm transition-colors duration-200 hover:bg-terracotta hover:text-white"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Contáctanos
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CardPricing;
