import { useParams, Link, Navigate } from 'react-router-dom'
import { Phone, MapPin, Clock, Users, AlertTriangle, CheckCircle, ChevronLeft } from 'lucide-react'
import { getPropertyById, amenityLabels, typeLabels, checkInRules, cancellationPolicy } from '../data/ptr-data.js'

export default function StayDetail() {
  const { id } = useParams()
  const p = getPropertyById(id)
  if (!p) return <Navigate to="/stays" replace />

  const enabledAmenities = Object.entries(p.amenities)
    .filter(([, v]) => v)
    .map(([k]) => ({ key: k, label: amenityLabels[k] }))

  const disabledAmenities = Object.entries(p.amenities)
    .filter(([, v]) => !v)
    .map(([k]) => ({ key: k, label: amenityLabels[k] }))

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div
        className="h-64 sm:h-80 relative flex items-end"
        style={{
          background: p.zone === 'north'
            ? 'linear-gradient(155deg, #071910 0%, #1a4731 50%, #2d6a4f 100%)'
            : 'linear-gradient(155deg, #3d2810 0%, #5c3d1e 50%, #a06840 100%)',
        }}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-10 select-none">
          {p.type === 'treehouse' ? '🌲' : p.type === 'tent' ? '⛺' : p.type === 'cottage' ? '🏡' : '🏠'}
        </span>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
          <Link to="/stays" className="inline-flex items-center gap-1.5 text-forest-300 hover:text-cream text-sm mb-4 transition-colors">
            <ChevronLeft size={16} /> Back to all stays
          </Link>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <div className="flex gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  p.zone === 'north' ? 'bg-forest-800/80 text-forest-200' : 'bg-earth-800/80 text-earth-200'
                }`}>
                  {p.zone === 'north' ? '↑ North Zone' : '↓ South Zone'}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white">
                  {typeLabels[p.type]}
                </span>
              </div>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-cream">{p.name}</h1>
              <p className="text-forest-300 text-sm mt-1 flex items-center gap-1.5">
                <MapPin size={13} /> {p.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-3">About This Property</h2>
              <p className="text-earth-700 leading-relaxed">{p.description}</p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-4">What's Included</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {p.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-forest-500 flex-shrink-0 mt-0.5" />
                    <span className="text-earth-700 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {enabledAmenities.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-2 p-3 bg-forest-50 border border-forest-100 rounded-xl">
                    <CheckCircle size={15} className="text-forest-600" />
                    <span className="text-sm text-forest-700 font-medium">{label}</span>
                  </div>
                ))}
                {disabledAmenities.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-2 p-3 bg-earth-50 border border-earth-100 rounded-xl opacity-50">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-earth-300 flex-shrink-0" />
                    <span className="text-sm text-earth-400 line-through">{label}</span>
                  </div>
                ))}
              </div>
              {p.generatorExtra && (
                <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-earth-700">
                  <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  Generator usage is billed separately on-site. Carry cash for auxiliary charges.
                </div>
              )}
            </section>

            {/* Best for */}
            <section>
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-3">Best For</h2>
              <div className="flex flex-wrap gap-2">
                {p.bestFor.map(b => (
                  <span key={b} className="bg-earth-50 border border-earth-200 text-earth-700 text-sm px-3 py-1.5 rounded-full">{b}</span>
                ))}
              </div>
            </section>

            {/* Cancellation policy */}
            <section className="bg-white border border-earth-200 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-xl text-forest-800 mb-4">Cancellation Policy</h2>
              <div className="space-y-3">
                {cancellationPolicy.accommodation.map((slab, i) => (
                  <div
                    key={i}
                    className={`policy-slab ${
                      slab.fee === 100 ? 'bg-red-50 border-red-200' :
                      slab.fee === 50 ? 'bg-amber-50 border-amber-200' :
                      'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      slab.fee === 100 ? 'bg-red-100 text-red-700' :
                      slab.fee === 50 ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {slab.fee}%
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-forest-800">{slab.label}</div>
                      <div className="text-xs text-earth-600 mt-0.5">{slab.condition}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-earth-500 mt-4 border-t border-earth-100 pt-3">
                Refunds processed within 7–10 working days to original payment method. Gateway fees non-refundable.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price card */}
            <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-nature sticky top-24">
              <div className="mb-4">
                {p.priceMin ? (
                  <div>
                    <span className="text-3xl font-bold font-serif text-forest-800">₹{p.priceMin.toLocaleString()}</span>
                    <span className="text-earth-500 text-sm"> – ₹{p.priceMax?.toLocaleString()}</span>
                    <span className="text-earth-500 text-sm">/night</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold font-serif text-forest-800">₹{p.pricePerNight?.toLocaleString()}</span>
                    <span className="text-earth-500 text-sm">/night</span>
                  </div>
                )}
                <p className="text-xs text-earth-400 mt-1">Base tariff, room only</p>
              </div>

              <div className="space-y-2.5 mb-5 py-4 border-y border-earth-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-earth-600 flex items-center gap-1.5"><Clock size={14} /> Check-in</span>
                  <span className="font-semibold text-forest-800">{checkInRules.checkIn}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-earth-600 flex items-center gap-1.5"><Clock size={14} /> Check-out</span>
                  <span className="font-semibold text-forest-800">{checkInRules.checkOut}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-earth-600 flex items-center gap-1.5"><Users size={14} /> Units available</span>
                  <span className="font-semibold text-forest-800">{p.units || 'Limited'} units</span>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5">
                <div className="flex items-start gap-2 text-xs text-red-700">
                  <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
                  <p><strong>4:00 PM Deadline:</strong> All guests must report to reception before 4:00 PM on arrival day. No exceptions.</p>
                </div>
              </div>

              <a
                href={`tel:${p.contactNumber}`}
                className="btn-primary w-full justify-center text-sm mb-3"
              >
                <Phone size={15} />
                Call to Book: {p.contactName}
              </a>
              <Link to="/plan" className="btn-secondary w-full justify-center text-sm">
                Include in Trip Plan
              </Link>
            </div>

            {/* Contact info */}
            <div className="bg-forest-50 border border-forest-100 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-forest-800 mb-3">Property Contact</h3>
              <p className="text-sm font-medium text-forest-700 mb-1">{p.contactName}</p>
              <a
                href={`tel:${p.contactNumber}`}
                className="flex items-center gap-2 text-forest-600 hover:text-palash text-sm transition-colors"
              >
                <Phone size={14} />
                {p.contactNumber}
              </a>
              <p className="text-xs text-earth-500 mt-3">
                Nearest safari gate: {p.nearestSafariGate}
              </p>
            </div>

            {/* ID reminder */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-semibold text-earth-800 mb-2 text-sm">Valid ID Required at Check-in</h3>
              <ul className="space-y-1">
                {checkInRules.idRequired.map(id => (
                  <li key={id} className="text-xs text-earth-600 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-earth-400" />
                    {id}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
