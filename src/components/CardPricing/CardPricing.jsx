import { motion } from "framer-motion";
import CardP from "../CardP/CardP";

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
    const phoneNumber = '3218710632';
    const message = `Hola, me interesa obtener información sobre el paquete: ${packageName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
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
    <section id="planes" className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-12"
          variants={headingVariants}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Planes Disponibles
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
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
            className="text-gray-600 mb-4"
            variants={itemVariants}
          >
            ¿Necesitas más información?
          </motion.p>
          <motion.button 
            onClick={() => handleWhatsAppClick('Información General')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgb(229, 231, 235)" 
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