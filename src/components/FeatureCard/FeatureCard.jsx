import { motion } from "framer-motion";
import PropTypes from "prop-types";

const FeatureCard = ({ feature, index }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-[1.75rem] border border-terracotta/10 bg-white/90 p-7 shadow-[0_20px_55px_rgba(42,29,27,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-mustard/50 hover:shadow-[0_24px_70px_rgba(42,29,27,0.12)]"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-terracotta via-mustard to-caribbeanGreen" aria-hidden="true" />
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-mustard/10 transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
        <motion.div 
          className="relative mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className={`inline-flex rounded-2xl border p-4 transition-colors duration-300 ${feature.tone}`}>
            <feature.icon 
              className="h-8 w-8"
              aria-hidden="true"
            />
          </div>
        </motion.div>
   
        <h3 className="relative mb-3 text-xl font-black tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-terracotta">
          {feature.title}
        </h3>
   
        <p className="relative leading-relaxed text-gray-700">
          {feature.description}
        </p>
      </motion.div>
    );
  };

  export default FeatureCard

   // Define las PropTypes
  FeatureCard.propTypes = {
    feature: PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tone: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
  };
  
