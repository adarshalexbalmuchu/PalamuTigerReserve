import { ArrowRight } from 'lucide-react'

export default function DestinationCard({ imageUrl, imageAlt, title, stats, href, to, themeColor = '0 0% 8%', onClick }) {
  const content = (
    <div
      style={{ '--theme-color': themeColor }}
      className="group w-full h-full"
    >
      <div
        className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg
                   transition-all duration-500 ease-in-out
                   group-hover:scale-[1.03]"
        style={{ boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)` }}
      >
        {/* Background image with zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center
                     transition-transform duration-500 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={imageAlt}
        />

        {/* Themed gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(var(--theme-color) / 0.92), hsl(var(--theme-color) / 0.55) 40%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col justify-end h-full p-6 text-white">
          <h3 className="text-2xl font-bold tracking-tight leading-tight">{title}</h3>
          <p className="text-sm text-white/75 mt-1 font-medium">{stats}</p>

          {/* CTA row */}
          <div
            className="mt-5 flex items-center justify-between rounded-lg px-4 py-3
                       backdrop-blur-md border transition-all duration-300
                       group-hover:bg-white/20 group-hover:border-white/30"
            style={{
              background: `hsl(var(--theme-color) / 0.25)`,
              borderColor: `hsl(var(--theme-color) / 0.35)`,
            }}
          >
            <span className="text-sm font-semibold tracking-wide">Explore Now</span>
            <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  )

  if (onClick) {
    return <button onClick={onClick} className="block w-full h-full text-left">{content}</button>
  }

  return (
    <a href={href || '#'} className="block w-full h-full" aria-label={`Explore ${title}`}>
      {content}
    </a>
  )
}
