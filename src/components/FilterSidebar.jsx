import { SlidersHorizontal, X } from 'lucide-react';

const categories = ['All', 'Engineering', 'Design', 'Data', 'DevOps', 'Marketing', 'HR', 'Sales', 'Banking'];
const jobTypes   = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const locations  = ['All', 'Bangalore, India', 'Hyderabad, India', 'Remote', 'Pune, India', 'Gurugram, India', 'Mumbai, India'];

export default function FilterSidebar({ filters, setFilters }) {
  const reset = () => setFilters({ category: 'All', type: 'All', location: 'All', search: filters.search });
  const activeCount = [filters.category, filters.type, filters.location].filter(v => v !== 'All').length;

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-4 shadow-card h-fit sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
          <SlidersHorizontal size={15} className="text-brand-blue" />
          All Filters
          {activeCount > 0 && (
            <span className="px-1.5 py-0.5 bg-brand-blue text-white text-xs rounded-full">{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={reset} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition">
            <X size={11} /> Reset
          </button>
        )}
      </div>

      <FilterGroup label="Category" options={categories} value={filters.category}
        onChange={v => setFilters({ ...filters, category: v })} />
      <FilterGroup label="Job Type" options={jobTypes} value={filters.type}
        onChange={v => setFilters({ ...filters, type: v })} />
      <FilterGroup label="Location" options={locations} value={filters.location}
        onChange={v => setFilters({ ...filters, location: v })} />
    </aside>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="mb-4">
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">{label}</p>
      <div className="flex flex-col gap-0.5">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
              value === opt
                ? 'bg-blue-50 text-brand-blue font-semibold border border-blue-100'
                : 'text-gray-600 hover:text-brand-blue hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
