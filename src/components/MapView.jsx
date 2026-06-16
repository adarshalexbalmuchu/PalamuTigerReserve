import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { Link } from 'react-router-dom'
import { properties, visitSites, reserve } from '../data/ptr-data.js'

const makeIcon = (bg, border = '#fff') => divIcon({
  html: `<div style="width:11px;height:11px;border-radius:50%;background:${bg};border:2.5px solid ${border};box-shadow:0 1px 5px rgba(0,0,0,0.4)"></div>`,
  className: '',
  iconSize: [11, 11],
  iconAnchor: [5, 5],
  popupAnchor: [0, -9],
})

const stayIcon      = makeIcon('#171717')
const waterfallIcon = makeIcon('#3b82f6')
const heritageIcon  = makeIcon('#6b7280')
const wildlifeIcon  = makeIcon('#d97706')
const scenicIcon    = makeIcon('#059669')

function getIcon(p) {
  return stayIcon
}

function getSiteIcon(s) {
  if (s.type === 'waterfall') return waterfallIcon
  if (s.type === 'heritage')  return heritageIcon
  if (s.type === 'wildlife')  return wildlifeIcon
  return scenicIcon
}

export default function MapView({ height = '500px', showSites = true, showProperties = true, filterZone = null }) {
  const filteredProperties = filterZone
    ? properties.filter(p => p.zone === filterZone)
    : properties

  return (
    <MapContainer
      center={[reserve.center.lat, reserve.center.lng]}
      zoom={9}
      style={{ height, width: '100%' }}
      zoomControl={false}
      aria-label="Interactive map of Palamu Tiger Reserve"
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={18}
      />

      {showProperties && filteredProperties.map(p => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={getIcon(p)}>
          <Popup maxWidth={240}>
            <div className="font-sans p-1">
              <p className="font-bold text-neutral-800 text-sm">{p.name}</p>
              <p className="text-xs text-neutral-500 mb-1">{p.location}</p>
              <p className="text-xs font-semibold text-neutral-700 mb-2">
                From ₹{p.pricePerNight?.toLocaleString()}/night · {p.units} units
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {p.amenities.ac && <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded-full">AC</span>}
                {p.amenities.food && <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded-full">Food</span>}
                {p.amenities.balcony && <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded-full">Balcony</span>}
              </div>
              <a
                href={`#/stays/${p.id}`}
                className="block text-center text-xs text-white bg-black hover:bg-neutral-800 rounded-md py-1.5 transition-colors"
              >
                View Property
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {showSites && visitSites.map(s => (
        <Marker key={s.id} position={[s.lat, s.lng]} icon={getSiteIcon(s)}>
          <Popup maxWidth={240}>
            <div className="font-sans p-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-0.5">{s.type}</p>
              <p className="font-bold text-neutral-800 text-sm">{s.name}</p>
              <p className="text-xs text-neutral-500 mb-1">{s.subtitle}</p>
              <p className="text-xs text-neutral-600 line-clamp-2 mb-2">{s.description.slice(0, 120)}</p>
              <p className="text-xs text-neutral-700">
                <strong>Best time:</strong> {s.bestTime}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
