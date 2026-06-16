import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { Link } from 'react-router-dom'
import { properties, visitSites, reserve } from '../data/ptr-data.js'

const typeIcon = (type, emoji) =>
  divIcon({
    html: `<div class="custom-marker ${type}" role="img" aria-label="${emoji}">${emoji}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -22],
  })

const stayIcon     = typeIcon('stay',      '🏠')
const waterfallIcon= typeIcon('waterfall', '💧')
const heritageIcon = typeIcon('heritage',  '🏰')
const wildlifeIcon = typeIcon('wildlife',  '🐺')
const scenicIcon   = typeIcon('scenic',    '🌅')
const treeIcon     = typeIcon('stay',      '🌲')

function getIcon(p) {
  if (p.type === 'treehouse') return treeIcon
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
              <p className="font-bold text-forest-800 text-sm">{p.name}</p>
              <p className="text-xs text-earth-600 mb-1">{p.location}</p>
              <p className="text-xs font-semibold text-forest-700 mb-2">
                From ₹{p.pricePerNight?.toLocaleString()}/night · {p.units} units
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {p.amenities.ac && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">AC</span>}
                {p.amenities.food && <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">Food</span>}
                {p.amenities.balcony && <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full">Balcony</span>}
              </div>
              <a
                href={`#/stays/${p.id}`}
                className="block text-center text-xs text-white bg-forest-700 hover:bg-forest-600 rounded-md py-1.5 transition-colors"
              >
                View Property →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {showSites && visitSites.map(s => (
        <Marker key={s.id} position={[s.lat, s.lng]} icon={getSiteIcon(s)}>
          <Popup maxWidth={240}>
            <div className="font-sans p-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-palash mb-0.5">{s.type}</p>
              <p className="font-bold text-forest-800 text-sm">{s.name}</p>
              <p className="text-xs text-earth-600 mb-1">{s.subtitle}</p>
              <p className="text-xs text-earth-700 line-clamp-2 mb-2">{s.description.slice(0, 120)}…</p>
              <p className="text-xs text-forest-700">
                <strong>Best time:</strong> {s.bestTime}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
