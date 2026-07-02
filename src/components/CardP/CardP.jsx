import { Check } from 'lucide-react';
import PropTypes from 'prop-types';

const CardP = ({plan, handleWhatsAppClick}) => {
  return (
    <article className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-terracotta/10 bg-white/95 p-6 shadow-[0_18px_52px_rgba(42,29,27,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_68px_rgba(42,29,27,0.13)] sm:p-7">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-terracotta via-mustard to-caribbeanGreen" aria-hidden="true" />
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-mustard/10" aria-hidden="true" />

      <div className="relative space-y-5">
        {/* Header */}
        <div className="space-y-3 border-b border-terracotta/10 pb-5 text-center">
          <h3 className="text-2xl font-black tracking-[-0.025em] text-ink">{plan.packageName}</h3>
          <p className="mx-auto max-w-sm text-sm leading-6 text-gray-600">{plan.summary}</p>
          <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
            <span className="text-3xl font-black tracking-[-0.04em] text-terracotta sm:text-4xl">
              {plan.priceRange}
            </span>
            <span className="font-semibold text-gray-600">{plan.billingPeriod}</span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 group">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-caribbeanGreen transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              </div>
              <span className="text-gray-700 transition-colors duration-200 group-hover:text-ink">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleWhatsAppClick}
          aria-label={`Reservar ${plan.packageName}`}
          className="w-full rounded-full bg-terracotta px-6 py-3.5 font-black text-white transition-all duration-300 hover:bg-caribbeanGreen focus:outline-none focus:ring-4 focus:ring-caribbeanGreen/25">
          Consultar disponibilidad
        </button>
      </div>
    </article>
  );
};

CardP.propTypes = {
  plan: PropTypes.shape({
    packageName: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
    billingPeriod: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handleWhatsAppClick: PropTypes.func.isRequired
};

export default CardP;
