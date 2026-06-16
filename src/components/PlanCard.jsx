import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function PlanCard({ imageUrl, imageAlt, badge, title, location, overview, cta, to, state }) {
  return (
    <Link
      to={to}
      state={state}
      aria-label={title}
      className="group relative w-full overflow-hidden rounded-2xl shadow-lg block"
      style={{ minHeight: '420px' }}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      <div className="relative flex h-full flex-col p-7" style={{ minHeight: '420px' }}>
        <div className="space-y-3 transition-transform duration-500 ease-in-out group-hover:-translate-y-16 mt-auto">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full">
            {badge}
          </span>
          <div>
            <h3 className="text-3xl font-bold text-white leading-tight">{title}</h3>
            <p className="text-sm text-white/70 mt-0.5">{location}</p>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">{overview}</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-7 pb-7 translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-end">
            <span className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-5 py-2.5 rounded-lg">
              {cta} <ArrowRight size={15} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
