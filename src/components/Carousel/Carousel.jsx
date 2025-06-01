import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import PropTypes from 'prop-types';
import Availability from '../Availability/Availability';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    })
  };

  // Variantes para el modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
    }
  };

  // Configuración del gesto de swipe
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      if (isModalOpen) {
        nextModalSlide();
      } else {
        nextSlide();
      }
    } else if (swipe > swipeConfidenceThreshold) {
      if (isModalOpen) {
        prevModalSlide();
      } else {
        prevSlide();
      }
    }
  };

  const paginate = (newDirection) => {
    const newIndex = (currentIndex + newDirection + images.length) % images.length;
    setPage([page + newDirection, newDirection]);
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);

  const goToSlide = (index) => {
    const direction = index > currentIndex ? 1 : -1;
    setPage([page + direction, direction]);
    setCurrentIndex(index);
  };

  // Funciones para el modal
  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  };

  const nextModalSlide = () => {
    setModalIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalSlide = () => {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Manejar teclas del teclado para el modal
  const handleKeyDown = (e) => {
    if (!isModalOpen) return;
    
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevModalSlide();
        break;
      case 'ArrowRight':
        nextModalSlide();
        break;
    }
  };

  // Agregar/remover event listener para teclas
  useState(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen]);

  return (
    <>
      <div id='galeria' className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestras Habitaciones
          </h2>
          <div className="relative max-w-5xl mx-auto">
            {/* Contenedor modificado con altura responsiva y adaptable */}
            <div className="relative overflow-hidden rounded-xl shadow-xl touch-pan-y">
              {/* Establecemos un aspect-ratio adaptable y altura máxima */}
              <div className="relative w-full aspect-[16/10] md:aspect-[16/9] max-h-[70vh] md:max-h-[80vh]">
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "tween", duration: 0.35 },
                      opacity: { duration: 0.25 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    onClick={() => openModal(currentIndex)}
                  >
                    {/* Overlay con información */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center justify-between">
                          <Availability 
                            status={images[currentIndex].disponibilidad} 
                            label={images[currentIndex].label} 
                          />
                          <div className="flex items-center gap-2">
                            <span className="bg-secondaryYellow text-black px-4 py-1 rounded-full text-sm font-medium">
                              {currentIndex + 1} / {images.length}
                            </span>
                            {/* Indicador de zoom solo en móvil */}
                            <div className="md:hidden bg-white/20 p-2 rounded-full">
                              <ZoomIn className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Imagen principal - Modificada para mejor visualización */}
                    <img
                      src={images[currentIndex].src}
                      alt={images[currentIndex].label || `Habitación ${currentIndex + 1}`}
                      className="w-full h-full object-contain md:object-contain bg-gray-900/90"
                      draggable="false"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controles - Ocultos en móvil */}
              <motion.button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-accentGreen hover:text-white rounded-full transition-colors duration-200 hidden md:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="h-6 w-6" />
              </motion.button>
              <motion.button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-accentGreen hover:text-white rounded-full transition-colors duration-200 hidden md:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight className="h-6 w-6" />
              </motion.button>

              {/* Indicador de swipe y tap - Solo visible en móvil */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-center md:hidden">
                <motion.p 
                  className="text-white text-sm bg-black/50 px-4 py-2 rounded-full text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Desliza para navegar • Toca para ampliar
                </motion.p>
              </div>
            </div>

            {/* Miniaturas - Ahora con vista previa más grande */}
            <div className="grid grid-cols-5 gap-2 mt-4 overflow-x-auto pb-2 px-2 hide-scrollbar">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${
                    currentIndex === index 
                      ? 'ring-2 ring-accentGreen ring-offset-2' 
                      : 'opacity-70 hover:opacity-100'
                  } rounded-md overflow-hidden transition-all duration-200 relative group`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={image.src} 
                    alt={image.label}
                    className="w-full h-16 object-cover"
                  />
                  {/* Overlay con icono de zoom en hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <ZoomIn className="h-4 w-4 text-white" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de pantalla completa */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Contenedor del modal */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center p-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Controles de navegación */}
              <motion.button
                onClick={prevModalSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="h-6 w-6" />
              </motion.button>
              
              <motion.button
                onClick={nextModalSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight className="h-6 w-6" />
              </motion.button>

              {/* Imagen del modal con soporte para swipe */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
              >
                <img
                  src={images[modalIndex].src}
                  alt={images[modalIndex].label || `Habitación ${modalIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  draggable="false"
                />
              </motion.div>

              {/* Información de la imagen */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
                  <div className="flex items-center gap-4">
                    <Availability 
                      status={images[modalIndex].disponibilidad} 
                      label={images[modalIndex].label} 
                    />
                    <span className="text-sm">
                      {modalIndex + 1} / {images.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Miniaturas en el modal */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-center">
                <div className="flex gap-2 bg-black/30 backdrop-blur-sm rounded-lg p-2 max-w-xs overflow-x-auto hide-scrollbar">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setModalIndex(index)}
                      className={`flex-shrink-0 w-12 h-8 rounded overflow-hidden transition-all duration-200 ${
                        modalIndex === index 
                          ? 'ring-2 ring-white ring-offset-1 ring-offset-black/50' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={image.src} 
                        alt={image.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      disponibilidad: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Estilo para ocultar la barra de desplazamiento pero mantener la funcionalidad
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;             /* Chrome, Safari and Opera */
  }
`;
document.head.appendChild(styleSheet);

export default Carousel;