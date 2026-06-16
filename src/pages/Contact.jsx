import { Phone, MapPin, Clock, AlertTriangle, CheckCircle, Shield } from 'lucide-react'
import { contacts, checkInRules, cancellationPolicy, conductRules, season } from '../data/ptr-data.js'

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-forest-900 text-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-forest-400 text-xs font-bold uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-3">Contact & Support</h1>
          <p className="text-forest-300 text-lg font-serif italic">
            Helplines, visit policies, and everything you need before your trip
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact cards */}
          <div className="lg:col-span-2 space-y-8">

            {/* Official Contacts */}
            <section>
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-5">Official Contact Numbers</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${contacts.helpline.number}`}
                  className="bg-forest-800 hover:bg-forest-700 text-cream rounded-2xl p-6 flex items-start gap-4 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-forest-900" />
                  </div>
                  <div>
                    <p className="text-forest-400 text-xs font-medium uppercase tracking-wider mb-1">{contacts.helpline.label}</p>
                    <p className="text-2xl font-bold font-serif text-gold">{contacts.helpline.display}</p>
                    <p className="text-forest-400 text-xs mt-1">Reservations · Safari bookings · General enquiries</p>
                  </div>
                </a>

                <a
                  href={`tel:${contacts.complaints.number}`}
                  className="bg-white border border-earth-200 hover:border-palash rounded-2xl p-6 flex items-start gap-4 transition-colors group"
                >
                  <div className="w-12 h-12 bg-palash/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-palash" />
                  </div>
                  <div>
                    <p className="text-earth-500 text-xs font-medium uppercase tracking-wider mb-1">{contacts.complaints.label}</p>
                    <p className="text-2xl font-bold font-serif text-forest-800">{contacts.complaints.display}</p>
                    <p className="text-earth-400 text-xs mt-1">Feedback · Complaints · Grievance redressal</p>
                  </div>
                </a>
              </div>

              <div className="mt-4 bg-earth-50 border border-earth-200 rounded-xl p-4 text-sm text-earth-700">
                <strong>Contact Person:</strong> {contacts.deputyDirector.name},&nbsp;
                {contacts.deputyDirector.title}
              </div>
            </section>

            {/* Office Address */}
            <section className="bg-white border border-earth-200 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-xl text-forest-800 mb-4">
                <MapPin size={18} className="inline mr-2 text-palash" />
                Office Address
              </h2>
              <div className="space-y-3 text-sm text-earth-700">
                <p className="font-semibold text-forest-800">Palamu Tiger Reserve</p>
                <p>Deputy Director's Office</p>
                <p>Betla, Latehar District</p>
                <p>Jharkhand – 829 206, India</p>
                <p className="pt-2 border-t border-earth-100">
                  <strong>Nearest landmark:</strong> Betla National Park Gate, Betla Village
                </p>
                <p>
                  <strong>Nearest railway:</strong> Barwadih Junction (12 km) | Daltonganj (25 km)
                </p>
              </div>
            </section>

            {/* Check-in & Rules */}
            <section id="terms">
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-5">
                <Clock size={20} className="inline mr-2 text-amber-600" />
                Visit Rules & Timings
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                {[
                  { label: 'Check-in Time', value: checkInRules.checkIn, icon: '🏨', color: 'bg-green-50 border-green-200' },
                  { label: 'Check-out Time', value: checkInRules.checkOut, icon: '🚪', color: 'bg-blue-50 border-blue-200' },
                  { label: 'Arrival Deadline', value: checkInRules.deadline, icon: '⚠️', color: 'bg-red-50 border-red-200', bold: true },
                  { label: 'Park Season', value: season.open.label, icon: '📅', color: 'bg-forest-50 border-forest-100' },
                ].map(({ label, value, icon, color, bold }) => (
                  <div key={label} className={`${color} border rounded-xl p-4`}>
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="text-xs font-medium text-earth-500 uppercase tracking-wider mb-1">{label}</div>
                    <div className={`${bold ? 'text-red-700 text-xl' : 'text-forest-800 text-lg'} font-bold font-serif`}>{value}</div>
                    {bold && <div className="text-xs text-red-600 mt-1 font-medium">Strict — no exceptions</div>}
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-earth-800 mb-1">4:00 PM Arrival Mandate</h3>
                    <p className="text-sm text-earth-700">{checkInRules.deadlineNote}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-forest-800 mb-3 text-sm">Valid Government ID Required at Check-in:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {checkInRules.idRequired.map(id => (
                    <div key={id} className="flex items-center gap-2 text-sm text-earth-700 bg-white border border-earth-100 rounded-lg p-2.5">
                      <CheckCircle size={14} className="text-forest-500 flex-shrink-0" />
                      {id}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cancellation & Refund */}
            <section id="cancellation">
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-5">
                <Shield size={20} className="inline mr-2 text-forest-600" />
                Cancellation & Refund Policy
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-5">
                {/* Accommodation */}
                <div className="bg-white border border-earth-200 rounded-2xl p-5">
                  <h3 className="font-serif font-bold text-lg text-forest-800 mb-4">🏠 Accommodation</h3>
                  <div className="space-y-3">
                    {cancellationPolicy.accommodation.map((s, i) => (
                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border text-sm ${
                        s.fee === 100 ? 'bg-red-50 border-red-200' :
                        s.fee === 50  ? 'bg-amber-50 border-amber-200' :
                        'bg-green-50 border-green-200'
                      }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          s.fee === 100 ? 'bg-red-100 text-red-700' :
                          s.fee === 50  ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {s.fee}%
                        </div>
                        <div>
                          <div className="font-semibold text-forest-800">{s.label}</div>
                          <div className="text-xs text-earth-600">{s.condition}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safari */}
                <div className="bg-white border border-earth-200 rounded-2xl p-5">
                  <h3 className="font-serif font-bold text-lg text-forest-800 mb-4">🚙 Safari Bookings</h3>
                  <div className="space-y-3">
                    {cancellationPolicy.safari.map((s, i) => (
                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border text-sm ${
                        s.fee === 100 ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                      }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          s.fee === 100 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {s.fee}%
                        </div>
                        <div>
                          <div className="font-semibold text-forest-800">{s.label}</div>
                          <div className="text-xs text-earth-600">{s.condition}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">
                    <strong>Forest Entry Passes:</strong> {cancellationPolicy.forestEntryPass}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-forest-50 border border-forest-100 rounded-xl p-4">
                  <h4 className="font-semibold text-forest-800 mb-1">Refund Processing</h4>
                  <p className="text-earth-700">{cancellationPolicy.refundWindow}</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-1">Force Majeure</h4>
                  <p className="text-blue-700">{cancellationPolicy.forceMajeure}</p>
                </div>
              </div>
            </section>

            {/* Privacy & Data Security */}
            <section id="privacy">
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-5">Privacy & Data Security</h2>
              <div className="bg-white border border-earth-200 rounded-2xl p-6">
                <div className="space-y-4 text-sm text-earth-700">
                  <p>The PTR Journey Planner adheres strictly to data privacy best practices as required for government digital services:</p>
                  <ul className="space-y-2">
                    {[
                      'No credit card or debit card numbers are stored on PTR servers. All payment processing is handled by PCI-DSS compliant third-party processors.',
                      'Government-issued ID numbers collected for check-in verification are hashed and never stored in plain text.',
                      'Booking data is used exclusively for reservation management and not shared with third parties for commercial purposes.',
                      'All data transmissions are encrypted using TLS/HTTPS.',
                    ].map(point => (
                      <li key={point} className="flex items-start gap-2">
                        <Shield size={14} className="text-forest-500 flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Conduct rules */}
            <section>
              <h2 className="font-serif font-bold text-2xl text-forest-800 mb-5">Wildlife Conduct Rules</h2>
              <div className="bg-white border border-earth-200 rounded-2xl p-6">
                <p className="text-sm text-earth-600 mb-4">
                  All visitors must agree to the following rules. Violations result in immediate expulsion
                  and potential legal action without any refund.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {conductRules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-earth-700 p-2">
                      <span className="text-palash font-bold flex-shrink-0">→</span>
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-forest-900 text-cream rounded-2xl p-5 sticky top-24">
              <h3 className="font-serif font-bold text-lg mb-4">Quick Contacts</h3>
              <div className="space-y-3">
                <a href={`tel:${contacts.helpline.number}`} className="flex items-center gap-2 bg-forest-800 hover:bg-forest-700 rounded-xl p-3 transition-colors">
                  <Phone size={16} className="text-gold" />
                  <div>
                    <div className="text-xs text-forest-400">Booking Helpline</div>
                    <div className="font-bold text-gold text-sm">{contacts.helpline.display}</div>
                  </div>
                </a>
                <a href={`tel:${contacts.complaints.number}`} className="flex items-center gap-2 bg-forest-800 hover:bg-forest-700 rounded-xl p-3 transition-colors">
                  <Phone size={16} className="text-forest-300" />
                  <div>
                    <div className="text-xs text-forest-400">Grievances</div>
                    <div className="font-bold text-forest-200 text-sm">{contacts.complaints.display}</div>
                  </div>
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-forest-700 space-y-2 text-xs text-forest-400">
                <p><strong className="text-forest-300">Safari hours:</strong><br />{season.safariWindows.morning.label}<br />{season.safariWindows.evening.label}</p>
                <p className="pt-2"><strong className="text-forest-300">Park closure:</strong><br />July 1 – September 30 (annual)</p>
                <p className="pt-2"><strong className="text-forest-300">Entry cutoff:</strong><br />4:00 PM daily (strictly enforced)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
