import { useState } from 'react';
import { User, Mail, Phone, MapPin, Plus, X, Upload, Pencil, CheckCircle } from 'lucide-react';

const defaultProfile = {
  name: 'Varun Galgali',
  email: 'varun@example.com',
  phone: '+91 9876543210',
  location: 'Bangalore, India',
  bio: 'Passionate frontend developer with 3 years of experience building scalable web applications.',
  skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js'],
  experience: [
    { role: 'Frontend Developer', company: 'TechCorp',   duration: '2023 - Present' },
    { role: 'Junior Developer',   company: 'StartupXYZ', duration: '2022 - 2023'   },
  ],
};

export default function Profile() {
  const [profile, setProfile]           = useState(defaultProfile);
  const [editing, setEditing]           = useState(false);
  const [draft, setDraft]               = useState(defaultProfile);
  const [newSkill, setNewSkill]         = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [saved, setSaved]               = useState(false);

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addSkill = () => {
    if (newSkill.trim() && !draft.skills.includes(newSkill.trim())) {
      setDraft({ ...draft, skills: [...draft.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const data = editing ? draft : profile;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-green-600 text-sm animate-fade-in">
                <CheckCircle size={15} /> Saved!
              </span>
            )}
            <button
              onClick={() => editing ? handleSave() : (setDraft(profile), setEditing(true))}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                editing
                  ? 'bg-green-600 hover:bg-green-500 text-white'
                  : 'bg-brand-blue hover:bg-brand-blueDark text-white'
              }`}
            >
              {editing ? <><CheckCircle size={14} /> Save</> : <><Pencil size={14} /> Edit Profile</>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Left */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {/* Avatar card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-card">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3 shadow-md">
                {data.name.charAt(0)}
              </div>
              <h2 className="text-lg font-bold text-gray-900">{data.name}</h2>
              <p className="text-sm text-brand-blue mt-1">Job Seeker</p>
            </div>

            {/* Resume upload */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                <Upload size={15} className="text-brand-orange" /> Resume
              </h3>
              {resumeUploaded ? (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle size={15} className="text-green-500" />
                  <span className="text-sm text-green-600">resume.pdf uploaded</span>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-200 hover:border-brand-blue rounded-xl p-5 text-center transition-colors">
                    <Upload size={20} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-xs text-gray-400">Click to upload PDF / DOC</p>
                  </div>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={e => e.target.files[0] && setResumeUploaded(true)} />
                </label>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-2 flex flex-col gap-4">

            {/* Basic Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm">
                <User size={15} className="text-brand-blue" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Full Name', key: 'name',     icon: User    },
                  { label: 'Email',     key: 'email',    icon: Mail    },
                  { label: 'Phone',     key: 'phone',    icon: Phone   },
                  { label: 'Location',  key: 'location', icon: MapPin  },
                ].map(({ label, key, icon: Icon }) => (
                  <div key={key}>
                    <label className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                      <Icon size={11} /> {label}
                    </label>
                    {editing ? (
                      <input
                        value={draft[key]}
                        onChange={e => setDraft({ ...draft, [key]: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-brand-blue transition"
                      />
                    ) : (
                      <p className="text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">{data[key]}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <label className="text-xs text-gray-400 mb-1 block">Bio</label>
                {editing ? (
                  <textarea rows={3} value={draft.bio}
                    onChange={e => setDraft({ ...draft, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-brand-blue transition resize-none" />
                ) : (
                  <p className="text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">{data.bio}</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {data.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-full font-medium">
                    {skill}
                    {editing && (
                      <button onClick={() => setDraft({ ...draft, skills: draft.skills.filter(s => s !== skill) })}
                        className="hover:text-red-500 transition ml-0.5">
                        <X size={11} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editing && (
                <div className="flex gap-2">
                  <input value={newSkill} onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill..."
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue transition" />
                  <button onClick={addSkill}
                    className="px-3 py-2 bg-brand-blue hover:bg-brand-blueDark text-white rounded-lg transition">
                    <Plus size={15} />
                  </button>
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Experience</h3>
              <div className="space-y-2">
                {data.experience.map((exp, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{exp.role}</p>
                      <p className="text-xs text-gray-500">{exp.company} · {exp.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
