import { useState, useMemo } from 'react';
import { Search, ChevronDown, TrendingUp, ArrowRight } from 'lucide-react';
import { jobs as allJobs, skillRecommendations } from '../data/mockData';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';

const categories = [
  { label: 'Remote',      emoji: '🏠' },
  { label: 'MNC',         emoji: '🏢' },
  { label: 'Engineering', emoji: '⚙️' },
  { label: 'Project Mg.', emoji: '✅' },
  { label: 'Marketing',   emoji: '📈' },
  { label: 'HR',          emoji: '👤' },
  { label: 'Startup',     emoji: '🚀' },
  { label: 'Banking',     emoji: '₹'  },
  { label: 'Analytics',   emoji: '🔍' },
  { label: 'Sales',       emoji: '🏛️' },
];

export default function Home({ savedJobs, onToggleSave, onApply }) {
  const [filters, setFilters] = useState({ category: 'All', type: 'All', location: 'All', search: '' });
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    setFilters(f => ({ ...f, search: filters.search, location: location || 'All' }));
  };

  const filtered = useMemo(() => {
    return allJobs.filter(job => {
      const q = filters.search.toLowerCase();
      const matchSearch = !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some(s => s.toLowerCase().includes(q));
      const matchCat  = filters.category === 'All' || job.category === filters.category;
      const matchType = filters.type === 'All' || job.type === filters.type;
      const matchLoc  = filters.location === 'All' || job.location === filters.location;
      return matchSearch && matchCat && matchType && matchLoc;
    });
  }, [filters]);

  const jobsWithSaved = filtered.map(j => ({ ...j, saved: savedJobs.includes(j.id) }));

  return (
    <div className="min-h-screen pt-16 bg-slate-50">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            Find your dream job now
          </h1>
          <p className="text-gray-500 text-lg mb-9">5 lakh+ jobs for you to explore</p>

          {/* Naukri-style search bar */}
          <div className="flex items-center bg-white rounded-xl shadow-cardHover border border-gray-200 overflow-hidden max-w-3xl mx-auto">
            {/* Skills input */}
            <div className="flex items-center gap-2 flex-1 px-4 py-4 border-r border-gray-200">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Enter skills / designations / companies"
                value={filters.search}
                onChange={e => setFilters({ ...filters, search: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />
            </div>

            {/* Experience dropdown */}
            <div className="relative flex items-center gap-1 px-4 py-4 border-r border-gray-200 cursor-pointer min-w-[160px]">
              <select
                value={experience}
                onChange={e => setExperience(e.target.value)}
                className="text-sm text-gray-500 bg-transparent outline-none appearance-none cursor-pointer w-full"
              >
                <option value="">Select experience</option>
                {['Fresher', '1-3 years', '3-6 years', '6-10 years', '10+ years'].map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              <ChevronDown size={14} className="text-gray-400 pointer-events-none absolute right-3" />
            </div>

            {/* Location input */}
            <div className="flex-1 px-4 py-4 border-r border-gray-200">
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-brand-blue hover:bg-brand-blueDark text-white font-semibold text-sm transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ───────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.label}
                onClick={() => setFilters(f => ({ ...f, search: cat.label === 'Remote' ? '' : cat.label, location: cat.label === 'Remote' ? 'Remote' : 'All' }))}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium hover:border-brand-blue hover:text-brand-blue hover:shadow-card transition-all duration-200 shadow-sm"
              >
                <span>{cat.emoji}</span>
                {cat.label}
                <ArrowRight size={13} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILL RECOMMENDATIONS ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={17} className="text-brand-orange" />
          <h2 className="text-base font-semibold text-gray-800">Skill-Based Recommendations</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {skillRecommendations.map(rec => (
            <button
              key={rec.skill}
              onClick={() => setFilters(f => ({ ...f, search: rec.skill }))}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-brand-blue hover:text-brand-blue shadow-sm transition-all"
            >
              <span className="font-medium text-gray-700">{rec.skill}</span>
              <span className="text-gray-400">{rec.matchedJobs} jobs</span>
              <span className={`font-medium text-xs ${rec.trend.startsWith('↑') ? 'text-green-500' : 'text-yellow-500'}`}>{rec.trend}</span>
            </button>
          ))}
        </div>

        {/* ── JOB GRID ─────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-60 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">
              Showing <span className="font-semibold text-gray-800">{jobsWithSaved.length}</span> jobs
            </p>
            {jobsWithSaved.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Search size={40} className="mx-auto mb-3 opacity-30" />
                <p>No jobs match your filters. Try adjusting them.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobsWithSaved.map(job => (
                  <JobCard key={job.id} job={job} onToggleSave={onToggleSave} onApply={onApply} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
