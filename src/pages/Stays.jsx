import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Filter, SortAsc, ChevronRight, X, Info } from 'lucide-react'
import { properties, typeLabels, amenityLabels } from '../data/ptr-data.js'

const AMENITY_OPTIONS = ['ac', 'food', 'balcony', 'geyser', 'parking']

function PropertyCard({ p }) {
  const displayAmenities = Object.entries(p.amenities)
    .filter(([k, v]) => v && AMENITY_OPTIONS.includes(k))
    .map(([k]) => amenityLabels[k])

  return (
    <Link to={`/stays/${p.id}`} className="card group block hover:-translate-y-1 transition-transform duration-300">
      {/* Image area */}
      <div
        className="h-52 relative overflow-hidden flex items-end p-4"
        style={{
          background: p.zone === 'north'
            ? 'linear-gradient(155deg, #0d2a1c 0%, #1a4731 40%, #2d6a4f 80%, #40916c 100%)'
            : 'linear-gradient(155deg, #3d2810 0%, #5c3d1e 40%, #a06840 80%, #bf7d3a 100%)',
        }}
      >
        <span className="text-7xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12] select-none group-hover:opacity-20 transition-opacity">
          {p.type === 'treehouse' ? '🌲' : p.type === 'tent' ? '⛺' : p.type === 'cottage' ? '🏡' : '🏠'}
        </span>
        <div className="relative z-10 flex items-end justify-between w-full">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            p.zone === 'north' ? 'bg-forest-800/80 text-forest-200' : 'bg-earth-800/80 text-earth-200'
          }`}>
            {p.zone === 'north' ? '↑ North Zone' : '↓ South Zone'}
          </span>
          {p.generatorExtra && (
            <span className="text-[10px] bg-amber-500/90 text-white px-2 py-0.5 rounded-full font-medium">
              Generator extra
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif font-bold text-lg text-forest-800 leading-tight">{p.name}</h3>
          <span className="text-xs text-earth-500 bg-earth-50 border border-earth-200 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
            {typeLabels[p.type]}
          </span>
        </div>
        <p className="text-xs text-earth-500 mb-3">{p.location}</p>

        {/* Description */}
        <p className="text-sm text-earth-700 leading-relaxed line-clamp-2 mb-4">{p.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {displayAmenities.map(a => (
            <span key={a} className="amenity-chip text-[11px]">{a}</span>
          ))}
          {p.units && p.units <= 4 && (
            <span className="amenity-chip text-palash border-palash/20 bg-palash/5 text-[11px]">
              Only {p.units} units
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-earth-100">
          <div>
            {p.priceMin ? (
              <span className="font-bold text-forest-800">₹{p.priceMin.toLocaleString()} – ₹{p.priceMax.toLocaleString()}<span className="text-xs text-earth-500 font-normal">/night</span></span>
            ) : (
              <span className="font-bold text-forest-800 text-xl">₹{p.pricePerNight?.toLocaleString()}<span className="text-xs text-earth-500 font-normal">/night</span></span>
            )}
          </div>
          <span className="text-sm font-semibold text-forest-600 group-hover:text-palash flex items-center gap-1 transition-colors">
            View <ChevronRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Stays() {
  const [zone, setZone] = useState('all')
  const [type, setType] = useState('all')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [requiredAmenities, setRequiredAmenities] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  const toggleAmenity = (key) => {
    setRequiredAmenities(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const filtered = useMemo(() => {
    let list = [...properties]
    if (zone !== 'all') list = list.filter(p => p.zone === zone)
    if (type !== 'all') list = list.filter(p => p.type === type)
    list = list.filter(p => (p.pricePerNight || p.priceMin || 0) <= maxPrice)
    if (requiredAmenities.length) {
      list = list.filter(p => requiredAmenities.every(k => p.amenities[k]))
    }
    if (sortBy === 'price-asc')  list.sort((a, b) => (a.pricePerNight || a.priceMin || 0) - (b.pricePerNight || b.priceMin || 0))
    if (sortBy === 'price-desc') list.sort((a, b) => (b.pricePerNight || b.priceMin || 0) - (a.pricePerNight || a.priceMin || 0))
    if (sortBy === 'units-asc')  list.sort((a, b) => (a.units || 99) - (b.units || 99))
    return list
  }, [zone, type, maxPrice, requiredAmenities, sortBy])

  const activeFilters = [
    zone !== 'all' && `Zone: ${zone}`,
    type !== 'all' && `Type: ${typeLabels[type]}`,
    maxPrice < 5000 && `Max ₹${maxPrice}/night`,
    ...requiredAmenities.map(k => amenityLabels[k]),
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-forest-900 text-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-forest-400 text-xs font-bold uppercase tracking-widest mb-3">Palamu Tiger Reserve</p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-3">Forest Stays</h1>
          <p className="text-forest-300 text-lg font-serif italic">
            {properties.length} accommodations across North & South Zones - from ₹1,500 to ₹3,000/night
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              showFilters ? 'bg-forest-800 text-cream border-forest-800' : 'bg-white text-earth-700 border-earth-200 hover:border-forest-400'
            }`}
          >
            <Filter size={15} />
            Filters
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-palash text-white text-xs flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Zone quick filter */}
          {['all', 'north', 'south'].map(z => (
            <button
              key={z}
              onClick={() => setZone(z)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                zone === z
                  ? 'bg-forest-700 text-cream border-forest-700'
                  : 'bg-white text-earth-700 border-earth-200 hover:border-forest-400'
              }`}
            >
              {z === 'all' ? 'All Zones' : z === 'north' ? '↑ North Zone' : '↓ South Zone'}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <SortAsc size={14} className="text-earth-500" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="select-field py-2 pr-8 text-sm w-auto"
            >
              <option value="default">Default Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="units-asc">Availability (least units first)</option>
            </select>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-earth-200 p-6 mb-6 shadow-sm">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type */}
              <div>
                <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">Property Type</label>
                <select value={type} onChange={e => setType(e.target.value)} className="select-field text-sm">
                  <option value="all">All Types</option>
                  {Object.entries(typeLabels).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Max price */}
              <div>
                <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">
                  Max Price: <span className="text-forest-600">₹{maxPrice.toLocaleString()}/night</span>
                </label>
                <input
                  type="range" min={1500} max={5000} step={500}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-forest-600"
                />
                <div className="flex justify-between text-xs text-earth-400 mt-1">
                  <span>₹1,500</span><span>₹5,000</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">Required Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map(k => (
                    <button
                      key={k}
                      onClick={() => toggleAmenity(k)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                        requiredAmenities.includes(k)
                          ? 'bg-forest-700 text-cream border-forest-700'
                          : 'bg-white text-earth-600 border-earth-200 hover:border-forest-400'
                      }`}
                    >
                      {amenityLabels[k]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-earth-100">
                <span className="text-xs text-earth-500 font-medium">Active filters:</span>
                {activeFilters.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 text-xs bg-forest-100 text-forest-700 px-2.5 py-1 rounded-full">
                    {f}
                  </span>
                ))}
                <button
                  onClick={() => { setZone('all'); setType('all'); setMaxPrice(5000); setRequiredAmenities([]); setSortBy('default') }}
                  className="text-xs text-palash hover:underline font-medium ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}

        {/* Important notice */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm">
          <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-earth-700">
            <strong>Check-in 1:00 PM · Check-out 11:00 AM · Must report by 4:00 PM.</strong>{' '}
            Standard FRH base tariffs cover room only - generator usage billed separately on-site.
            Valid Govt. ID mandatory at check-in.
          </p>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🌿</span>
            <h3 className="font-serif font-bold text-xl text-forest-800 mb-2">No properties match your filters</h3>
            <p className="text-earth-600 text-sm mb-4">Try adjusting your filters or clearing them to see all options.</p>
            <button
              onClick={() => { setZone('all'); setType('all'); setMaxPrice(5000); setRequiredAmenities([]) }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-earth-500 mb-5">
              Showing <strong className="text-forest-800">{filtered.length}</strong> of {properties.length} properties
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
