import { HashRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Stays from './pages/Stays.jsx'
import StayDetail from './pages/StayDetail.jsx'
import Safari from './pages/Safari.jsx'
import Explore from './pages/Explore.jsx'
import PlanTrip from './pages/PlanTrip.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  const navType = useNavigationType()
  useEffect(() => {
    // PUSH/REPLACE = forward navigation → always start at top
    // POP = browser back/forward → let browser restore the saved position
    if (navType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, navType])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-cream">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/stays"   element={<Stays />} />
            <Route path="/stays/:id" element={<StayDetail />} />
            <Route path="/safari"  element={<Safari />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/plan"    element={<PlanTrip />} />
            <Route path="/about"   element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Analytics />
    </HashRouter>
  )
}
