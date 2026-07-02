import { motion } from "framer-motion";
import { Button } from "../ui/Button/Button";
import { Mail, Phone, MessageCircleMore } from "lucide-react";
import { buildWhatsAppUrl } from "../../utils/whatsapp";
import { trackWhatsAppCtaClick } from "../../utils/analytics";

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl({
    source: 'footer',
    message: '¡Hola! Me gustaría recibir información para reservar en Hostal Donde Maru.',
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonHover = {
    hover: { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" },
  };

  return (
    <motion.footer
      className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <motion.div className="mb-4 md:mb-0" variants={fadeIn}>
          <h2 className="text-2xl font-bold">Contacto</h2>
          <p className="mt-2">Para más información, favor contactarnos:</p>
          <div className="flex items-center space-x-2 mt-2">
            <Mail className="h-5 w-5" />
            <p>juniormojica26@gmail.com</p>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <p>321 871 0632</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center space-x-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div variants={buttonHover} whileHover="hover">
            <Button variant="outline" className="flex items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                onClick={() => trackWhatsAppCtaClick({ ctaLocation: 'footer' })}
              >
                <MessageCircleMore />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
