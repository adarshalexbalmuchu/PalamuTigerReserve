import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function PlanCard({ imageUrl, imageAlt, logo, badge, title, location, overview, cta, to, state }) {
  return (
    <Link
      to={to}
      state={state}
      aria-label={title}
      className="group relative w-full overflow-hidden rounded-2xl shadow-lg block"
      style={{ minHeight: '420px' }}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-7" style={{ minHeight: '420px' }}>

        {/* Top: logo/badge */}
        <div className="flex items-start">
          {logo && (
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 backdrop-blur-sm">
              {logo}
            </div>
          )}
        </div>

        {/* Middle: title + overview - slides up on hover */}
        <div className="space-y-3 transition-transform duration-500 ease-in-out group-hover:-translate-y-16 mt-auto">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full mb-1">
            {badge}
          </span>
          <div>
            <h3 className="text-3xl font-bold text-white leading-tight">{title}</h3>
            <p className="text-sm text-white/70 mt-0.5">{location}</p>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">{overview}</p>
        </div>

        {/* Bottom: CTA - rises from below on hover */}
        <div className="absolute bottom-0 left-0 w-full px-7 pb-7 translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-end">
            <span className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors">
              {cta} <ArrowRight size={15} />
            </span>
          </div>
        </div>

      </div>
    </Link>
  )
}
