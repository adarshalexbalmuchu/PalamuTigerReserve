import { useState, useMemo } from 'react'
import { Filter, SortAsc, Info } from 'lucide-react'
import { properties, typeLabels, amenityLabels } from '../data/ptr-data.js'
import DestinationCard from '../components/DestinationCard.jsx'

const AMENITY_OPTIONS = ['ac', 'food', 'balcony', 'geyser', 'parking']

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
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-3">Palamu Tiger Reserve</p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-3">Forest Stays</h1>
          <p className="text-neutral-300 text-lg font-serif italic">
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
              showFilters ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <Filter size={15} />
            Filters
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
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
                  ? 'bg-neutral-800 text-white border-neutral-800'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {z === 'all' ? 'All Zones' : z === 'north' ? '↑ North Zone' : '↓ South Zone'}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <SortAsc size={14} className="text-neutral-500" />
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
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6 shadow-sm">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">Property Type</label>
                <select value={type} onChange={e => setType(e.target.value)} className="select-field text-sm">
                  <option value="all">All Types</option>
                  {Object.entries(typeLabels).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Max price */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Max Price: <span className="text-neutral-600">₹{maxPrice.toLocaleString()}/night</span>
                </label>
                <input
                  type="range" min={1500} max={5000} step={500}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-neutral-800"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>₹1,500</span><span>₹5,000</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">Required Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map(k => (
                    <button
                      key={k}
                      onClick={() => toggleAmenity(k)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                        requiredAmenities.includes(k)
                          ? 'bg-neutral-800 text-white border-neutral-800'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
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
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-neutral-100">
                <span className="text-xs text-neutral-500 font-medium">Active filters:</span>
                {activeFilters.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full">
                    {f}
                  </span>
                ))}
                <button
                  onClick={() => { setZone('all'); setType('all'); setMaxPrice(5000); setRequiredAmenities([]); setSortBy('default') }}
                  className="text-xs text-black hover:underline font-medium ml-1"
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
          <p className="text-neutral-700">
            <strong>Check-in 1:00 PM · Check-out 11:00 AM · Must report by 4:00 PM.</strong>{' '}
            Standard FRH base tariffs cover room only - generator usage billed separately on-site.
            Valid Govt. ID mandatory at check-in.
          </p>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🌿</span>
            <h3 className="font-serif font-bold text-xl text-neutral-800 mb-2">No properties match your filters</h3>
            <p className="text-neutral-600 text-sm mb-4">Try adjusting your filters or clearing them to see all options.</p>
            <button
              onClick={() => { setZone('all'); setType('all'); setMaxPrice(5000); setRequiredAmenities([]) }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-neutral-500 mb-5">
              Showing <strong className="text-neutral-800">{filtered.length}</strong> of {properties.length} properties
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <div key={p.id} style={{ minHeight: '380px' }}>
                  <DestinationCard
                    imageUrl={p.imageUrl || '/card-bg-1.jpg'}
                    imageAlt={p.name}
                    title={p.name}
                    stats={`${p.zone === 'north' ? 'North Zone' : 'South Zone'} · ${p.location.split(',')[0]} · ₹${(p.pricePerNight || p.priceMin)?.toLocaleString()}/night`}
                    href={`#/stays/${p.id}`}
                    themeColor="0 0% 6%"
                    ctaLabel="View Details"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
