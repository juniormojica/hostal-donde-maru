import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const EventsIndex = lazy(() => import('./pages/EventsIndex/EventsIndex'))
const ParasuramericanosLanding = lazy(() => import('./pages/ParasuramericanosLanding/ParasuramericanosLanding'))

const PARASURAMERICANOS_PATH = '/parasuramericanos-valledupar-2026'
const EVENTS_PATH = '/eventos'

function RouteFallback() {
  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-10 text-primaryGray" aria-busy="true">
      <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-accentGreen">Hostal Donde Maru</p>
        <h1 className="mt-3 text-2xl font-black tracking-[-0.03em]">Cargando contenido...</h1>
        <p className="mt-3 text-base leading-7 text-gray-700">Estamos preparando la página solicitada.</p>
      </div>
    </main>
  )
}

function getRouteComponent(pathname) {
  const normalizedPath = pathname.replace(/\/$/, '') || '/'

  if (normalizedPath === EVENTS_PATH) {
    return <EventsIndex />
  }

  if (normalizedPath === PARASURAMERICANOS_PATH) {
    return <ParasuramericanosLanding />
  }

  return <HomePage />
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      {getRouteComponent(window.location.pathname)}
    </Suspense>
  )
}
