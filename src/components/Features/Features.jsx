import { Wifi, SprayCan, Sofa, ChefHat } from "lucide-react"
import FeatureCard from "../FeatureCard/FeatureCard"
import { motion } from "framer-motion"
const features = [
  { 
    icon: Wifi, 
    title: 'Wifi', 
    description: 'Internet de fibra óptica alta velocidad',
    tone: 'text-caribbeanGreen bg-caribbeanGreen/10 border-caribbeanGreen/20'
  },
  { 
    icon: SprayCan,
    title: 'Espacios Limpios', 
    description: 'Zonas de uso general impecables y desinfectadas',
    tone: 'text-terracotta bg-terracotta/10 border-terracotta/20'
  },
  { 
    icon: Sofa,
    title: 'Completamente Amoblado', 
    description: 'Todo lo que necesitas sin preocupaciones por mudanzas',
    tone: 'text-clay bg-clay/10 border-clay/20'
  },
  { 
    icon: ChefHat,
    title: 'Cocina Equipada', 
    description: 'Acceso a cocina completa con horno microondas y utensilios básicos',
    tone: 'text-mustard bg-mustard/15 border-mustard/30'
  },
];

export default function Features() {
  return (
    <section id="caracteristicas" aria-labelledby="features-heading" className="bg-gradient-to-b from-cream via-warmStone to-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-caribbeanGreen">Lo esencial, bien resuelto</p>
          <h2 id="features-heading" className="mb-4 text-4xl font-black tracking-[-0.035em] text-terracotta sm:text-5xl">Características</h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-700">
            Disfruta de la comodidad de un espacio listo para usar, sin preocupaciones por equipaje pesado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
