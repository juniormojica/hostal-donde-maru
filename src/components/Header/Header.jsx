import { useState } from 'react'
import { Button } from "../ui/Button/Button"
import { Menu, Home } from "lucide-react"
import { scrollToSection } from '../../utils/scrollToSection'
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const buttonStyles = "bg-mustard text-ink hover:bg-caribbeanGreen hover:text-white transition-colors duration-200"
  const goToEvents = () => {
    window.location.href = '/eventos'
  }


  return (
    <header  className="fixed top-0 left-0 right-0 z-50 border-b border-mustard/25 bg-cream/95 text-ink shadow-sm backdrop-blur">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Home className="h-6 w-6 mr-2 text-caribbeanGreen" aria-hidden="true" />
          <p className="text-lg font-black tracking-[-0.03em] sm:text-2xl">Hostal Donde Maru</p>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("inicio")}>Inicio</Button>
          <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("caracteristicas")}>Características</Button>
          <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("galeria")}>Galería</Button>
          <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("contacto")}>Contacto</Button>
          <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("planes")}>Planes</Button>
          <Button variant="solid" className={buttonStyles} onClick={goToEvents}>Eventos</Button>
        </nav>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:bg-caribbeanGreen hover:text-white transition-colors duration-200 md:hidden"
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-cream p-4">
          <nav className="flex flex-col space-y-2">
            <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("inicio")}>Inicio</Button>
            <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("caracteristicas")}>Características</Button>
            <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("galeria")}>Galería</Button>
            <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("contacto")}>Contacto</Button>
            <Button variant="solid" className={buttonStyles} onClick={() => scrollToSection("planes")}>Planes</Button>
            <Button variant="solid" className={buttonStyles} onClick={goToEvents}>Eventos</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
