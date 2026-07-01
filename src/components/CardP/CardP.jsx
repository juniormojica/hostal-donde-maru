import { Check, Star } from 'lucide-react';
import PropTypes from 'prop-types';

const CardP = ({plan, formatPrice, handleWhatsAppClick}) => {
  const isPopular = plan.packageName === "Habitación Individual";
  const billingPeriod = plan.packageName === "Habitación por día" ? "/Día" : "/Mes";

  return (
    <article className={`relative w-full max-w-sm rounded-[2rem] border bg-white/95 p-8 shadow-[0_22px_65px_rgba(42,29,27,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(42,29,27,0.14)] ${
      isPopular ? 'border-caribbeanGreen/60 ring-4 ring-caribbeanGreen/10' : 'border-terracotta/10'
    }`}>
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-terracotta via-mustard to-caribbeanGreen" aria-hidden="true" />
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-mustard/10" aria-hidden="true" />
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="flex items-center gap-1 rounded-full bg-caribbeanGreen px-4 py-1 text-sm font-bold text-white shadow-lg">
            <Star className="w-4 h-4" aria-hidden="true" /> Más Popular
          </span>
        </div>
      )}

      <div className="relative space-y-6">
        {/* Header */}
        <div className="space-y-4 border-b border-terracotta/10 pb-6 text-center">
          <h3 className="text-2xl font-black tracking-[-0.025em] text-ink">{plan.packageName}</h3>
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-black tracking-[-0.05em] text-terracotta">
              ${formatPrice(plan.price)}
            </span>
            <span className="ml-2 font-semibold text-gray-600">{billingPeriod}</span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-4">
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

        {/* Additionals */}
        <div className="space-y-4 border-t border-terracotta/10 pt-6">
          <h4 className="text-lg font-black text-ink">Servicios adicionales:</h4>
          <div className="space-y-3">
            <div className="group flex items-center space-x-3 rounded-2xl bg-warmStone/70 p-3 transition-colors duration-200 hover:bg-mustard/15">
              <Check className="h-5 w-5 text-caribbeanGreen" aria-hidden="true" />
              <div className="flex-1">
                {plan.packageName !== 'Habitación por día' ?<p className="text-gray-700">
                  Alimentación 3 veces al día
                  <span className="block text-sm text-gray-500">(Lunes a sábado)</span>
                </p>: ''}
              
              </div>
              <span className="font-black text-ink">
                {plan.packageName === "Habitación por día" ? `Desayuno Incluido` : `$${formatPrice(plan.additionals.food)}/Mes`}
              </span>
            </div>
            <div className="group flex items-center space-x-3 rounded-2xl bg-warmStone/70 p-3 transition-colors duration-200 hover:bg-mustard/15">
              <Check className="h-5 w-5 text-caribbeanGreen" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-gray-700">Aire Acondicionado</p>
              </div>
              <span className="font-black text-ink">
                {plan.packageName === "Habitación por día" ? `$${formatPrice(plan.additionals.airConditioning)}/Día` : `$${formatPrice(plan.additionals.airConditioning)}/Mes`}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleWhatsAppClick}
          aria-label={`Reservar ${plan.packageName}`}
          className={`w-full rounded-full px-6 py-4 font-black transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-caribbeanGreen/25 
            ${isPopular 
              ? 'bg-caribbeanGreen text-white hover:bg-mustard hover:text-ink' 
              : 'bg-terracotta text-white hover:bg-caribbeanGreen'
            }`}>
          Reservar Ahora
        </button>
      </div>
    </article>
  );
};

CardP.propTypes = {
  plan: PropTypes.shape({
    packageName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    additionals: PropTypes.shape({
      food: PropTypes.number.isRequired,
      airConditioning: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  formatPrice: PropTypes.func.isRequired,
  handleWhatsAppClick: PropTypes.func.isRequired
};

export default CardP;
