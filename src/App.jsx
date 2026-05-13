import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Applications from './pages/Applications';
import RecruiterDashboard from './pages/RecruiterDashboard';
import SavedJobs from './pages/SavedJobs';
import Companies from './pages/Companies';
import { X, CheckCircle } from 'lucide-react';
import { applications as initialApplications } from './data/mockData';

function ApplyModal({ job, onClose, onSubmit }) {
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl p-10 max-w-sm w-full mx-4 shadow-2xl text-center animate-slide-up" onClick={e => e.stopPropagation()}>
          <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-1">Application Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">Your application to <strong>{job.company}</strong> has been sent.</p>
          <button onClick={onClose} className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blueDark text-white rounded-full font-semibold text-sm transition">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${job.logoColor} flex items-center justify-center text-white text-xl font-bold`}>
              {job.logo}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><X size={18} /></button>
        </div>

        {/* Form */}
        <div className="space-y-3 mb-5">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
            <input type="text" defaultValue="Varun Galgali"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-brand-blue transition" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Email Address</label>
            <input type="email" defaultValue="varun@example.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-brand-blue transition" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Cover Letter (optional)</label>
            <textarea rows={3} placeholder="Why are you a great fit?"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-brand-blue transition resize-none" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              onSubmit(job);
              setSubmitted(true);
            }}
            className="flex-1 py-2.5 bg-brand-blue hover:bg-brand-blueDark text-white font-semibold rounded-full transition text-sm shadow-md"
          >
            Submit Application
          </button>
          <button onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [applyJob, setApplyJob]   = useState(null);
  const [myApplications, setMyApplications] = useState(initialApplications);

  const handleToggleSave = (id) =>
    setSavedJobs(prev => prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]);

  const handleApplySubmit = (job) => {
    // Only add if not already applied (optional, but good practice)
    if (myApplications.some(app => app.jobTitle === job.title && app.company === job.company)) return;

    const newApp = {
      id: Date.now(),
      jobTitle: job.title,
      company: job.company,
      logo: job.logo,
      logoColor: job.logoColor,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Applied",
      nextStep: "Waiting for response",
      salary: job.salary,
      location: job.location,
    };
    setMyApplications([newApp, ...myApplications]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/"            element={<Home         savedJobs={savedJobs} onToggleSave={handleToggleSave} onApply={setApplyJob} />} />
          <Route path="/profile"     element={<Profile />} />
          <Route path="/applications"element={<Applications myApplications={myApplications} />} />
          <Route path="/recruiter"   element={<RecruiterDashboard />} />
          <Route path="/saved"       element={<SavedJobs    savedJobs={savedJobs} onToggleSave={handleToggleSave} onApply={setApplyJob} />} />
          <Route path="/companies"   element={<Companies />} />
        </Routes>
        <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} onSubmit={handleApplySubmit} />
      </div>
    </Router>
  );
}
