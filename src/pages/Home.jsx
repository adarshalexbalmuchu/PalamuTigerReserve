import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {
  Map, TreePine, Eye, Calendar, ChevronRight,
  Shield, Clock, Phone, AlertCircle, Star, ArrowRight,
  Mountain, Waves, Castle
} from 'lucide-react'
import { reserve, season, packages, properties, wildlife, heritage, contacts, isSeasonOpen } from '../data/ptr-data.js'

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
      <div className="text-4xl md:text-5xl font-serif font-bold text-forest-800 mb-1">
        {typeof value === 'number' ? display.toLocaleString() : value}{suffix}
      </div>
      <div className="text-sm text-earth-600 font-medium mt-1">{label}</div>
    </div>
  )
}

function PackageCard({ pkg }) {
  return (
    <div className="card group cursor-pointer">
      <div className="h-3 bg-gradient-to-r from-forest-700 to-forest-500" />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{pkg.icon}</span>
          <span className="text-xs bg-gold/10 text-earth-700 font-semibold px-2.5 py-1 rounded-full border border-gold/30">
            {pkg.duration} Days
          </span>
        </div>
        <h3 className="font-serif font-bold text-xl text-forest-800 mb-1">{pkg.name}</h3>
        <p className="text-sm text-palash font-medium mb-2">{pkg.subtitle}</p>
        <p className="text-sm text-earth-700 leading-relaxed mb-4 line-clamp-3">{pkg.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-earth-100">
          <div>
            <div className="text-lg font-bold text-forest-800">
              ₹{(pkg.estimatedCost.perPerson).toLocaleString()}
            </div>
            <div className="text-xs text-earth-500">per person (2 pax)</div>
          </div>
          <Link
            to="/plan"
            state={{ packageId: pkg.id }}
            className="flex items-center gap-1.5 text-sm font-semibold text-forest-700 group-hover:text-palash transition-colors"
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
      <div
        className="h-48 relative overflow-hidden flex items-end p-4"
        style={{
          background: p.zone === 'north'
            ? 'linear-gradient(160deg, #1a4731 0%, #2d6a4f 60%, #40916c 100%)'
            : 'linear-gradient(160deg, #3d2810 0%, #5c3d1e 60%, #a06840 100%)',
        }}
      >
        <span className="text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-30 transition-opacity select-none">
          {p.type === 'treehouse' ? '🌲' : p.type === 'tent' ? '⛺' : '🏡'}
        </span>
        <div className="relative z-10">
          <span className={`badge-zone text-[10px] font-bold ${p.zone === 'north' ? 'bg-forest-800/70 text-forest-200' : 'bg-earth-800/70 text-earth-200'}`}>
            {p.zone === 'north' ? '⬆ North Zone' : '⬇ South Zone'}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif font-bold text-lg text-forest-800 mb-0.5">{p.name}</h3>
        <p className="text-xs text-earth-500 mb-3">{p.location}</p>
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
            <span className="text-xl font-bold text-forest-800">₹{p.pricePerNight?.toLocaleString()}</span>
            <span className="text-xs text-earth-500"> /night</span>
          </div>
          <span className="text-sm font-semibold text-forest-600 group-hover:text-palash transition-colors flex items-center gap-1">
            View <ChevronRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function WildlifeSpotlightCard({ animal }) {
  const difficultyColor = {
    'Very common': 'text-green-600',
    'Frequent': 'text-green-600',
    'Occasional': 'text-amber-600',
    'Moderate (best at Mahuadanr)': 'text-amber-600',
    'Rare': 'text-orange-600',
    'Extremely rare': 'text-red-600',
    'Easy – many species commonly sighted': 'text-green-600',
    'Rare – increasing with conservation': 'text-orange-600',
  }[animal.sightingDifficulty] || 'text-amber-600'

  return (
    <div className="bg-white border border-earth-100 rounded-2xl p-5 hover:shadow-nature transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
          {animal.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-serif font-bold text-forest-800">{animal.name}</h4>
          <p className="text-xs text-earth-500 italic mb-2">{animal.scientific}</p>
          <p className="text-xs text-earth-700 line-clamp-2 mb-2">{animal.description}</p>
          <div className="flex items-center gap-1 text-xs">
            <Eye size={11} />
            <span className={`font-semibold ${difficultyColor}`}>{animal.sightingDifficulty}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const parkOpen = isSeasonOpen()
  const featuredProperties = properties.filter(p => ['new-tree-house-betla', 'kechki-beach-cottage', 'netarhat-new-cottage'].includes(p.id))
  const featuredWildlife = wildlife.slice(0, 6)

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 hero-gradient"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z\' fill=\'%232d6a4f\' fill-opacity=\'0.07\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                   backgroundBlendMode: 'multiply' }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 text-6xl opacity-5 animate-pulse-slow select-none hidden lg:block">🐯</div>
        <div className="absolute bottom-32 right-40 text-4xl opacity-5 select-none hidden lg:block">🐘</div>
        <div className="absolute top-40 left-1/3 text-3xl opacity-5 select-none hidden lg:block">🦅</div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-8">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                parkOpen
                  ? 'bg-forest-400/20 text-forest-300 border border-forest-400/30'
                  : 'bg-palash/20 text-red-300 border border-palash/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${parkOpen ? 'bg-forest-400 animate-pulse' : 'bg-palash'}`} />
                {parkOpen ? 'Park Open for Visitors' : 'Park Currently Closed (Jul–Sep)'}
              </span>
              <span className="text-forest-400 text-xs">Est. 1973 · Project Tiger</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6">
              Palamu
              <br />
              <span className="text-gold">Tiger Reserve</span>
            </h1>

            <p className="text-xl text-forest-200 font-serif italic mb-4">
              Where Ancient Forests Meet Living History
            </p>

            <p className="text-forest-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
              Journey through {reserve.totalArea.toLocaleString()} sq km of Jharkhand's most
              extraordinary wilderness — home to Asian elephants, Indian grey wolves, 174+ bird species,
              and 17th-century Chero dynasty forts. India's original 1973 Project Tiger reserve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/plan" className="btn-primary text-base px-8 py-3.5 shadow-gold">
                <TreePine size={18} />
                Plan My Journey
              </Link>
              <Link to="/explore" className="btn-secondary text-base px-8 py-3.5 border-forest-400 text-forest-200 hover:bg-forest-700 hover:text-cream hover:border-forest-700">
                <Map size={18} />
                Explore the Map
              </Link>
            </div>

            {/* Quick facts strip */}
            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { label: 'Total Area', value: `${reserve.totalArea.toLocaleString()} sq km` },
                { label: 'Best Season', value: 'Oct – Feb' },
                { label: 'Park Open', value: 'Oct 1 – Jun 30' },
                { label: 'Nearest Rail', value: 'Barwadih (12 km)' },
              ].map(({ label, value }) => (
                <div key={label} className="text-sm">
                  <div className="text-forest-400 text-xs font-medium uppercase tracking-wider">{label}</div>
                  <div className="text-cream font-semibold mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-forest-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-forest-400 to-transparent animate-bounce" />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-white border-y border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-earth-100">
            <AnimatedStat value={1129.93} suffix=" sq km" label="Total Reserve Area" delay={0} />
            <AnimatedStat value={174}     suffix="+"     label="Documented Bird Species" delay={100} />
            <AnimatedStat value={96}      suffix="+"     label="Forest Accommodations" delay={200} />
            <AnimatedStat value={1973}    suffix=""      label="Year of Project Tiger Inception" delay={300} />
          </div>
        </div>
      </section>

      {/* ─── MODE ENTRY ─── */}
      <section className="py-20 bg-forest-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-header mb-3">Plan Your PTR Journey</h2>
            <p className="section-sub">Choose how you'd like to explore Palamu Tiger Reserve</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mode A */}
            <Link to="/plan" state={{ mode: 'packages' }} className="group relative card p-8 hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-forest-50 rounded-full -translate-y-8 translate-x-8 opacity-50" />
              <div className="relative">
                <div className="w-14 h-14 bg-forest-100 text-forest-700 rounded-2xl flex items-center justify-center text-2xl mb-5">
                  📋
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-palash mb-2">Mode A</div>
                <h3 className="font-serif font-bold text-2xl text-forest-800 mb-3">Browse Packages</h3>
                <p className="text-earth-600 text-sm leading-relaxed mb-6">
                  Choose from our curated circuits — from the Classic Betla Weekend to the Wolf & Wilderness
                  5-day adventure. Pre-built itineraries with all logistics handled.
                </p>
                <span className="btn-primary text-sm inline-flex group-hover:bg-forest-700">
                  Browse {packages.length} Packages <ArrowRight size={15} />
                </span>
              </div>
            </Link>

            {/* Mode B */}
            <Link to="/plan" state={{ mode: 'custom' }} className="group relative card p-8 hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-8 translate-x-8 opacity-50" />
              <div className="relative">
                <div className="w-14 h-14 bg-gold/10 text-earth-700 rounded-2xl flex items-center justify-center text-2xl mb-5">
                  🗺️
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-dark mb-2">Mode B</div>
                <h3 className="font-serif font-bold text-2xl text-forest-800 mb-3">Build My Own Trip</h3>
                <p className="text-earth-600 text-sm leading-relaxed mb-6">
                  Select your preferred properties, set your budget and group size, and let our planner
                  auto-generate a day-by-day itinerary with commutation contacts.
                </p>
                <span className="btn-secondary text-sm inline-flex border-earth-300 hover:bg-forest-800 hover:border-forest-800">
                  Start Custom Builder <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURED STAYS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-header mb-2">Featured Stays</h2>
              <p className="section-sub">From riverside glamping tents to hilltop pine forest cottages</p>
            </div>
            <Link to="/stays" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-forest-600 hover:text-palash transition-colors">
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

      {/* ─── SEASONAL INFO ─── */}
      <section className="py-16 bg-forest-800 text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '❄️',
                title: 'Winter (Oct – Feb)',
                subtitle: 'Best Season',
                desc: 'Temperatures 8°C–28°C. Peak wildlife activity, maximum safari openings, crystal-clear forest trails. Wolf breeding season at Mahuadanr.',
                highlight: true,
              },
              {
                icon: '☀️',
                title: 'Summer (Mar – Jun)',
                subtitle: 'Hot but Wildlife-Rich',
                desc: 'Temperatures up to 50°C. Wildlife congregates near water sources. Morning safaris best. Netarhat remains cooler.',
                highlight: false,
              },
              {
                icon: '🌧️',
                title: 'Monsoon (Jul – Sep)',
                subtitle: 'Park Closed',
                desc: 'Park officially closed to tourists. 1,000–1,075 mm rainfall rejuvenates the Sal forests. No bookings accepted.',
                highlight: false,
              },
            ].map(({ icon, title, subtitle, desc, highlight }) => (
              <div key={title} className={`rounded-2xl p-6 border ${highlight ? 'bg-forest-700 border-forest-500' : 'bg-forest-900 border-forest-700'}`}>
                <span className="text-3xl block mb-3">{icon}</span>
                <div className="text-xs font-bold uppercase tracking-wider text-gold mb-1">{subtitle}</div>
                <h3 className="font-serif font-bold text-xl mb-2">{title}</h3>
                <p className="text-forest-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WILDLIFE SPOTLIGHT ─── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-header mb-3">Wildlife of PTR</h2>
            <p className="section-sub">Beyond the tiger — a rich, multifaceted biodiversity</p>
            <p className="text-earth-600 text-sm mt-3 max-w-2xl mx-auto">
              PTR's single confirmed tiger (2023) makes broader wildlife experiences our focus.
              The reserve's elephants, wolves, leopards, and 174+ bird species offer extraordinary
              encounter opportunities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredWildlife.map(a => <WildlifeSpotlightCard key={a.id} animal={a} />)}
          </div>
          <div className="mt-8 text-center">
            <Link to="/about#wildlife" className="btn-secondary">
              <Eye size={16} />
              Full Wildlife Guide
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HIGHLIGHTS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-header mb-3">Explore PTR's Highlights</h2>
            <p className="section-sub">Waterfalls, heritage forts, and India's only Wolf Sanctuary</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Waves size={28} />,
                title: 'Dramatic Waterfalls',
                desc: 'Three spectacular falls — Lodh Falls (468 ft), Suga Bandh (80 ft), and Mirchaiya — cascade through ancient Sal forests.',
                action: 'Explore Waterfalls',
                to: '/explore',
                bg: 'bg-blue-50',
                color: 'text-blue-700',
                border: 'border-blue-100',
              },
              {
                icon: <Castle size={28} />,
                title: 'Chero Dynasty Forts',
                  desc: "Palamu's twin forts — built under Raja Medini Ray (1662–75) — feature Mughal stonework, Persian inscriptions, and epic British siege history.",
                action: 'Discover Heritage',
                to: '/about#heritage',
                bg: 'bg-palash/5',
                color: 'text-palash',
                border: 'border-palash/10',
              },
              {
                icon: <Mountain size={28} />,
                title: 'Netarhat Hill Station',
                  desc: 'Queen of Chhotanagpur — pine forests, breathtaking sunrise views, cool climate year-round, and astrophotography sites.',
                action: 'Plan a Visit',
                to: '/explore',
                bg: 'bg-gold/5',
                color: 'text-earth-700',
                border: 'border-gold/20',
              },
            ].map(({ icon, title, desc, action, to, bg, color, border }) => (
              <div key={title} className={`card p-8 border ${border}`}>
                <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-5`}>
                  {icon}
                </div>
                <h3 className="font-serif font-bold text-xl text-forest-800 mb-3">{title}</h3>
                <p className="text-earth-600 text-sm leading-relaxed mb-6">{desc}</p>
                <Link to={to} className={`text-sm font-semibold ${color} hover:underline flex items-center gap-1`}>
                  {action} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="py-20 bg-earth-50">
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
      <section className="py-16 bg-white border-t border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Check-in alert */}
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Clock size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-forest-800">4:00 PM Arrival Mandate</h3>
                  <p className="text-sm text-earth-600 mt-1">
                    All guests <strong>must</strong> report to the PTR reception office before 4:00 PM on their arrival day.
                    Entry into the Tiger Reserve after 4:00 PM is <strong>strictly prohibited</strong> under any circumstances.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                {[
                  { label: 'Check-in', value: '1:00 PM' },
                  { label: 'Check-out', value: '11:00 AM' },
                  { label: 'Arrival Deadline', value: '4:00 PM' },
                  { label: 'ID Proof', value: 'Mandatory' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-lg p-3 border border-amber-100">
                    <div className="text-xs text-earth-500 font-medium">{label}</div>
                    <div className="font-bold text-forest-800 mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact strip */}
            <div className="rounded-2xl bg-forest-900 p-6 text-cream">
              <div className="flex items-start gap-3 mb-4">
                <Phone size={20} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif font-bold text-lg">Get in Touch</h3>
                  <p className="text-forest-300 text-sm mt-1">
                    For bookings, queries, or emergencies — our helplines are available during forest hours.
                  </p>
                </div>
              </div>
              <div className="space-y-3 mt-2">
                <a
                  href={`tel:${contacts.helpline.number}`}
                  className="flex items-center justify-between bg-forest-800 hover:bg-forest-700 rounded-xl p-4 transition-colors group"
                >
                  <div>
                    <div className="text-xs text-forest-400 font-medium">{contacts.helpline.label}</div>
                    <div className="font-bold text-gold text-lg">{contacts.helpline.display}</div>
                  </div>
                  <Phone size={18} className="text-gold group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={`tel:${contacts.complaints.number}`}
                  className="flex items-center justify-between bg-forest-800 hover:bg-forest-700 rounded-xl p-4 transition-colors group"
                >
                  <div>
                    <div className="text-xs text-forest-400 font-medium">{contacts.complaints.label}</div>
                    <div className="font-bold text-forest-200 text-lg">{contacts.complaints.display}</div>
                  </div>
                  <Phone size={18} className="text-forest-300 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONSERVATION MESSAGE ─── */}
      <section className="py-16 bg-forest-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 select-none text-[20rem] flex items-center justify-center font-serif leading-none">
          🌿
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="text-forest-400 text-xs font-bold uppercase tracking-widest mb-4">
            Since 1973 · Project Tiger
          </div>
          <h2 className="font-serif text-4xl text-cream font-bold mb-4">
            Protecting a Living Heritage
          </h2>
          <p className="text-forest-300 leading-relaxed mb-8">
            In 1932, J.W. Nicholson conducted the world's first tiger census here using the pugmark method.
            PTR became one of India's original nine Project Tiger reserves in 1973. Your visit directly
            supports the Forest Department's ongoing efforts to restore this extraordinary landscape.
          </p>
          <Link to="/about" className="btn-primary bg-gold hover:bg-gold-light text-forest-900 hover:text-forest-900 font-bold">
            Our Conservation Story <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  )
}
