import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  ChevronRight, ChevronLeft, CheckCircle, Phone, MapPin,
  Calendar, Users, Wallet, Car, Share2, Download, AlertTriangle, ArrowRight
} from 'lucide-react'
import {
  packages, properties, visitSites, contacts,
  getPropertyById, getVisitSiteById, typeLabels
} from '../data/ptr-data.js'
import DestinationCard from '../components/DestinationCard.jsx'

// ─── Day card in itinerary view ──────────────────────────────────────────────
function DayCard({ day, total }) {
  const typeStyle = {
    safari:    'bg-forest-100 text-forest-700 border-forest-200',
    heritage:  'bg-palash/10 text-palash border-palash/20',
    activity:  'bg-blue-50 text-blue-700 border-blue-200',
    checkin:   'bg-amber-50 text-amber-700 border-amber-200',
    logistics: 'bg-earth-50 text-earth-600 border-earth-200',
    meal:      'bg-orange-50 text-orange-700 border-orange-200',
  }
  return (
    <div className="day-card">
      <div className="bg-forest-800 text-cream px-5 py-3 flex items-center justify-between">
        <div>
          <span className="text-forest-400 text-xs font-medium">Day {day.day} of {total}</span>
          <h3 className="font-serif font-bold text-lg">{day.title}</h3>
        </div>
        {day.stay && (
          <div className="text-right">
            <div className="text-[10px] text-forest-400 uppercase tracking-wider">Stay</div>
            <div className="text-xs font-semibold text-gold">{day.stay.split('(')[0].trim()}</div>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="space-y-3 mb-5">
          {day.stops.map((stop, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="timeline-dot" />
                {i < day.stops.length - 1 && <div className="w-px flex-1 bg-earth-100 mt-1" />}
              </div>
              <div className={`flex-1 min-w-0 ${i < day.stops.length - 1 ? 'pb-3' : ''}`}>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-earth-500">{stop.time}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeStyle[stop.type]}`}>
                    {stop.type}
                  </span>
                </div>
                <p className="text-sm text-earth-700">{stop.activity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Commute info */}
        {day.commute && (
          <div className="bg-forest-50 border border-forest-100 rounded-xl p-4 text-sm">
            <div className="flex items-start gap-2 mb-2">
              <Car size={14} className="text-forest-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-forest-800">
                  {day.commute.from} → {day.commute.to}
                </span>
                <span className="text-earth-500 mx-1">·</span>
                <span className="text-earth-600">{day.commute.distance}</span>
              </div>
            </div>
            <p className="text-earth-600 ml-5 mb-2">By: <span className="font-medium text-earth-700">{day.commute.by}</span></p>
            <a
              href={`tel:${day.commute.contactForTransport.replace(/\s/g, '')}`}
              className="ml-5 inline-flex items-center gap-1.5 text-xs text-forest-600 hover:text-palash font-semibold transition-colors"
            >
              <Phone size={11} /> Forest-verified transport: {day.commute.contactForTransport}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Trip Report Output ──────────────────────────────────────────────────────
function TripReport({ itinerary, totalCost, includes, groupSize, title }) {
  return (
    <div className="bg-white border border-earth-200 rounded-2xl overflow-hidden print:shadow-none">
      {/* Report header */}
      <div className="bg-forest-800 text-cream p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-forest-400 text-xs uppercase tracking-widest mb-1">
              Government of Jharkhand | Palamu Tiger Reserve
            </div>
            <h2 className="font-serif font-bold text-2xl">{title}</h2>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-forest-300">
              <span><Users size={12} className="inline mr-1" />{groupSize} persons</span>
              <span><Calendar size={12} className="inline mr-1" />{itinerary.length} days</span>
              <span><Wallet size={12} className="inline mr-1" />Est. ₹{totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Includes */}
      <div className="px-6 py-4 bg-forest-50 border-b border-forest-100">
        <p className="text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">Package Includes</p>
        <div className="flex flex-wrap gap-1.5">
          {includes.map(item => (
            <span key={item} className="text-xs bg-white border border-forest-200 text-forest-700 px-2 py-0.5 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Day-by-day */}
      <div className="p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-800">Day-by-Day Itinerary</h3>
        {itinerary.map(day => (
          <DayCard key={day.day} day={day} total={itinerary.length} />
        ))}
      </div>

      {/* Contacts */}
      <div className="mx-6 mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-semibold text-earth-800 mb-3 flex items-center gap-2">
          <Phone size={15} className="text-amber-600" />
          Key Contact Numbers
        </h3>
        <div className="space-y-2">
          <a href={`tel:${contacts.helpline.number}`} className="flex items-center justify-between bg-white border border-amber-100 rounded-xl px-4 py-2.5 hover:border-gold transition-colors">
            <div>
              <div className="text-xs text-earth-500">{contacts.helpline.label}</div>
              <div className="font-bold text-forest-800">{contacts.helpline.display}</div>
            </div>
            <Phone size={15} className="text-gold" />
          </a>
          <a href={`tel:${contacts.complaints.number}`} className="flex items-center justify-between bg-white border border-amber-100 rounded-xl px-4 py-2.5 hover:border-gold transition-colors">
            <div>
              <div className="text-xs text-earth-500">{contacts.complaints.label}</div>
              <div className="font-bold text-forest-800">{contacts.complaints.display}</div>
            </div>
            <Phone size={15} className="text-earth-500" />
          </a>
        </div>
      </div>

      {/* Important reminders */}
      <div className="mx-6 mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
        <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2 text-sm">
          <AlertTriangle size={14} /> Critical Reminders
        </h3>
        <ul className="text-xs text-red-700 space-y-1">
          <li>• Report to PTR reception <strong>before 4:00 PM</strong> on arrival day - no exceptions</li>
          <li>• Carry valid Government-issued photo ID for all group members</li>
          <li>• Park is closed to tourists July 1 – September 30 annually</li>
          <li>• Forest-verified transport contacts are listed for each leg</li>
        </ul>
      </div>

      {/* Share / Print buttons */}
      <div className="px-6 pb-6 flex flex-wrap gap-3">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-forest-800 text-cream text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-forest-700 transition-colors"
        >
          <Download size={15} /> Save as PDF
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: `PTR Trip Plan: ${title}`, url: window.location.href })
            }
          }}
          className="flex items-center gap-2 border border-earth-300 text-earth-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:border-forest-400 transition-colors"
        >
          <Share2 size={15} /> Share Trip Plan
        </button>
      </div>
    </div>
  )
}

// ─── MODE B: Custom Builder ──────────────────────────────────────────────────
function CustomBuilder() {
  const [step, setStep] = useState(1)
  const [selectedProps, setSelectedProps] = useState([])
  const [budget, setBudget] = useState(10000)
  const [groupSize, setGroupSize] = useState(2)
  const [days, setDays] = useState(3)
  const [ownVehicle, setOwnVehicle] = useState(false)
  const [requiredAmenities, setRequiredAmenities] = useState([])
  const [generatedTrip, setGeneratedTrip] = useState(null)

  const toggleProp = (id) => {
    setSelectedProps(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleAmenity = (a) => {
    setRequiredAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  const availableProps = properties.filter(p => {
    const price = p.pricePerNight || p.priceMin || 0
    if (price * days * groupSize > budget * 1.5) return false
    if (requiredAmenities.includes('ac') && !p.amenities.ac) return false
    if (requiredAmenities.includes('food') && !p.amenities.food) return false
    return true
  })

  const generateItinerary = () => {
    if (!selectedProps.length) return
    const chosen = selectedProps.map(id => getPropertyById(id)).filter(Boolean)
    const itinerary = []
    for (let d = 0; d < Math.min(days, chosen.length + 1); d++) {
      const prop = chosen[d]
      const nextProp = chosen[d + 1]
      const isLast = d === Math.min(days, chosen.length + 1) - 1

      // Auto-insert visit sites based on property location
      const autoSites = []
      if (prop?.id?.includes('betla') || prop?.id?.includes('tree-house')) {
        autoSites.push({ time: '10:30 AM', activity: 'Visit Palamu Forts – heritage guided tour (10 AM – 2 PM)', type: 'heritage' })
      }
      if (prop?.id?.includes('kechki')) {
        autoSites.push({ time: '5:00 PM', activity: 'Sunset at Kechki River Confluence (North Koel + Auranga Sangam)', type: 'activity' })
      }
      if (prop?.id?.includes('mahuadanr')) {
        autoSites.push({ time: '2:00 PM', activity: 'Wolf Safari at Mahuadanr Wolf Sanctuary', type: 'safari' })
        autoSites.push({ time: '8:00 AM', activity: 'Lodh Falls (468-ft cascade, 2 km from FRH)', type: 'activity' })
      }
      if (prop?.id?.includes('netarhat')) {
        autoSites.push({ time: '5:30 AM', activity: 'Sunrise at Koel Point / Magnus Point', type: 'activity' })
      }

      const stops = []
      if (d === 0) {
        stops.push({ time: 'By 3:30 PM', activity: `Arrive at ${prop?.name || 'PTR'} – report to reception before 4 PM`, type: 'logistics' })
      } else {
        stops.push({ time: '6:00 AM', activity: 'Morning Jeep Safari – core / buffer zone (3 hours)', type: 'safari' })
        stops.push({ time: '9:30 AM', activity: 'Breakfast and rest', type: 'meal' })
      }
      stops.push(...autoSites)
      if (!isLast && nextProp) {
        stops.push({ time: '1:00 PM', activity: `Check-out · Drive to ${nextProp.name}`, type: 'logistics' })
        stops.push({ time: '3:00 PM', activity: `Check-in ${nextProp.name}`, type: 'checkin' })
      }

      itinerary.push({
        day: d + 1,
        title: d === 0 ? `Arrive at ${prop?.name || 'PTR'}`
               : isLast ? 'Final Morning – Departure'
               : `Explore & Onward to ${nextProp?.name || 'next stop'}`,
        stops,
        stay: prop ? `${prop.name} (₹${prop.pricePerNight?.toLocaleString() || prop.priceMin?.toLocaleString()}/night)` : null,
        commute: d > 0 && prop && chosen[d - 1] ? {
          from: chosen[d - 1].location.split(',')[0],
          to: prop.location.split(',')[0],
          distance: 'See route details',
          by: ownVehicle ? 'Own vehicle' : 'Forest-verified transport (fixed rate)',
          contactForTransport: contacts.helpline.display,
        } : {
          from: 'Daltonganj / your origin',
          to: prop?.name || 'Betla',
          distance: 'Daltonganj 25 km · Barwadih 12 km from Betla',
          by: ownVehicle ? 'Own vehicle via NH-75' : 'Forest-verified transport',
          contactForTransport: contacts.helpline.display,
        },
      })
    }

    const totalStayCost = chosen.reduce((sum, p) => sum + (p.pricePerNight || p.priceMin || 0), 0)
    const safariCost = Math.ceil(days / 2) * 1800 * Math.ceil(groupSize / 6)
    const transportCost = ownVehicle ? 0 : (chosen.length - 1) * 1500

    setGeneratedTrip({
      itinerary,
      totalCost: (totalStayCost + safariCost + transportCost) * (groupSize > 1 ? 1 : 1),
      includes: [
        ...chosen.map(p => `Stay at ${p.name}`),
        `${Math.ceil(days / 2)} Jeep Safari(s)`,
        !ownVehicle ? 'Forest-verified transport' : 'Own vehicle',
        'Forest guide (each leg)',
      ],
      title: `Custom ${days}-Day PTR Journey`,
    })
    setStep(4)
  }

  if (step === 4 && generatedTrip) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setStep(1); setGeneratedTrip(null) }} className="flex items-center gap-1.5 text-sm text-earth-600 hover:text-forest-700 transition-colors">
            <ChevronLeft size={16} /> Back to builder
          </button>
          <h2 className="font-serif font-bold text-2xl text-forest-800">Your Custom Trip Plan</h2>
        </div>
        <TripReport {...generatedTrip} groupSize={groupSize} />
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {['Choose Stays', 'Set Filters', 'Review & Generate', 'Your Trip'].map((label, i) => (
            <div key={label} className={`flex items-center gap-1.5 text-xs font-medium ${step >= i + 1 ? 'text-neutral-700' : 'text-neutral-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i + 1 ? 'bg-neutral-600 text-white' :
                step === i + 1 ? 'bg-black text-white' :
                'bg-neutral-200 text-neutral-400'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className="hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />
        </div>
      </div>

      {/* Step 1: Pick properties */}
      {step === 1 && (
        <div>
          <h3 className="font-serif font-bold text-xl text-neutral-900 mb-1">Choose Your Properties</h3>
          <p className="text-neutral-500 text-sm mb-5">Select which forest stays you'd like to visit on your journey</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {properties.map(p => (
              <div key={p.id} style={{ minHeight: '340px' }}>
                <DestinationCard
                  imageUrl="/card-bg-1.jpg"
                  imageAlt={p.name}
                  title={p.name}
                  stats={`${p.zone === 'north' ? 'North Zone' : 'South Zone'} · ${p.location.split(',')[0]} · ₹${(p.pricePerNight || p.priceMin)?.toLocaleString()}/night`}
                  onClick={() => toggleProp(p.id)}
                  selected={selectedProps.includes(p.id)}
                  themeColor="0 0% 6%"
                  ctaLabel="Select Stay"
                  minHeight="340px"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              {selectedProps.length === 0 ? 'Select at least one property' : `${selectedProps.length} ${selectedProps.length === 1 ? 'property' : 'properties'} selected`}
            </p>
            <button
              disabled={selectedProps.length === 0}
              onClick={() => setStep(2)}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next: Set Filters <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Filters */}
      {step === 2 && (
        <div>
          <h3 className="font-serif font-bold text-xl text-forest-800 mb-1">Set Your Preferences</h3>
          <p className="text-earth-500 text-sm mb-6">Fine-tune your trip</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">
                Total Budget: <span className="normal-case">₹{budget.toLocaleString()}</span>
              </label>
              <input type="range" min={3000} max={50000} step={1000} value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full accent-forest-600" />
              <div className="flex justify-between text-xs text-earth-400 mt-1"><span>₹3,000</span><span>₹50,000</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">
                Group Size: <span className="normal-case">{groupSize} {groupSize === 1 ? 'person' : 'persons'}</span>
              </label>
              <input type="range" min={1} max={12} value={groupSize} onChange={e => setGroupSize(Number(e.target.value))} className="w-full accent-forest-600" />
              <div className="flex justify-between text-xs text-earth-400 mt-1"><span>1</span><span>12</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">
                Trip Length: <span className="normal-case">{days} days</span>
              </label>
              <input type="range" min={1} max={7} value={days} onChange={e => setDays(Number(e.target.value))} className="w-full accent-forest-600" />
              <div className="flex justify-between text-xs text-earth-400 mt-1"><span>1 day</span><span>7 days</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-3">Vehicle</label>
              <div className="grid grid-cols-2 gap-2">
                {[[true, '🚗 Own Vehicle'], [false, '🚙 Forest Transport (Verified)']].map(([val, label]) => (
                  <button
                    key={String(val)}
                    onClick={() => setOwnVehicle(val)}
                    className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                      ownVehicle === val ? 'bg-forest-700 text-cream border-forest-700' : 'bg-white text-earth-700 border-earth-200 hover:border-forest-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {!ownVehicle && (
                <p className="text-xs text-forest-600 mt-1.5">
                  ✓ Forest-verified, fixed-rate transport · Cannot overcharge
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">Required Amenities</label>
              <div className="flex flex-wrap gap-2">
                {['ac', 'food', 'balcony', 'geyser', 'parking'].map(k => (
                  <button
                    key={k}
                    onClick={() => toggleAmenity(k)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      requiredAmenities.includes(k) ? 'bg-forest-700 text-cream border-forest-700' : 'bg-white text-earth-600 border-earth-200'
                    }`}
                  >
                    {k === 'ac' ? 'Air Conditioning' : k === 'food' ? 'Food Available' : k === 'balcony' ? 'Balcony' : k === 'geyser' ? 'Geyser' : 'Parking'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-secondary"><ChevronLeft size={15} /> Back</button>
            <button onClick={() => setStep(3)} className="btn-primary">Review Trip <ChevronRight size={15} /></button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div>
          <h3 className="font-serif font-bold text-xl text-forest-800 mb-1">Review Your Selection</h3>
          <p className="text-earth-500 text-sm mb-6">Confirm your choices before we generate your itinerary</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-earth-200 rounded-2xl p-5">
              <h4 className="font-semibold text-forest-800 mb-3">Selected Properties ({selectedProps.length})</h4>
              <div className="space-y-2">
                {selectedProps.map(id => {
                  const p = getPropertyById(id)
                  return p ? (
                    <div key={id} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className="text-forest-500" />
                      <span className="text-earth-700">{p.name}</span>
                      <span className="text-earth-400 ml-auto">₹{p.pricePerNight?.toLocaleString()}/n</span>
                    </div>
                  ) : null
                })}
              </div>
            </div>

            <div className="bg-white border border-earth-200 rounded-2xl p-5">
              <h4 className="font-semibold text-forest-800 mb-3">Trip Settings</h4>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Duration', value: `${days} days` },
                  { label: 'Group size', value: `${groupSize} persons` },
                  { label: 'Budget', value: `₹${budget.toLocaleString()}` },
                  { label: 'Vehicle', value: ownVehicle ? 'Own vehicle' : 'Forest-verified transport' },
                  { label: 'Amenities required', value: requiredAmenities.length ? requiredAmenities.join(', ') : 'None specified' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-earth-500">{label}</span>
                    <span className="font-medium text-forest-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-forest-50 border border-forest-100 rounded-xl p-4 mb-6 text-sm text-earth-700">
            <strong className="text-forest-800">Auto-included visit sites:</strong> Based on your selected properties,
            we'll automatically add nearby attractions - Palamu Forts (with Betla stays), Kechki Confluence,
            Lodh Falls (with Mahuadanr), Netarhat sunrise views, and more.
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-secondary"><ChevronLeft size={15} /> Back</button>
            <button onClick={generateItinerary} className="btn-primary">
              Generate My Itinerary <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main PlanTrip page ──────────────────────────────────────────────────────
export default function PlanTrip() {
  const location = useLocation()
  const initialMode = location.state?.mode || 'packages'
  const initialPackageId = location.state?.packageId || null

  const [mode, setMode] = useState(initialMode)
  const [selectedPackageId, setSelectedPackageId] = useState(initialPackageId)

  const selectedPackage = packages.find(p => p.id === selectedPackageId)

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-3">PTR Journey Planner</p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">Plan My Trip</h1>
          <p className="text-neutral-300 text-lg font-serif italic">
            Choose a ready-made circuit, or build your own multi-property itinerary
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mode switcher */}
        <div className="flex gap-3 mb-8 p-1 bg-earth-100 rounded-xl w-fit">
          <button
            onClick={() => { setMode('packages'); setSelectedPackageId(null) }}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'packages' ? 'bg-black text-white shadow-sm' : 'text-neutral-700 hover:text-black'}`}
          >
            Browse Packages
          </button>
          <button
            onClick={() => { setMode('custom'); setSelectedPackageId(null) }}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'custom' ? 'bg-black text-white shadow-sm' : 'text-neutral-700 hover:text-black'}`}
          >
            Build My Own
          </button>
        </div>

        {/* Mode A: Packages */}
        {mode === 'packages' && (
          <div>
            {!selectedPackageId ? (
              <div>
                <h2 className="font-serif font-bold text-2xl text-forest-800 mb-2">Ready-Made Packages</h2>
                <p className="text-earth-500 text-sm mb-6">
                  Fully planned circuits with day-by-day itineraries, commutation details, and contact numbers
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map(pkg => (
                    <div key={pkg.id} style={{ minHeight: '380px' }}>
                      <DestinationCard
                        imageUrl="/card-bg-1.jpg"
                        imageAlt={pkg.name}
                        title={pkg.name}
                        stats={`${pkg.duration} Days · ₹${pkg.estimatedCost.perPerson.toLocaleString()}/person · ${pkg.bestSeason}`}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        selected={selectedPackageId === pkg.id}
                        themeColor="0 0% 6%"
                        ctaLabel="View Itinerary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedPackageId(null)}
                  className="flex items-center gap-1.5 text-sm text-earth-500 hover:text-forest-700 mb-6 transition-colors"
                >
                  <ChevronLeft size={16} /> Back to packages
                </button>
                <TripReport
                  itinerary={selectedPackage.itinerary}
                  totalCost={selectedPackage.estimatedCost.twoPersons}
                  includes={selectedPackage.includes}
                  groupSize={2}
                  title={`${selectedPackage.name} - ${selectedPackage.subtitle}`}
                />
              </div>
            )}
          </div>
        )}

        {/* Mode B: Custom */}
        {mode === 'custom' && (
          <div>
            <h2 className="font-serif font-bold text-2xl text-forest-800 mb-2">Custom Trip Builder</h2>
            <p className="text-earth-500 text-sm mb-8">
              Pick your properties, set your preferences, and we'll auto-generate a day-by-day itinerary
              with commutation details and forest contact numbers.
            </p>
            <CustomBuilder />
          </div>
        )}
      </div>
    </div>
  )
}
