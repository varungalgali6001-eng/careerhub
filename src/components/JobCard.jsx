import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';

export default function JobCard({ job, onToggleSave, onApply }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-cardHover hover:border-blue-200 transition-all duration-200 flex flex-col gap-3 shadow-card animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-lg ${job.logoColor} flex items-center justify-center text-white text-lg font-bold shadow-sm`}>
            {job.logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-brand-blue transition-colors leading-snug">
              {job.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{job.company}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleSave && onToggleSave(job.id)}
          className={`p-1.5 rounded-lg transition-all duration-150 ${
            job.saved ? 'text-brand-blue bg-blue-50' : 'text-gray-300 hover:text-brand-blue hover:bg-blue-50'
          }`}
        >
          {job.saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
        </button>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map(skill => (
          <span key={skill} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100 font-medium">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-400 text-xs rounded-full">+{job.skills.length - 3}</span>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
        <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
        <span className="flex items-center gap-1"><Clock size={11} />{job.type}</span>
        <span className="flex items-center gap-1 text-green-600 font-medium"><DollarSign size={11} />{job.salary}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-400">{job.posted} · {job.applicants} applicants</span>
        <button
          onClick={() => onApply && onApply(job)}
          className="flex items-center gap-1 px-4 py-1.5 bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-semibold rounded-full transition-all duration-200"
        >
          Apply <ExternalLink size={11} />
        </button>
      </div>
    </div>
  );
}
