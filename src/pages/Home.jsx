import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Phone } from 'lucide-react'
import { packages, properties, contacts, isSeasonOpen } from '../data/ptr-data.js'
import PlanCard from '../components/PlanCard.jsx'
import DestinationCard from '../components/DestinationCard.jsx'

function AnimatedStat({ value, unit = '', label }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const end = parseInt(value)
        const step = end / 60
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setDisplay(end); clearInterval(timer) }
          else setDisplay(Math.floor(start))
        }, 20)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="py-10 px-6 text-center">
      <div className="leading-none mb-3">
        <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">
          {Math.floor(display).toLocaleString()}
        </span>
        {unit && <span className="text-base text-neutral-400 font-medium ml-2">{unit}</span>}
      </div>
      <div className="text-[11px] text-neutral-500 uppercase tracking-[0.18em]">{label}</div>
    </div>
  )
}


export default function Home() {
  const navigate = useNavigate()
  const featuredProperties = properties.filter(p => ['new-tree-house-betla', 'kechki-beach-cottage', 'netarhat-new-cottage'].includes(p.id))

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-black border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-800">
            <AnimatedStat value={1130} unit="sq km" label="Total Reserve Area" />
            <AnimatedStat value={174}  unit="+"     label="Bird Species Documented" />
            <AnimatedStat value={96}   unit="+"     label="Forest Accommodations" />
            <AnimatedStat value={1973}              label="Year of Inception" />
          </div>
        </div>
      </section>

      {/* ─── PLAN CARDS ─── */}
      <section className="py-24 bg-white section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-header mb-3">Plan Your PTR Journey</h2>
            <p className="section-sub">Choose how you'd like to explore Palamu Tiger Reserve</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <PlanCard
              imageUrl="/card-bg-1.jpg"
              imageAlt="Palamu Tiger Reserve forest"
              badge="Packages"
              title="Browse Packages"
              location="Palamu Tiger Reserve, Jharkhand"
              overview={`Pre-built itineraries with all logistics handled - from the Classic Betla Weekend to the Wolf & Wilderness ${packages.length > 0 ? packages.length + '-package' : ''} adventure.`}
              cta="View Packages"
              to="/plan"
              state={{ mode: 'packages' }}
            />
            <PlanCard
              imageUrl="/card-bg-1.jpg"
              imageAlt="Palamu Tiger Reserve wildlife"
              badge="Custom"
              title="Build My Own Trip"
              location="Design your perfect PTR experience"
              overview="Select properties, set your budget and group size, and auto-generate a day-by-day itinerary with commutation contacts."
              cta="Start Building"
              to="/plan"
              state={{ mode: 'custom' }}
            />
          </div>
        </div>
      </section>

      {/* ─── FEATURED STAYS ─── */}
      <section className="py-24 bg-white section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-header mb-2">Featured Stays</h2>
              <p className="section-sub">From riverside glamping tents to hilltop pine forest cottages</p>
            </div>
            <Link to="/stays" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-neutral-700 hover:text-black transition-colors">
              View all {properties.length} properties <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ minHeight: '380px' }}>
            {featuredProperties.map(p => (
              <div key={p.id} style={{ minHeight: '380px' }}>
                <DestinationCard
                  imageUrl={p.imageUrl || '/card-bg-1.jpg'}
                  imageAlt={p.name}
                  title={p.name}
                  stats={`${p.zone === 'north' ? 'North Zone' : 'South Zone'} · ${p.location} · Rs.${p.pricePerNight?.toLocaleString()}/night`}
                  href={`#/stays/${p.id}`}
                  themeColor="0 0% 6%"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/stays" className="btn-secondary">
              View All {properties.length} Properties
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="py-24 bg-neutral-50 section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-header mb-3">Ready-Made Packages</h2>
            <p className="section-sub">Curated circuits - just pick, plan, and go</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ minHeight: '380px' }}>
            {packages.map(pkg => (
              <div key={pkg.id} style={{ minHeight: '380px' }}>
                <DestinationCard
                  imageUrl={pkg.imageUrl || '/card-bg-1.jpg'}
                  imageAlt={pkg.name}
                  title={pkg.name}
                  stats={`${pkg.duration} Days · Rs.${pkg.estimatedCost.perPerson.toLocaleString()}/person`}
                  onClick={() => navigate('/plan', { state: { packageId: pkg.id } })}
                  themeColor="0 0% 6%"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMPORTANT INFO ─── */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Check-in times */}
            <div>
              <h3 className="font-serif font-bold text-xl text-white mb-6">4:00 PM Arrival Mandate</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Check-in', value: '1:00 PM' },
                  { label: 'Check-out', value: '11:00 AM' },
                  { label: 'Arrival Deadline', value: '4:00 PM' },
                  { label: 'ID Proof', value: 'Mandatory' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-neutral-900 rounded-lg p-4">
                    <div className="text-xs text-neutral-400 font-medium mb-1">{label}</div>
                    <div className="font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact links */}
            <div>
              <h3 className="font-serif font-bold text-xl text-white mb-6">Get in Touch</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${contacts.helpline.number}`}
                  className="flex items-center justify-between bg-neutral-900 hover:bg-neutral-800 rounded-lg p-4 transition-colors group"
                >
                  <div>
                    <div className="text-xs text-neutral-400 font-medium">{contacts.helpline.label}</div>
                    <div className="font-bold text-white text-lg">{contacts.helpline.display}</div>
                  </div>
                  <Phone size={18} className="text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={`tel:${contacts.complaints.number}`}
                  className="flex items-center justify-between bg-neutral-900 hover:bg-neutral-800 rounded-lg p-4 transition-colors group"
                >
                  <div>
                    <div className="text-xs text-neutral-400 font-medium">{contacts.complaints.label}</div>
                    <div className="font-bold text-neutral-200 text-lg">{contacts.complaints.display}</div>
                  </div>
                  <Phone size={18} className="text-neutral-400 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
