import { jobs as allJobs } from '../data/mockData';
import JobCard from '../components/JobCard';
import { BookmarkX } from 'lucide-react';

export default function SavedJobs({ savedJobs, onToggleSave, onApply }) {
  const saved = allJobs
    .filter(j => savedJobs.includes(j.id))
    .map(j => ({ ...j, saved: true }));

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-sm text-gray-500 mt-1">
            {saved.length} job{saved.length !== 1 ? 's' : ''} in your wishlist
          </p>
        </div>

        {saved.length === 0 ? (
          <div className="text-center py-24">
            <BookmarkX size={52} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-400 mb-2">No saved jobs yet</h2>
            <p className="text-gray-400 text-sm">Browse jobs and click the bookmark icon to save them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {saved.map(job => (
              <JobCard key={job.id} job={job} onToggleSave={onToggleSave} onApply={onApply} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
