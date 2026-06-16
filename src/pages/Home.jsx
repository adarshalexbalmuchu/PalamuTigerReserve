import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Phone, ArrowRight, Map, TreePine } from 'lucide-react'
import { packages, properties, contacts, isSeasonOpen } from '../data/ptr-data.js'
import PlanCard from '../components/PlanCard.jsx'

function AnimatedStat({ value, suffix = '', label, delay = 0 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const end = parseFloat(value)
        const step = end / 50
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setDisplay(end); clearInterval(timer) }
          else setDisplay(Math.floor(start))
        }, 30)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center p-6" style={{ animationDelay: `${delay}ms` }}>
      <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">
        {typeof value === 'number' ? display.toLocaleString() : value}{suffix}
      </div>
      <div className="text-sm text-neutral-400 font-medium mt-1">{label}</div>
    </div>
  )
}

function PackageCard({ pkg }) {
  return (
    <div className="card group cursor-pointer">
      <div className="h-1 bg-black" />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{pkg.icon}</span>
          <span className="text-xs bg-neutral-100 text-neutral-700 font-semibold px-2.5 py-1 rounded-full border border-neutral-200">
            {pkg.duration} Days
          </span>
        </div>
        <h3 className="font-serif font-bold text-xl text-black mb-1">{pkg.name}</h3>
        <p className="text-sm text-neutral-500 font-medium mb-4">{pkg.subtitle}</p>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div>
            <div className="text-lg font-bold text-black">
              ₹{(pkg.estimatedCost.perPerson).toLocaleString()}
            </div>
            <div className="text-xs text-neutral-500">per person (2 pax)</div>
          </div>
          <Link
            to="/plan"
            state={{ packageId: pkg.id }}
            className="flex items-center gap-1.5 text-sm font-semibold text-neutral-700 group-hover:text-black transition-colors"
          >
            View Itinerary <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function PropertyPreviewCard({ p }) {
  const amenityList = [
    p.amenities.ac && 'AC',
    p.amenities.food && 'Food',
    p.amenities.balcony && 'Balcony',
    p.amenities.geyser && 'Geyser',
  ].filter(Boolean)

  return (
    <Link to={`/stays/${p.id}`} className="card group block">
      <div className="h-1 bg-black" />
      <div className="p-5">
        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-3 bg-neutral-100 text-neutral-700">
          {p.zone === 'north' ? 'North Zone' : 'South Zone'}
        </span>
        <h3 className="font-serif font-bold text-lg text-black mb-0.5">{p.name}</h3>
        <p className="text-xs text-neutral-500 mb-3">{p.location}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {amenityList.slice(0, 3).map(a => (
            <span key={a} className="amenity-chip">{a}</span>
          ))}
          {p.units <= 4 && (
            <span className="amenity-chip text-palash border-palash/20 bg-palash-50">
              Only {p.units} units
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-black">₹{p.pricePerNight?.toLocaleString()}</span>
            <span className="text-xs text-neutral-500"> /night</span>
          </div>
          <span className="text-sm font-semibold text-neutral-600 group-hover:text-black transition-colors flex items-center gap-1">
            View <ChevronRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
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
          <div className="grid grid-cols-2 md:grid-cols-4">
            <AnimatedStat value={1129.93} suffix=" sq km" label="Total Reserve Area" delay={0} />
            <AnimatedStat value={174}     suffix="+"     label="Documented Bird Species" delay={100} />
            <AnimatedStat value={96}      suffix="+"     label="Forest Accommodations" delay={200} />
            <AnimatedStat value={1973}    suffix=""      label="Year of Project Tiger Inception" delay={300} />
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
              logo={<TreePine size={20} className="text-white/80" />}
              badge="Packages"
              title="Browse Packages"
              location="Palamu Tiger Reserve, Jharkhand"
              overview={`Pre-built itineraries with all logistics handled — from the Classic Betla Weekend to the Wolf & Wilderness ${packages.length > 0 ? packages.length + '-package' : ''} adventure.`}
              cta="View Packages"
              to="/plan"
              state={{ mode: 'packages' }}
            />
            <PlanCard
              imageUrl="/card-bg-1.jpg"
              imageAlt="Palamu Tiger Reserve wildlife"
              logo={<Map size={20} className="text-white/80" />}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map(p => <PropertyPreviewCard key={p.id} p={p} />)}
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
            <p className="section-sub">Curated circuits — just pick, plan, and go</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
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
