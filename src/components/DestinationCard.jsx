import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function DestinationCard({
  imageUrl, imageAlt, title, stats, href, to, themeColor = '0 0% 8%',
  onClick, selected = false, ctaLabel = 'Explore Now', minHeight = '380px'
}) {
  const [imgFailed, setImgFailed] = useState(false)

  const inner = (
    <div
      style={{ '--theme-color': themeColor, minHeight }}
      className="group relative w-full h-full overflow-hidden rounded-2xl shadow-lg
                 transition-all duration-500 ease-in-out"
    >
      {/* Background image with graceful fallback */}
      {!imgFailed ? (
        <img
          src={imageUrl}
          alt={imageAlt || title}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110"
          style={{ background: 'linear-gradient(155deg, #071910 0%, #1a4731 50%, #2d6a4f 100%)' }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, hsl(var(--theme-color) / 0.92), hsl(var(--theme-color) / 0.55) 40%, transparent 70%)`,
        }}
      />

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md z-10">
          <CheckCircle size={18} className="text-black" />
        </div>
      )}

      {/* Selected ring */}
      {selected && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-white/80 z-10 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative flex flex-col justify-end h-full p-6 text-white" style={{ minHeight }}>
        <h3 className="text-2xl font-bold tracking-tight leading-tight">{title}</h3>
        <p className="text-sm text-white/75 mt-1 font-medium">{stats}</p>

        {/* CTA row */}
        <div
          className="mt-5 flex items-center justify-between rounded-lg px-4 py-3
                     backdrop-blur-md border transition-all duration-300
                     group-hover:bg-white/20 group-hover:border-white/30"
          style={{
            background: selected ? 'rgba(255,255,255,0.2)' : `hsl(var(--theme-color) / 0.25)`,
            borderColor: selected ? 'rgba(255,255,255,0.4)' : `hsl(var(--theme-color) / 0.35)`,
          }}
        >
          <span className="text-sm font-semibold tracking-wide">{selected ? 'Selected' : ctaLabel}</span>
          <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left" style={{ minHeight }} aria-label={title}>
        {inner}
      </button>
    )
  }

  return (
    <a href={href || `#${to || ''}`} className="block" style={{ minHeight }} aria-label={`Explore ${title}`}>
      {inner}
    </a>
  )
}
