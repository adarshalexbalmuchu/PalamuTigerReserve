import { useState } from 'react'
import { Clock, Users, Camera, Car, Info, Phone, AlertTriangle, CheckCircle } from 'lucide-react'
import { safariInfo, season, contacts, cancellationPolicy } from '../data/ptr-data.js'

function FeeRow({ label, value, note }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-earth-100 last:border-0">
      <div>
        <div className="text-sm font-medium text-forest-800">{label}</div>
        {note && <div className="text-xs text-earth-500 mt-0.5">{note}</div>}
      </div>
      <div className="text-sm font-bold text-forest-700 flex-shrink-0">{value}</div>
    </div>
  )
}

export default function Safari() {
  const [nationality, setNationality] = useState('indian')
  const [groupSize, setGroupSize] = useState(2)
  const [safariType, setSafariType] = useState('jeep')
  const [hasStillCamera, setHasStillCamera] = useState(false)
  const [hasVideoCamera, setHasVideoCamera] = useState(false)
  const [guideDuration, setGuideDuration] = useState(2)

  const parkEntry = nationality === 'indian' ? 50 : 250
  const vehicleFee = safariType === 'jeep' ? 250 : 0
  const guideFee = guideDuration === 1 ? 100 : 200
  const cameraFee = (hasStillCamera ? 100 : 0) + (hasVideoCamera ? 150 : 0)
  const elephantFee = safariType === 'elephant' ? 400 : 0
  const safariPackage = safariType === 'jeep' ? 1800 : 0

  const perPersonEntryTotal = parkEntry + (safariType === 'elephant' ? elephantFee : 0) + cameraFee
  const totalPerPerson = perPersonEntryTotal
  const totalGroup = (parkEntry * groupSize) + (safariType === 'jeep' ? safariPackage + guideFee : elephantFee * Math.min(groupSize, 4) + guideFee) + cameraFee

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-forest-900 text-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-forest-400 text-xs font-bold uppercase tracking-widest mb-3">Palamu Tiger Reserve</p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-3">Safari & Permits</h1>
          <p className="text-forest-300 text-lg font-serif italic mb-6">
            Jeep safaris and elephant safaris through the Betla National Park core area
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: <Clock size={14} />, label: 'Morning Safari', value: season.safariWindows.morning.label },
              { icon: <Clock size={14} />, label: 'Evening Safari', value: season.safariWindows.evening.label },
              { icon: <Info size={14} />, label: 'Season', value: season.open.label },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 bg-forest-800 rounded-lg px-4 py-2.5">
                <span className="text-forest-400">{icon}</span>
                <div>
                  <div className="text-[10px] text-forest-400 font-medium uppercase tracking-wider">{label}</div>
                  <div className="text-sm font-semibold">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2 space-y-8">

            {/* Safari Types */}
            <section>
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-5">Safari Types</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {safariInfo.types.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setSafariType(t.id); if (t.id === 'elephant' && groupSize > 4) setGroupSize(4) }}
                    className={`text-left p-6 rounded-2xl border-2 transition-all ${
                      safariType === t.id
                        ? 'border-forest-600 bg-forest-50 shadow-nature'
                        : 'border-earth-200 bg-white hover:border-forest-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{t.icon}</span>
                      {safariType === t.id && <CheckCircle size={18} className="text-forest-600" />}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-forest-800 mb-1">{t.name}</h3>
                    <p className="text-sm text-earth-600 mb-3">{t.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-earth-50 border border-earth-200 px-2 py-1 rounded-full text-earth-700">
                        ⏱ {t.duration}
                      </span>
                      {t.coverage && (
                        <span className="bg-earth-50 border border-earth-200 px-2 py-1 rounded-full text-earth-700">
                          🛣 {t.coverage}
                        </span>
                      )}
                      {t.maxGroupSize && (
                        <span className="bg-earth-50 border border-earth-200 px-2 py-1 rounded-full text-earth-700">
                          👥 Max {t.maxGroupSize} pax
                        </span>
                      )}
                    </div>
                    {t.id === 'elephant' && (
                      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-700">
                        ⚠ Max group size: 4 persons per elephant
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Fee Calculator */}
            <section className="bg-white border border-earth-200 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-2">Fee Calculator</h2>
              <p className="text-earth-500 text-sm mb-6">Configure your safari to get an estimated total</p>

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                {/* Nationality */}
                <div>
                  <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">Visitor Nationality</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[['indian', '🇮🇳 Indian'], ['foreign', '🌍 Foreign']].map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => setNationality(val)}
                        className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                          nationality === val
                            ? 'bg-forest-700 text-cream border-forest-700'
                            : 'bg-white text-earth-700 border-earth-200 hover:border-forest-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-earth-400 mt-1">
                    Indian: ₹50/head · Foreign: ₹200–300/head
                  </p>
                </div>

                {/* Group size */}
                <div>
                  <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">
                    Group Size: <span className="text-forest-600 normal-case">{groupSize} {groupSize === 1 ? 'person' : 'persons'}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={safariType === 'elephant' ? 4 : 6}
                    value={groupSize}
                    onChange={e => setGroupSize(Number(e.target.value))}
                    className="w-full accent-forest-600"
                  />
                  <div className="flex justify-between text-xs text-earth-400 mt-1">
                    <span>1</span>
                    <span>{safariType === 'elephant' ? 4 : 6} (max)</span>
                  </div>
                  {safariType === 'elephant' && (
                    <p className="text-xs text-amber-600 mt-1">Elephant safari max 4 persons</p>
                  )}
                </div>

                {/* Guide duration */}
                <div>
                  <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">Guide Duration</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[[1, '1 Hour – ₹100'], [2, '2 Hours – ₹200']].map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => setGuideDuration(val)}
                        className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                          guideDuration === val
                            ? 'bg-forest-700 text-cream border-forest-700'
                            : 'bg-white text-earth-700 border-earth-200 hover:border-forest-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-earth-400 mt-1">Guide assignment is mandatory for all safaris</p>
                </div>

                {/* Camera fees */}
                <div>
                  <label className="block text-xs font-bold text-forest-700 uppercase tracking-wider mb-2">Camera Equipment</label>
                  <div className="space-y-2">
                    {[
                      { key: 'still', label: 'Still Camera – ₹100', state: hasStillCamera, setter: setHasStillCamera },
                      { key: 'video', label: 'Video Camera – ₹150', state: hasVideoCamera, setter: setHasVideoCamera },
                    ].map(({ key, label, state, setter }) => (
                      <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={state}
                          onChange={e => setter(e.target.checked)}
                          className="w-4 h-4 accent-forest-600 rounded"
                        />
                        <span className="text-sm text-earth-700">{label}</span>
                      </label>
                    ))}
                    <p className="text-xs text-earth-400">Mobile photography free of charge</p>
                  </div>
                </div>
              </div>

              {/* Fee breakdown */}
              <div className="bg-forest-50 border border-forest-100 rounded-xl p-5">
                <h3 className="font-semibold text-forest-800 mb-3">Estimated Fee Breakdown</h3>
                <div>
                  <FeeRow
                    label="Park Entry Fee"
                    value={`₹${parkEntry} × ${groupSize} = ₹${(parkEntry * groupSize).toLocaleString()}`}
                    note={`${nationality === 'indian' ? 'Indian National' : 'Foreign National'} rate`}
                  />
                  {safariType === 'jeep' && (
                    <>
                      <FeeRow label="Safari Package (Jeep)" value={`₹${safariPackage.toLocaleString()}`} note="90min–3hr, 35km core + buffer" />
                      <FeeRow label="Vehicle Entry" value={`₹${vehicleFee}`} note="Registered safari jeep" />
                    </>
                  )}
                  {safariType === 'elephant' && (
                    <FeeRow
                      label="Elephant Safari"
                      value={`₹400 × ${Math.min(groupSize, 4)} = ₹${(400 * Math.min(groupSize, 4)).toLocaleString()}`}
                      note="1 hour, max 4 persons per elephant"
                    />
                  )}
                  <FeeRow label={`Guide Fee (${guideDuration} hour)`} value={`₹${guideFee}`} note="Mandatory – 1 guide per group" />
                  {cameraFee > 0 && <FeeRow label="Camera Fee" value={`₹${cameraFee}`} note={`${hasStillCamera ? 'Still ₹100' : ''}${hasStillCamera && hasVideoCamera ? ' + ' : ''}${hasVideoCamera ? 'Video ₹150' : ''}`} />}
                  <div className="flex items-center justify-between pt-3 mt-2 border-t-2 border-forest-200">
                    <span className="font-bold text-forest-800">Estimated Total (Group)</span>
                    <span className="text-2xl font-bold font-serif text-forest-700">₹{totalGroup.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-earth-400 mt-2">
                    Actual charges may vary. Government taxes and gateway fees additional. Contact the booking helpline for exact rates.
                  </p>
                </div>
              </div>
            </section>

            {/* Safari Cancellation Policy */}
            <section className="bg-white border border-earth-200 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-xl text-forest-800 mb-4">Safari Cancellation Policy</h2>
              <div className="space-y-3">
                {cancellationPolicy.safari.map((s, i) => (
                  <div key={i} className={`policy-slab ${s.fee === 100 ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${s.fee === 100 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {s.fee}%
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-forest-800">{s.label}</div>
                      <div className="text-xs text-earth-600 mt-0.5">{s.condition}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-700">
                <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
                <p><strong>Forest Entry Passes:</strong> {cancellationPolicy.forestEntryPass}</p>
              </div>
            </section>

            {/* Special Programs */}
            <section>
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-5">Special Programmes</h2>
              {safariInfo.specialPrograms.map(prog => (
                <div key={prog.name} className="bg-forest-800 rounded-2xl p-6 text-cream">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-gold text-xs font-bold uppercase tracking-wider mb-1">Limited Seats</div>
                      <h3 className="font-serif font-bold text-2xl">{prog.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold font-serif text-gold">₹{prog.price.toLocaleString()}</div>
                      <div className="text-forest-400 text-xs">per explorer</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-forest-700 text-forest-200 text-xs px-2.5 py-1 rounded-full">Age: {prog.targetAge}</span>
                    <span className="bg-forest-700 text-forest-200 text-xs px-2.5 py-1 rounded-full">Duration: {prog.duration}</span>
                    <span className="bg-forest-700 text-forest-200 text-xs px-2.5 py-1 rounded-full">Dates: {prog.dateExample}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {prog.includes.map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-forest-300">
                        <CheckCircle size={13} className="text-forest-400 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-forest-900 text-cream rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif font-bold text-xl mb-4">Book a Safari</h3>
              <p className="text-forest-300 text-sm mb-5">
                Call our booking helpline to reserve your safari slot and assign a certified forest guide.
              </p>
              <a
                href={`tel:${contacts.helpline.number}`}
                className="flex items-center gap-2.5 bg-gold hover:bg-gold-light text-forest-900 rounded-xl p-4 mb-4 transition-colors font-semibold"
              >
                <Phone size={18} />
                <div>
                  <div className="text-xs font-medium opacity-70">Booking Helpline</div>
                  <div className="font-bold">{contacts.helpline.display}</div>
                </div>
              </a>

              <div className="space-y-3 border-t border-forest-700 pt-4 mt-2">
                {[
                  { label: 'Morning Safari', value: '6:00 AM – 10:00 AM' },
                  { label: 'Evening Safari', value: '2:00 PM – 5:30 PM' },
                  { label: 'Park Open', value: 'Oct 1 – Jun 30' },
                  { label: 'Park Closed', value: 'Jul 1 – Sep 30' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-forest-400">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-semibold text-earth-800 mb-3 flex items-center gap-2">
                <AlertTriangle size={15} className="text-amber-600" />
                Wildlife Viewing Tips
              </h3>
              <ul className="space-y-2 text-xs text-earth-700">
                {[
                  'Wear earthy, muted colours (no bright clothing)',
                  'Maintain complete silence near wildlife',
                  'Keep mobile phones on silent mode',
                  'Follow guide instructions at all times',
                  'Do not stand up in the safari vehicle',
                  'Binoculars recommended for birdwatching',
                ].map(tip => (
                  <li key={tip} className="flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
