import { reserve, wildlife, flora, medicinalPlants, heritage } from '../data/ptr-data.js'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function TimelineItem({ year, event, highlight }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          highlight ? 'bg-gold text-forest-900' : 'bg-forest-100 text-forest-700'
        }`}>
          {year}
        </div>
        <div className="w-px flex-1 bg-earth-200 mt-2" />
      </div>
      <div className="pb-6 pt-2">
        <p className={`text-sm leading-relaxed ${highlight ? 'font-semibold text-forest-800' : 'text-earth-700'}`}>{event}</p>
      </div>
    </div>
  )
}

function TigerPopulationBar({ year, count, peak }) {
  const pct = Math.max((count / peak) * 100, 2)
  const color = count >= 50 ? '#2d6a4f' : count >= 20 ? '#d4a853' : count >= 5 ? '#c0392b' : '#922b21'
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-earth-500 w-10 text-right">{year}</span>
      <div className="flex-1 bg-earth-100 rounded-full h-6 overflow-hidden">
        <div
          className="h-6 rounded-full flex items-center px-2 transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color, minWidth: '32px' }}
        >
          <span className="text-xs text-white font-bold">{count}</span>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const tigerPeak = Math.max(...heritage.tigerPopulation.map(d => d.count))

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-forest-900 text-cream py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 text-[18rem] flex items-center justify-end pr-10 opacity-[0.04] select-none font-serif leading-none">
          🌿
        </div>
        <div className="relative max-w-7xl mx-auto">
          <p className="text-forest-400 text-xs font-bold uppercase tracking-widest mb-3">Palamu Tiger Reserve</p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">About PTR</h1>
          <p className="text-forest-300 text-xl font-serif italic max-w-2xl">
            One of India's original nine Project Tiger reserves — a landscape of ecological wonder,
            medieval heritage, and conservation history.
          </p>
        </div>
      </div>

      {/* Overview stats */}
      <section className="bg-white py-10 border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: `${reserve.totalArea.toLocaleString()} sq km`, label: 'Total Reserve Area', sub: `Core: ${reserve.coreArea} · Buffer: ${reserve.bufferArea}` },
              { value: reserve.established, label: 'Established under Project Tiger', sub: 'One of original 9 reserves' },
              { value: `${reserve.birdSpecies}+`, label: 'Bird Species', sub: 'Including Bar-headed Goose from Mongolia' },
              { value: reserve.state, label: 'Location', sub: `Districts: ${reserve.districts.join(', ')}` },
            ].map(({ value, label, sub }) => (
              <div key={label} className="text-center p-4">
                <div className="font-serif font-bold text-2xl md:text-3xl text-forest-800 mb-1">{value}</div>
                <div className="text-sm font-semibold text-earth-700">{label}</div>
                <div className="text-xs text-earth-400 mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Conservation History */}
        <section>
          <h2 id="heritage" className="font-serif font-bold text-3xl text-forest-800 mb-2">Conservation History</h2>
          <p className="text-earth-600 text-base mb-8">
            Palamu Tiger Reserve holds a unique place in the history of global wildlife management.
            In 1932, this very forest witnessed the world's first-ever scientific tiger census.
          </p>
          <div className="max-w-2xl">
            {heritage.conservationMilestones.map((m, i) => (
              <TimelineItem
                key={m.year}
                year={m.year}
                event={m.event}
                highlight={[1932, 1973].includes(m.year)}
              />
            ))}
          </div>
        </section>

        {/* Tiger Population */}
        <section className="bg-white rounded-2xl border border-earth-200 p-8">
          <h2 className="font-serif font-bold text-2xl text-forest-800 mb-2">Tiger Population Timeline</h2>
          <p className="text-earth-600 text-sm mb-6">
            PTR's Bengal tiger count — peak of 71 individuals in 1995 — has declined to 1 confirmed individual in 2023.
            Understanding this story drives our conservation-first approach to eco-tourism.
          </p>
          <div className="space-y-3">
            {heritage.tigerPopulation.map(({ year, count }) => (
              <TigerPopulationBar key={year} year={year} count={count} peak={tigerPeak} />
            ))}
          </div>
          <div className="mt-6 bg-forest-50 border border-forest-100 rounded-xl p-4 text-sm text-earth-700">
            <strong className="text-forest-800">Why this matters for your visit:</strong> Our app and itineraries
            are designed to redirect tourist focus toward PTR's extraordinary biodiversity — elephants, wolves,
            leopards, 174+ bird species, and the recovering Gaur — ensuring a fulfilling experience regardless
            of tiger sightings.
          </div>
        </section>

        {/* Wildlife */}
        <section id="wildlife">
          <h2 className="font-serif font-bold text-3xl text-forest-800 mb-2">Wildlife & Biodiversity</h2>
          <p className="text-earth-600 mb-8">
            PTR falls within the Indo-Malayan biogeographical realm, hosting a remarkable diversity of fauna
            across its 1,129.93 sq km of forest, grassland, and riparian habitats.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {wildlife.map(a => (
              <div key={a.id} className="bg-white border border-earth-100 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{a.icon}</span>
                  <div>
                    <h3 className="font-serif font-bold text-forest-800">{a.name}</h3>
                    <p className="text-xs text-earth-500 italic mb-2">{a.scientific} · {a.status}</p>
                    <p className="text-sm text-earth-700 leading-relaxed mb-2">{a.description}</p>
                    <p className="text-xs bg-forest-50 border border-forest-100 text-forest-700 px-2.5 py-1 rounded-full inline-block">
                      Best chance: {a.bestChance}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mahuadanr Special Feature */}
        <section className="bg-forest-800 text-cream rounded-2xl p-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">🐺</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-widest mb-1">India's Only Wolf Sanctuary</div>
              <h2 className="font-serif font-bold text-3xl">Mahuadanr Wolf Sanctuary</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-forest-300 leading-relaxed mb-4">
                Established in 1976 and covering 63.25 sq km in Latehar district, Mahuadanr is the ONLY
                wildlife sanctuary in India dedicated exclusively to the Indian Grey Wolf (Canis lupus pallipes).
                Listed as Endangered under Schedule I of the Wildlife Protection Act.
              </p>
              <p className="text-forest-300 leading-relaxed">
                Remarkably, local villagers in the Mahuadanr valley view the wolf not as a threat, but as a
                familiar element of their heritage—a rare harmony between rural settlements and apex predators.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Active wolf breeding dens', value: '78' },
                { label: 'Protected forests within sanctuary', value: '13' },
                { label: 'Mammal species', value: '27' },
                { label: 'Bird species', value: '19' },
                { label: 'Butterfly species', value: '30' },
                { label: 'Best season', value: 'Nov – Feb (breeding)' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between border-b border-forest-700 pb-2">
                  <span className="text-forest-400 text-sm">{label}</span>
                  <span className="font-semibold text-gold">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Link to="/plan" state={{ packageId: 'wolf-wilderness-5d' }} className="btn-primary bg-gold hover:bg-gold-light text-forest-900 font-bold">
              Book Wolf & Wilderness Circuit <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* Flora */}
        <section>
          <h2 className="font-serif font-bold text-3xl text-forest-800 mb-2">Flora of PTR</h2>
          <p className="text-earth-600 mb-6">
            The name "Palamu" itself is theorized to be an amalgamation of local floral terms—'Pa' for Palash—
            indicating the deep cultural integration of the forest's botany.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {flora.map(f => (
              <div key={f.name} className="bg-white border border-earth-100 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <span className="text-xl flex-shrink-0">🌿</span>
                  <div>
                    <h3 className="font-semibold text-forest-800">{f.name}</h3>
                    <p className="text-xs text-earth-500 italic">{f.scientific}</p>
                    <span className="text-[10px] bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">{f.role}</span>
                    <p className="text-xs text-earth-700 mt-2 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Medicinal Plants */}
          <h3 className="font-serif font-bold text-xl text-forest-800 mb-4">Traditional Medicinal Plants</h3>
          <p className="text-earth-600 text-sm mb-4">
            PTR harbors a scientifically invaluable repository of medicinal plants utilised by local tribal practitioners
            for generations. The following are documented uses within PTR:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-earth-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-forest-800 text-cream">
                  <th className="text-left px-4 py-3 font-semibold">Local Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Botanical Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Traditional Uses</th>
                </tr>
              </thead>
              <tbody>
                {medicinalPlants.map((p, i) => (
                  <tr key={p.name} className={i % 2 === 0 ? 'bg-white' : 'bg-earth-50'}>
                    <td className="px-4 py-3 font-semibold text-forest-700">{p.name}</td>
                    <td className="px-4 py-3 text-earth-500 italic">{p.scientific}</td>
                    <td className="px-4 py-3 text-earth-700">{p.uses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Palamu Forts */}
        <section>
          <h2 className="font-serif font-bold text-3xl text-forest-800 mb-2">The Palamu Forts – Chero Dynasty</h2>
          <p className="text-earth-600 mb-6">
            Deep within Betla National Park, overlooking the Auranga River, lie the magnificent ruins of the
            Palamu Forts — testament to the {heritage.palamuForts.dynasty}'s turbulent history.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-earth-200 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-xl text-forest-800 mb-1">Old Fort</h3>
              <p className="text-xs text-earth-500 mb-3">{heritage.palamuForts.oldFort.location}</p>
              <ul className="space-y-2">
                {heritage.palamuForts.oldFort.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-earth-700">
                    <span className="text-gold mt-1 flex-shrink-0">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-earth-200 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-xl text-forest-800 mb-1">New Fort</h3>
              <p className="text-xs text-earth-500 mb-3">{heritage.palamuForts.newFort.location}</p>
              <ul className="space-y-2 mb-4">
                {heritage.palamuForts.newFort.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-earth-700">
                    <span className="text-gold mt-1 flex-shrink-0">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="bg-palash/5 border border-palash/20 rounded-xl p-3 text-xs text-earth-700">
                <strong className="text-palash">British Siege (1771):</strong> {heritage.palamuForts.britishSiege}. {heritage.palamuForts.event1857}
              </div>
            </div>
          </div>

          <div className="mt-5 bg-earth-50 border border-earth-200 rounded-xl p-4 text-sm text-earth-700">
            <strong>Key Ruler:</strong> {heritage.palamuForts.keyRuler} — brought unprecedented prosperity to the region.
            Construction inscriptions in Sanskrit were attributed to the king's guru, Banmali Mishra.
          </div>
        </section>

        {/* Geography */}
        <section className="bg-forest-900 text-cream rounded-2xl p-8">
          <h2 className="font-serif font-bold text-3xl mb-4">Geography & Hydrology</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-serif font-bold text-xl mb-3 text-gold">The Chhotanagpur Plateau</h3>
              <p className="text-forest-300 text-sm leading-relaxed mb-3">
                PTR sits within the rugged terrain of the Chhotanagpur Plateau. The topography is highly
                undulating — altitude ranges from 300 m to 1,140 m above sea level. The geological foundation
                is ancient gneiss, granite, and limestone.
              </p>
              <p className="text-forest-300 text-sm leading-relaxed">
                The region suffers from a rain-shadow effect making it notoriously drought-prone. Perennial
                water sources like the Burha river are crucial focal points for wildlife congregation during
                the dry season — and key safari sighting zones.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl mb-3 text-gold">Key Rivers</h3>
              <div className="space-y-2">
                {[
                  { name: 'North Koel', desc: 'Primary watershed river, passes through core area' },
                  { name: 'Auranga', desc: 'Flows past Palamu Forts, meets North Koel at Kechki' },
                  { name: 'Burha', desc: 'Crucial perennial water source during dry season' },
                  { name: 'Satnadiya', desc: 'Non-perennial stream' },
                  { name: 'Panchnadia', desc: 'Non-perennial stream' },
                ].map(({ name, desc }) => (
                  <div key={name} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400 flex-shrink-0">🌊</span>
                    <div>
                      <span className="font-semibold text-cream">{name}</span>
                      <span className="text-forest-400"> — {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section id="guidelines">
          <h2 className="font-serif font-bold text-3xl text-forest-800 mb-4">Visitor Guidelines</h2>
          <p className="text-earth-600 mb-6">
            All visitors must read and agree to the following conduct rules before entering PTR.
            Violations result in <strong>immediate expulsion and potential legal action without refund</strong>.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: '✅', rule: 'Follow forest guide instructions at all times', ok: true },
              { icon: '✅', rule: 'Maintain safe distances from all wildlife', ok: true },
              { icon: '✅', rule: 'Carry and show valid Government-issued ID at check-in', ok: true },
              { icon: '✅', rule: 'Report to reception before 4:00 PM on arrival day', ok: true },
              { icon: '🚫', rule: 'Littering within reserve boundaries', ok: false },
              { icon: '🚫', rule: 'Teasing, feeding, or disturbing animals', ok: false },
              { icon: '🚫', rule: 'Alcohol or drugs within the reserve', ok: false },
              { icon: '🚫', rule: 'Loud music or noise', ok: false },
              { icon: '🚫', rule: 'Drones or unmanned aerial vehicles (UAVs)', ok: false },
              { icon: '🚫', rule: 'Entering the reserve after 4:00 PM', ok: false },
            ].map(({ icon, rule, ok }) => (
              <div key={rule} className={`flex items-start gap-2.5 p-3.5 rounded-xl border text-sm ${
                ok ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'
              }`}>
                <span className="text-base flex-shrink-0">{icon}</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
