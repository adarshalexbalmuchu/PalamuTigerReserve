import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { contacts, reserve, season } from '../data/ptr-data.js'

const links = {
  'Quick Links': [
    { label: 'Plan My Trip', to: '/plan' },
    { label: 'Browse Stays', to: '/stays' },
    { label: 'Book Safari', to: '/safari' },
    { label: 'Explore Map', to: '/explore' },
  ],
  'Information': [
    { label: 'About PTR', to: '/about' },
    { label: 'Wildlife & Biodiversity', to: '/about#wildlife' },
    { label: 'Heritage & Forts', to: '/about#heritage' },
    { label: 'Visitor Guidelines', to: '/about#guidelines' },
  ],
  'Policies': [
    { label: 'Cancellation Policy', to: '/contact#cancellation' },
    { label: 'Terms & Conditions', to: '/contact#terms' },
    { label: 'Privacy Policy', to: '/contact#privacy' },
    { label: 'Contact & Support', to: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-300" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo-transparent.png"
                alt="Palamu Tiger Reserve"
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="text-cream font-serif font-bold text-lg leading-tight">
                  Palamu Tiger Reserve
                </p>
                <p className="text-forest-400 text-xs tracking-widest uppercase">Official Journey Planner</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-forest-400 mb-5">
              Palamu Tiger Reserve — one of India's original Project Tiger reserves since 1973 — spans
              {' '}{reserve.totalArea.toLocaleString()} sq km across Jharkhand's Chhotanagpur Plateau. Open {season.open.label}.
            </p>

            <div className="space-y-2.5">
              <a
                href={`tel:${contacts.helpline.number}`}
                className="flex items-center gap-2 text-sm hover:text-gold transition-colors"
              >
                <Phone size={14} className="text-gold flex-shrink-0" />
                <span>{contacts.helpline.display} — {contacts.helpline.label}</span>
              </a>
              <a
                href={`tel:${contacts.complaints.number}`}
                className="flex items-center gap-2 text-sm hover:text-gold transition-colors"
              >
                <Phone size={14} className="text-forest-500 flex-shrink-0" />
                <span>{contacts.complaints.display} — {contacts.complaints.label}</span>
              </a>
              <p className="flex items-start gap-2 text-sm text-forest-400">
                <MapPin size={14} className="text-forest-500 flex-shrink-0 mt-0.5" />
                <span>Betla, Latehar District, Jharkhand – 829206</span>
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-cream font-semibold text-sm mb-4 tracking-wide">{title}</h3>
              <ul className="space-y-2">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-forest-400 hover:text-gold text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Important notice */}
      <div className="border-t border-forest-800 bg-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs text-forest-500 text-center">
            <strong className="text-forest-400">Important:</strong> Entry to PTR after 4:00 PM is strictly prohibited.
            All guests must report to the reception before 4:00 PM on arrival day. Park closed: July 1 – September 30 annually.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-forest-500 text-center sm:text-left">
            © {new Date().getFullYear()} Palamu Tiger Reserve | Department of Forest, Environment & Climate Change, Government of Jharkhand.
            All rights reserved.
          </p>
          <p className="text-xs text-forest-600">
            Built by Innobotix for PTR
          </p>
        </div>
      </div>
    </footer>
  )
}
