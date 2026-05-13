import { useState } from 'react';
import { companies } from '../data/mockData';
import CompanyCard from '../components/CompanyCard';
import { Star, Users, Briefcase, MapPin, X, Search } from 'lucide-react';

export default function Companies() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch]     = useState('');

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Company Profiles & Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">Explore top employers in India</p>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies or industries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-blue shadow-card transition"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Company Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(company => (
              <CompanyCard key={company.id} company={company} onClick={setSelected} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-16 text-gray-400">No companies found.</div>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div className="w-full lg:w-96 flex-shrink-0 animate-slide-up">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-cardHover sticky top-24">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-xl ${selected.logoColor} flex items-center justify-center text-white text-2xl font-bold shadow-md overflow-hidden relative`}>
                      <span className="relative z-0">{selected.logo}</span>
                      <img 
                        src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${selected.name.replace(/\s+/g, '').toLowerCase()}.com&size=128`}
                        alt={`${selected.name} logo`} 
                        className="absolute inset-0 w-full h-full object-cover bg-white p-1 z-10"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900 text-base">{selected.name}</h2>
                      <p className="text-sm text-gray-400">{selected.industry}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 transition">
                    <X size={18} />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15}
                      className={i < Math.floor(selected.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                  <span className="text-sm font-semibold text-gray-700 ml-1">{selected.rating}</span>
                  <span className="text-xs text-gray-400">({selected.reviews.toLocaleString()} reviews)</span>
                </div>

                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{selected.description}</p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1"><MapPin size={11} />{selected.location}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{selected.size}</span>
                  <span className="flex items-center gap-1 text-green-600 font-medium"><Briefcase size={11} />{selected.openings} roles</span>
                </div>

                {/* Perks */}
                <div className="mb-5">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Perks & Benefits</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.perks.map(perk => (
                      <span key={perk} className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-full">
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Employee Reviews</p>
                  <div className="space-y-3">
                    {selected.userReviews.map((rev, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <img 
                              src={`https://ui-avatars.com/api/?name=${rev.user.replace(' ', '+')}&background=random&color=fff&size=32&font-size=0.4`} 
                              alt={rev.user} 
                              className="w-6 h-6 rounded-full shadow-sm"
                            />
                            <span className="text-sm font-medium text-gray-800">{rev.user}</span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} size={11}
                                className={j < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">{rev.role}</p>
                        <p className="text-xs text-gray-500 italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
