import PropTypes from 'prop-types';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const Contact = ({children='Apartar Cupo', href, messageContext}) => {
  const whatsappURL = href ?? buildWhatsAppUrl({
    source: 'homepage-contact',
    message: messageContext ?? '¡Hola! Me gustaría apartar un cupo para la aplicación de pensionados.',
  });

  return (
    <div id='contacto' className="flex justify-center items-center py-12 bg-gray-100">
      <a href={whatsappURL} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
        <button className="font-semibold py-3 px-6 rounded-full shadow-lg transform transition duration-300  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black bg-secondaryYellow text-black hover:bg-accentGreen hover:text-white">
          {children}
        </button>
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
