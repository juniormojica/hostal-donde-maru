import { Wifi, SprayCan, Sofa, ChefHat } from "lucide-react"
import FeatureCard from "../FeatureCard/FeatureCard"
import { motion } from "framer-motion"
const features = [
  { 
    icon: Wifi, 
    title: 'Wifi', 
    description: 'Internet de fibra óptica alta velocidad',
    color: 'text-blue-500'
  },
  { 
    icon: SprayCan,
    title: 'Espacios Limpios', 
    description: 'Zonas de uso general impecables y desinfectadas',
    color: 'text-green-500'
  },
  { 
    icon: Sofa,
    title: 'Completamente Amoblado', 
    description: 'Todo lo que necesitas  sin preocupaciones por mudanzas',
    color: 'text-purple-500'
  },
  { 
    icon: ChefHat,
    title: 'Cocina Equipada', 
    description: 'Acceso a cocina completa con horno microondas y utensilios básicos',
    color: 'text-orange-500'
  },
];

export default function Features() {
  return (
    <section  id="caracteristicas"  className="py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Características</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Disfruta de la comodidad de un espacio listo para usar, sin preocupaciones por equipaje pesado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
       
        </motion.div>
      </div>
    </section>
  );
}