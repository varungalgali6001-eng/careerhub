import { useState } from 'react';
import { recruiterJobs as initialJobs } from '../data/mockData';
import { Plus, Users, MapPin, Clock, Trash2, CheckCircle, XCircle, Briefcase } from 'lucide-react';

const emptyForm = { title: '', location: '', type: 'Full-time', salary: '', skills: '' };

export default function RecruiterDashboard() {
  const [jobs, setJobs]         = useState(initialJobs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(emptyForm);
  const [success, setSuccess]   = useState(false);

  const handlePost = () => {
    if (!form.title || !form.location || !form.salary) return;
    const newJob = {
      id: Date.now(),
      title: form.title,
      location: form.location,
      type: form.type,
      salary: form.salary,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      posted: 'Just now',
      applicants: 0,
      status: 'Active',
    };
    setJobs([newJob, ...jobs]);
    setForm(emptyForm);
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const toggleStatus = (id) =>
    setJobs(jobs.map(j => j.id === id ? { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' } : j));

  const deleteJob = (id) => setJobs(jobs.filter(j => j.id !== id));

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your job postings</p>
          </div>
          <div className="flex items-center gap-3">
            {success && (
              <span className="flex items-center gap-1.5 text-green-600 text-sm animate-fade-in">
                <CheckCircle size={14} /> Job posted!
              </span>
            )}
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-brand-blueDark text-white font-semibold rounded-full text-sm transition-all shadow-md"
            >
              <Plus size={15} /> Post a Job
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Posts',      value: jobs.length,                                color: 'text-brand-blue'   },
            { label: 'Active',           value: jobs.filter(j=>j.status==='Active').length,  color: 'text-green-600'   },
            { label: 'Total Applicants', value: jobs.reduce((s,j)=>s+j.applicants,0),        color: 'text-brand-orange' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-card">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Post Job Form */}
        {showForm && (
          <div className="bg-white border border-blue-100 rounded-xl p-6 mb-6 shadow-cardHover animate-slide-up">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Post New Job</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Job Title *',                key: 'title',    placeholder: 'e.g. Senior React Developer' },
                { label: 'Location *',                 key: 'location', placeholder: 'e.g. Bangalore, India'       },
                { label: 'Salary Range *',             key: 'salary',   placeholder: 'e.g. ₹20L - ₹35L'           },
                { label: 'Skills (comma-separated)',   key: 'skills',   placeholder: 'React, Node.js, SQL'         },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-blue transition"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Job Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-brand-blue transition"
                >
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handlePost}
                className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blueDark text-white font-semibold rounded-full text-sm transition">
                Publish Job
              </button>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); }}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm transition">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Job list */}
        <div className="space-y-3">
          {jobs.map(job => (
            <div key={job.id}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-card hover:shadow-cardHover transition-all animate-slide-up">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <Briefcase size={18} className="text-brand-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><MapPin size={10} />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{job.type}</span>
                  <span className="flex items-center gap-1"><Users size={10} />{job.applicants} applicants</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  job.status === 'Active'
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}>
                  {job.status}
                </span>
                <button onClick={() => toggleStatus(job.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition" title="Toggle status">
                  {job.status === 'Active' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                </button>
                <button onClick={() => deleteJob(job.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
