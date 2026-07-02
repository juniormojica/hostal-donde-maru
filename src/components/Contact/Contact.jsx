import PropTypes from 'prop-types';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { trackWhatsAppCtaClick } from '../../utils/analytics';

const Contact = ({children='Consultar disponibilidad', href, messageContext}) => {
  const whatsappURL = href ?? buildWhatsAppUrl({
    source: 'homepage-contact',
    message: messageContext ?? '¡Hola! Me gustaría consultar disponibilidad para hospedarme en Hostal Donde Maru.',
  });

  return (
    <div id='contacto' className="flex justify-center items-center py-12 bg-warmStone">
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        onClick={() => trackWhatsAppCtaClick({ ctaLocation: 'contact_section' })}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-mustard px-6 py-3 font-semibold text-ink shadow-lg transition duration-300 hover:scale-105 hover:bg-caribbeanGreen hover:text-white focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
      >
        {children}
      </a>
    </div>
  );
};

export default Contact;
Contact.propTypes = {
  children: PropTypes.node, // Texto, JSX o cualquier elemento renderizable
  href: PropTypes.string,
  messageContext: PropTypes.string,
};
