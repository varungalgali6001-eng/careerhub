import { applications } from '../data/mockData';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const statusConfig = {
  Applied:   { color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200'   },
  Interview: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  Offer:     { color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200'  },
  Rejected:  { color: 'text-red-500',    bg: 'bg-red-50',    border: 'border-red-200'    },
};

const stages = ['Applied', 'Interview', 'Offer', 'Rejected'];

export default function Applications() {
  const grouped = stages.reduce((acc, s) => {
    acc[s] = applications.filter(a => a.status === s);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Application Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">Track all your job applications in one place</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stages.map(stage => {
            const cfg = statusConfig[stage];
            return (
              <div key={stage} className={`bg-white rounded-xl p-4 border shadow-card ${cfg.border}`}>
                <p className={`text-2xl font-bold ${cfg.color}`}>{grouped[stage].length}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stage}</p>
              </div>
            );
          })}
        </div>

        {/* Pipeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-card">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">Application Pipeline</h2>
          <div className="flex items-center gap-2">
            {stages.map((stage, i) => {
              const cfg = statusConfig[stage];
              const count = grouped[stage].length;
              return (
                <div key={stage} className="flex items-center gap-2 flex-1">
                  <div className="flex-1 text-center">
                    <div className={`h-2 rounded-full ${count > 0 ? cfg.bg + ' border ' + cfg.border : 'bg-gray-100'} mb-1`}>
                      <div className={`h-full rounded-full transition-all ${count > 0 ? cfg.bg.replace('bg-', 'bg-').replace('50', '300') : ''}`}
                           style={{ width: count > 0 ? '100%' : '0%' }} />
                    </div>
                    <span className={`text-xs font-medium ${cfg.color}`}>{stage}</span>
                  </div>
                  {i < stages.length - 1 && <ArrowRight size={13} className="text-gray-300 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Application list */}
        <div className="space-y-3">
          {applications.map(app => {
            const cfg = statusConfig[app.status];
            return (
              <div key={app.id}
                className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-card hover:shadow-cardHover transition-all animate-slide-up">
                <div className={`w-12 h-12 rounded-xl ${app.logoColor} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
                  {app.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{app.jobTitle}</h3>
                  <p className="text-xs text-gray-500">{app.company}</p>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPin size={10} />{app.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={10} />{app.appliedDate}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                    {app.status}
                  </span>
                  <span className="text-xs text-gray-400">{app.nextStep}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
