// First, we need to import Framer Motion
import { motion } from "framer-motion";
import { Button } from "../ui/Button/Button";
import { scrollToSection } from "../../utils/scrollToSection";

const Hero = () => {
  return (
    <div  id='inicio'className="relative min-h-[300px] w-full bg-gradient-to-b from-secondaryYellow/10 to-white pt-[98px]">
      <div className="absolute inset-0 z-0 bg-[url('/path-to-your-image.jpg')] bg-cover bg-center opacity-10" />
      <div    className="container relative z-10 mx-auto px-4 py-12 lg:py-20">
        <motion.div 
         onClick={() => scrollToSection("galeria")}
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="mb-6 font-bold text-4xl md:text-5xl lg:text-6xl bg-heroText bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tu Alojamiento Ideal en Valledupar Confort para Profesionales y Viajeros
          </motion.h1>
          <motion.p 
            className="mb-8 text-lg md:text-2xl text-gray-700 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Espacios diseñados para tu productividad y descanso, ubicados estratégicamente para tus negocios, capacitaciones o visitas cortas a la ciudad
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
              handleClick={() =>{const phoneNumber = '+573218710632'; // Número de teléfono
                const message = '¡Hola! Me gustaría apartar una habitacion de  pensionados.'; // Mensaje predeterminado
            
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
                // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
                window.open(whatsappURL, '_blank');} }
                variant="solid"
                className="bg-accentGreen text-white hover:bg-secondaryYellow hover:text-black transition-all px-8 py-3 text-lg"
              >
                Reserva tu Estadía
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
             
                variant="outline"
                className="border-2 border-secondaryYellow text-black hover:bg-secondaryYellow transition-all px-8 py-3 text-lg"
              >
                Ver habitaciones
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero