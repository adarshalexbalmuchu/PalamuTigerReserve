import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, AlertTriangle, TreePine } from 'lucide-react'
import { contacts, isSeasonOpen } from '../data/ptr-data.js'

const navItems = [
  { to: '/',        label: 'Home' },
  { to: '/plan',    label: 'Plan Trip' },
  { to: '/stays',   label: 'Stays' },
  { to: '/safari',  label: 'Safaris' },
  { to: '/explore', label: 'Explore' },
  { to: '/about',   label: 'About PTR' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const parkOpen = isSeasonOpen()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const headerBase = 'bg-white shadow-sm border-b border-gray-100'

  return (
    <>
      {/* Government top bar */}
      <div className="bg-black text-gray-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="hidden sm:block">
            Government of Jharkhand | Department of Forest, Environment &amp; Climate Change
          </span>
          <span className="sm:hidden">Govt. of Jharkhand – Forest Dept.</span>
          <a
            href={`tel:${contacts.helpline.number}`}
            className="flex items-center gap-1.5 hover:text-gold transition-colors"
            aria-label="Call booking helpline"
          >
            <Phone size={11} />
            <span>{contacts.helpline.display}</span>
          </a>
        </div>
      </div>

      {/* Season alert bar */}
      {!parkOpen && (
        <div className="bg-palash text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2">
          <AlertTriangle size={13} />
          <span>
            <strong>Park Closed:</strong> Palamu Tiger Reserve is closed to tourists from July 1 – September 30 annually.
          </span>
        </div>
      )}

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${headerBase}`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Palamu Tiger Reserve Home">
            <img
              src="/logo.jpg"
              alt="Palamu Tiger Reserve"
              className="h-10 w-10 rounded-full object-cover shadow-sm flex-shrink-0"
            />
            <div className="leading-none">
              <p className="text-forest-900 font-serif font-bold text-base tracking-tight leading-tight">
                Palamu Tiger Reserve
              </p>
              <p className="text-forest-600 text-[10px] font-medium tracking-widest uppercase leading-tight">
                Official Journey Planner
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-forest-700'
                      : 'text-forest-900 hover:text-forest-600'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link to="/plan" className="hidden sm:inline-flex items-center gap-1.5 bg-forest-800 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-forest-700 transition-colors shadow-sm">
              <TreePine size={15} />
              Plan My Trip
            </Link>

            <button
              className="lg:hidden p-2 rounded-lg text-forest-800 hover:text-forest-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(v => !v)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
            <div className="flex flex-col gap-1 pt-2">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-forest-50 text-forest-700'
                        : 'text-forest-900 hover:bg-gray-50 hover:text-forest-700'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/plan"
                className="mt-2 btn-primary justify-center text-sm py-2.5 bg-forest-800 hover:bg-forest-700"
              >
                <TreePine size={15} />
                Plan My Trip
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
