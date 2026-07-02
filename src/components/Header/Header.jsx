import { useState } from 'react'
import { Home, Menu, X } from "lucide-react"
import { scrollToSection } from '../../utils/scrollToSection'
import { buildWhatsAppUrl } from '../../utils/whatsapp'
import { trackWhatsAppCtaClick } from '../../utils/analytics'

const navItems = [
  { label: 'Inicio', section: 'inicio' },
  { label: 'Características', section: 'caracteristicas' },
  { label: 'Habitaciones', section: 'galeria' },
  { label: 'Contacto', section: 'contacto' },
  { label: 'Precios', section: 'planes' },
]

const navButtonClass = 'rounded-full px-3 py-2 text-sm font-bold text-ink/75 transition-colors hover:bg-terracotta/10 hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta'
const ctaClass = 'inline-flex items-center justify-center rounded-full bg-caribbeanGreen px-5 py-2.5 text-sm font-black text-white shadow-[0_12px_30px_rgba(46,125,93,0.22)] transition-colors hover:bg-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caribbeanGreen'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const whatsappUrl = buildWhatsAppUrl({
    source: 'homepage-header',
    message: '¡Hola! Me gustaría consultar disponibilidad en Hostal Donde Maru.',
  })

  const goToSection = (section) => {
    scrollToSection(section)
    setIsMenuOpen(false)
  }

  const goToEvents = () => {
    setIsMenuOpen(false)
    window.location.href = '/eventos'
  }

  const trackHeaderWhatsAppClick = (ctaLocation) => {
    trackWhatsAppCtaClick({ ctaLocation })
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-terracotta/10 bg-cream/92 text-ink shadow-[0_10px_35px_rgba(72,47,34,0.08)] backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-terracotta/20 bg-white/70 shadow-sm" aria-hidden="true">
            <Home className="h-5 w-5 text-terracotta" />
          </span>
          <div>
            <p className="text-base font-black leading-tight tracking-[-0.035em] text-terracotta sm:text-xl">Hostal Donde Maru</p>
            <p className="hidden text-[0.65rem] font-black uppercase tracking-[0.28em] text-caribbeanGreen sm:block">Valledupar</p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-terracotta/10 bg-white/45 p-1 shadow-sm lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button key={item.section} type="button" className={navButtonClass} onClick={() => goToSection(item.section)}>
              {item.label}
            </button>
          ))}
          <button type="button" className={navButtonClass} onClick={goToEvents}>
            Eventos
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <a className={`${ctaClass} hidden lg:inline-flex`} href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackHeaderWhatsAppClick('header_desktop')}>
            Consultar disponibilidad
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-terracotta/20 bg-white/70 text-terracotta transition-colors hover:bg-terracotta hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta lg:hidden"
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className="border-t border-terracotta/10 bg-cream/98 px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <button key={item.section} type="button" className="rounded-2xl px-4 py-3 text-left text-base font-black text-ink transition-colors hover:bg-terracotta/10 hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta" onClick={() => goToSection(item.section)}>
                {item.label}
              </button>
            ))}
            <button type="button" className="rounded-2xl px-4 py-3 text-left text-base font-black text-ink transition-colors hover:bg-terracotta/10 hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta" onClick={goToEvents}>
              Eventos
            </button>
            <a className={`${ctaClass} mt-3 w-full`} href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => {
              trackHeaderWhatsAppClick('header_mobile')
              setIsMenuOpen(false)
            }}>
              Consultar disponibilidad
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
