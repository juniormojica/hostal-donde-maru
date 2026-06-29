import { motion } from "framer-motion";
import CardP from "../CardP/CardP";
import { buildWhatsAppUrl } from "../../utils/whatsapp";

const planPricings = [
  {
    packageName: "Habitacion por dia",
    price: 50000,
    features: [
      
      "Cama individual",
      'Colchon ortopedico',
     
      "Baño privado",
      "WiFi ",
      'Acceso a cocina',
      'Acesso a zonas comunes',
      
      'Parqueadero',
      "Armario",
      'Ventilador',
      'Escritorio',
    ],
    additionals: {
      food: 500000,
      airConditioning: 10000
    }
  },
  {
    packageName: "Habitacion Compartida",
    price: 350000,
    features: [
      'Cuarto Compartido ',
      "Cama individual",
      'Colchon ortopedico',
     
      "Baño privado",
      "WiFi ",
      'Acceso a cocina',
      'Acesso a zonas comunes',
      
      'Parqueadero',
      "Armario",
      'Ventilador',
      'Escritorio',
    ],
    additionals: {
      food: 500000,
      airConditioning: 50000
    }
  },
  {
    packageName: "Habitacion Individual",
    price: 600000,
    features: [
      'Cuarto Privado',
      "Cama individual",
      'Colchon ',
     
      "Baño privado",
      "WiFi ",
      'Acceso a cocina',
      'Acesso a zonas comunes',
      
      'Parqueadero',
      "Armario",
      'Ventilador',
      'Escritorio',
    ],
    additionals: {
      food: 500000,
      airConditioning: 100000
    }
  }
];

const CardPricing = () => {
  const formatPrice = (price) => {
    return price.toLocaleString('es-CO', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleWhatsAppClick = (packageName) => {
    const whatsappUrl = buildWhatsAppUrl({
      source: 'homepage-pricing',
      message: 'Hola, me interesa obtener información sobre un plan de alojamiento en Hostal Donde Maru.',
      details: {
        Paquete: packageName,
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
            Planes Disponibles
          </motion.h2>
          <motion.p 
            className="mx-auto max-w-2xl text-lg leading-8 text-gray-700"
            variants={itemVariants}
          >
            Escoge el plan que mejor se adapte a tus necesidades. Todos incluyen servicios básicos y acceso a áreas comunes.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto"
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
                formatPrice={formatPrice} 
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
            ¿Necesitas más información?
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
