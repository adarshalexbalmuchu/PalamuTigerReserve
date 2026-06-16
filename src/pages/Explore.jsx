import { useState, lazy, Suspense } from 'react'
import { MapPin, Filter } from 'lucide-react'
import { visitSites, properties } from '../data/ptr-data.js'
import { Link } from 'react-router-dom'

const MapView = lazy(() => import('../components/MapView.jsx'))

const CATEGORIES = [
  { key: 'all',       label: 'All',       emoji: '🗺️' },
  { key: 'stay',      label: 'Stays',     emoji: '🏠' },
  { key: 'waterfall', label: 'Waterfalls', emoji: '💧' },
  { key: 'heritage',  label: 'Heritage',  emoji: '🏰' },
  { key: 'wildlife',  label: 'Wildlife',  emoji: '🐾' },
  { key: 'scenic',    label: 'Scenic',    emoji: '🌅' },
]

function SiteCard({ site }) {
  const typeColors = {
    waterfall: 'bg-blue-50 border-blue-200 text-blue-700',
    heritage:  'bg-palash/10 border-palash/20 text-palash',
    wildlife:  'bg-amber-50 border-amber-200 text-amber-700',
    scenic:    'bg-forest-50 border-forest-100 text-forest-700',
  }
  return (
    <div className="bg-white border border-earth-100 rounded-2xl p-5 hover:shadow-nature transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl flex-shrink-0">{site.icon}</span>
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[site.type] || 'bg-earth-50 border-earth-200 text-earth-600'}`}>
            {site.type}
          </span>
          <h3 className="font-serif font-bold text-forest-800 mt-1 leading-tight">{site.name}</h3>
          <p className="text-xs text-earth-500">{site.subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-earth-700 leading-relaxed line-clamp-3 mb-3">{site.description}</p>
      <div className="flex flex-wrap gap-1.5 text-xs mb-3">
        <span className="bg-forest-50 text-forest-700 px-2 py-1 rounded-full">📅 {site.bestTime}</span>
        {site.distanceFromBetla && (
          <span className="bg-earth-50 text-earth-600 px-2 py-1 rounded-full">📍 {site.distanceFromBetla} from Betla</span>
        )}
      </div>
      {site.highlights && (
        <div className="border-t border-earth-100 pt-3">
          <div className="flex flex-wrap gap-1">
            {site.highlights.slice(0, 3).map(h => (
              <span key={h} className="text-[10px] bg-earth-50 border border-earth-200 text-earth-600 px-2 py-0.5 rounded-full">{h}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [mapZone, setMapZone] = useState(null)

  const filteredSites = activeCategory === 'all' || activeCategory === 'stay'
    ? visitSites
    : visitSites.filter(s => s.type === activeCategory)

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest-900 text-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-forest-400 text-xs font-bold uppercase tracking-widest mb-3">Interactive Explorer</p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-3">Explore PTR</h1>
          <p className="text-forest-300 text-lg font-serif italic">
            Waterfalls, forts, wolf sanctuaries, hill stations, and more across 1,129 sq km
          </p>
        </div>
      </div>

      {/* Map Section */}
      <section className="bg-white border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-serif font-bold text-xl text-forest-800">
              <MapPin size={18} className="inline mr-2 text-forest-600" />
              Interactive Map
            </h2>
            <div className="flex items-center gap-2">
              {[null, 'north', 'south'].map(z => (
                <button
                  key={z ?? 'all'}
                  onClick={() => setMapZone(z)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                    mapZone === z
                      ? 'bg-forest-700 text-cream border-forest-700'
                      : 'bg-white text-earth-600 border-earth-200 hover:border-forest-400'
                  }`}
                >
                  {z === null ? '🗺 All' : z === 'north' ? '↑ North' : '↓ South'}
                </button>
              ))}
            </div>
          </div>

          {/* Map legend */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs">
            {[
              { emoji: '🏠', label: 'Stay', color: 'bg-forest-100 text-forest-700' },
              { emoji: '💧', label: 'Waterfall', color: 'bg-blue-50 text-blue-700' },
              { emoji: '🏰', label: 'Heritage', color: 'bg-red-50 text-red-700' },
              { emoji: '🐺', label: 'Wildlife', color: 'bg-amber-50 text-amber-700' },
              { emoji: '🌅', label: 'Scenic', color: 'bg-green-50 text-green-700' },
            ].map(({ emoji, label, color }) => (
              <span key={label} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${color} border border-current/20`}>
                {emoji} {label}
              </span>
            ))}
          </div>

          <Suspense fallback={
            <div className="h-[500px] bg-forest-50 rounded-2xl flex items-center justify-center">
              <div className="text-center text-earth-500">
                <div className="text-3xl mb-2">🗺️</div>
                <p className="text-sm">Loading map…</p>
              </div>
            </div>
          }>
            <MapView height="500px" filterZone={mapZone} />
          </Suspense>

          <p className="text-xs text-earth-400 mt-2 text-center">
            Click any marker to view details. Map data © OpenStreetMap contributors.
          </p>
        </div>
      </section>

      {/* POI Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="font-serif font-bold text-2xl text-forest-800 mb-1">Points of Interest</h2>
            <p className="text-earth-500 text-sm">All destinations, sites, and attractions within PTR</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ key, label, emoji }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                  activeCategory === key
                    ? 'bg-forest-700 text-cream border-forest-700'
                    : 'bg-white text-earth-600 border-earth-200 hover:border-forest-400'
                }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSites.map(s => <SiteCard key={s.id} site={s} />)}
        </div>

        {activeCategory === 'all' || activeCategory === 'stay' ? (
          <div className="mt-8">
            <h3 className="font-serif font-bold text-xl text-forest-800 mb-4">
              🏠 All Forest Accommodations ({properties.length})
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {properties.map(p => (
                <Link key={p.id} to={`/stays/${p.id}`} className="bg-white border border-earth-100 rounded-xl p-4 hover:shadow-nature transition-shadow group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{p.type === 'treehouse' ? '🌲' : p.type === 'tent' ? '⛺' : '🏡'}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${p.zone === 'north' ? 'bg-forest-100 text-forest-700' : 'bg-earth-100 text-earth-700'}`}>
                      {p.zone}
                    </span>
                  </div>
                  <h4 className="font-semibold text-forest-800 text-sm group-hover:text-palash transition-colors">{p.name}</h4>
                  <p className="text-xs text-earth-500 mt-0.5 mb-2">{p.location}</p>
                  <p className="font-bold text-forest-700 text-sm">₹{p.pricePerNight?.toLocaleString()}/night</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* Transport section */}
      <section className="bg-white border-t border-earth-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-2xl text-forest-800 mb-6">Getting to Palamu Tiger Reserve</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: '✈️',
                title: 'By Air',
                options: [
                  'Birsa Munda Airport, Ranchi – 165–170 km',
                  'Gaya Airport, Bihar – ~190 km',
                ],
              },
              {
                icon: '🚂',
                title: 'By Train',
                options: [
                  'Barwadih Junction – 12 km from Betla',
                  'Daltonganj Station – 25 km from Betla',
                  'Trains from Delhi, Patna, Lucknow, Kanpur',
                ],
              },
              {
                icon: '🚗',
                title: 'By Road',
                options: [
                  'Ranchi → NH-75 → Latehar → Betla (170 km)',
                  'Patna → Aurangabad → Betla (260 km)',
                  'Local buses: Daltonganj ↔ Betla',
                ],
              },
            ].map(({ icon, title, options }) => (
              <div key={title} className="bg-earth-50 border border-earth-100 rounded-2xl p-5">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-serif font-bold text-lg text-forest-800 mb-3">{title}</h3>
                <ul className="space-y-1.5">
                  {options.map(o => (
                    <li key={o} className="text-sm text-earth-700 flex items-start gap-1.5">
                      <span className="text-forest-500 mt-1 flex-shrink-0">•</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
