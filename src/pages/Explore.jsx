import { useState, lazy, Suspense } from 'react'
import { MapPin, Filter, Plane, Train, Car } from 'lucide-react'
import { visitSites, properties } from '../data/ptr-data.js'
import { Link } from 'react-router-dom'

const MapView = lazy(() => import('../components/MapView.jsx'))

const CATEGORIES = [
  { key: 'all',       label: 'All Sites' },
  { key: 'waterfall', label: 'Waterfalls' },
  { key: 'heritage',  label: 'Heritage' },
  { key: 'wildlife',  label: 'Wildlife' },
  { key: 'scenic',    label: 'Scenic' },
]

const MAP_LEGEND = [
  { color: '#171717', label: 'Stay' },
  { color: '#3b82f6', label: 'Waterfall' },
  { color: '#6b7280', label: 'Heritage' },
  { color: '#d97706', label: 'Wildlife' },
  { color: '#059669', label: 'Scenic' },
]

function SiteCard({ site }) {
  const typeColors = {
    waterfall: 'bg-blue-50 border-blue-200 text-blue-700',
    heritage:  'bg-neutral-100 border-neutral-300 text-neutral-700',
    wildlife:  'bg-amber-50 border-amber-200 text-amber-700',
    scenic:    'bg-neutral-50 border-neutral-200 text-neutral-600',
  }
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-5 hover:shadow-nature transition-shadow">
      <div className="mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[site.type] || 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>
          {site.type}
        </span>
        <h3 className="font-serif font-bold text-neutral-800 mt-2 leading-tight">{site.name}</h3>
        <p className="text-xs text-neutral-500">{site.subtitle}</p>
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3 mb-3">{site.description}</p>
      <div className="flex flex-wrap gap-1.5 text-xs mb-3">
        <span className="bg-neutral-50 text-neutral-600 border border-neutral-200 px-2 py-1 rounded-full">Best time: {site.bestTime}</span>
        {site.distanceFromBetla && (
          <span className="bg-neutral-50 text-neutral-600 border border-neutral-200 px-2 py-1 rounded-full">{site.distanceFromBetla} from Betla</span>
        )}
      </div>
      {site.highlights && (
        <div className="border-t border-neutral-100 pt-3">
          <div className="flex flex-wrap gap-1">
            {site.highlights.slice(0, 3).map(h => (
              <span key={h} className="text-[10px] bg-neutral-50 border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full">{h}</span>
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
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-3">Interactive Explorer</p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-3">Explore PTR</h1>
          <p className="text-neutral-300 text-lg font-serif italic">
            Waterfalls, forts, wolf sanctuaries, hill stations, and more across 1,130 sq km
          </p>
        </div>
      </div>

      {/* Map Section */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-serif font-bold text-xl text-neutral-800">
              Interactive Map
            </h2>
            <div className="flex items-center gap-2">
              {[null, 'north', 'south'].map(z => (
                <button
                  key={z ?? 'all'}
                  onClick={() => setMapZone(z)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                    mapZone === z
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {z === null ? 'All Zones' : z === 'north' ? '↑ North' : '↓ South'}
                </button>
              ))}
            </div>
          </div>

          {/* Map legend */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs">
            {MAP_LEGEND.map(({ color, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-neutral-600">
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, display: 'inline-block', border: '1.5px solid #e5e5e5' }} />
                {label}
              </span>
            ))}
          </div>

          <Suspense fallback={
            <div className="h-[500px] bg-neutral-50 rounded-2xl flex items-center justify-center border border-neutral-200">
              <p className="text-sm text-neutral-400">Loading map</p>
            </div>
          }>
            <MapView height="500px" filterZone={mapZone} />
          </Suspense>

          <p className="text-xs text-neutral-400 mt-2 text-center">
            Click any marker to view details. Map data © OpenStreetMap contributors.
          </p>
        </div>
      </section>

      {/* POI Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="font-serif font-bold text-2xl text-neutral-800 mb-1">Points of Interest</h2>
            <p className="text-neutral-500 text-sm">All destinations, sites, and attractions within PTR</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                  activeCategory === key
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSites.map(s => <SiteCard key={s.id} site={s} />)}
        </div>

        {(activeCategory === 'all' || activeCategory === 'stay') && (
          <div className="mt-8">
            <h3 className="font-serif font-bold text-xl text-neutral-800 mb-4">
              All Forest Accommodations ({properties.length})
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {properties.map(p => (
                <Link key={p.id} to={`/stays/${p.id}`} className="bg-white border border-neutral-100 rounded-xl p-4 hover:shadow-nature transition-shadow group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${p.zone === 'north' ? 'bg-neutral-100 text-neutral-700' : 'bg-neutral-100 text-neutral-700'}`}>
                      {p.zone === 'north' ? 'North' : 'South'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-neutral-800 text-sm group-hover:text-black transition-colors">{p.name}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5 mb-2">{p.location}</p>
                  <p className="font-bold text-neutral-800 text-sm">₹{p.pricePerNight?.toLocaleString()}/night</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Getting Here */}
      <section className="bg-white border-t border-neutral-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-2xl text-neutral-800 mb-6">Getting to Palamu Tiger Reserve</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                Icon: Plane,
                title: 'By Air',
                options: [
                  'Birsa Munda Airport, Ranchi - 165 km',
                  'Gaya Airport, Bihar - 190 km',
                ],
              },
              {
                Icon: Train,
                title: 'By Train',
                options: [
                  'Barwadih Junction - 12 km from Betla',
                  'Daltonganj Station - 25 km from Betla',
                  'Direct trains from Delhi, Patna, Lucknow',
                ],
              },
              {
                Icon: Car,
                title: 'By Road',
                options: [
                  'Ranchi via NH-75 through Latehar (170 km)',
                  'Patna via Aurangabad (260 km)',
                  'Local buses: Daltonganj to Betla',
                ],
              },
            ].map(({ Icon, title, options }) => (
              <div key={title} className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mb-4">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="font-serif font-bold text-lg text-neutral-800 mb-3">{title}</h3>
                <ul className="space-y-1.5">
                  {options.map(o => (
                    <li key={o} className="text-sm text-neutral-700 flex items-start gap-1.5">
                      <span className="text-neutral-400 mt-1 flex-shrink-0">•</span>
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
