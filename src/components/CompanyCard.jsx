import { MapPin, Star, Users, Briefcase } from 'lucide-react';

export default function CompanyCard({ company, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(company)}
      className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-cardHover hover:border-blue-200 transition-all duration-200 cursor-pointer shadow-card animate-slide-up"
    >
      <div className="flex items-start gap-4">
        <div className={`w-13 h-13 w-12 h-12 rounded-xl ${company.logoColor} flex items-center justify-center text-white text-xl font-bold shadow-sm flex-shrink-0`}>
          {company.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-blue transition-colors truncate text-sm">
            {company.name}
          </h3>
          <p className="text-xs text-gray-500">{company.industry}</p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11}
                className={i < Math.floor(company.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
            ))}
            <span className="text-xs text-gray-500 ml-1">{company.rating} ({company.reviews.toLocaleString()})</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500">
        <span className="flex items-center gap-1"><MapPin size={11} />{company.location}</span>
        <span className="flex items-center gap-1"><Users size={11} />{company.size}</span>
        <span className="flex items-center gap-1 text-green-600 font-medium"><Briefcase size={11} />{company.openings} openings</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {company.perks.slice(0, 3).map(perk => (
          <span key={perk} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{perk}</span>
        ))}
        {company.perks.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full">+{company.perks.length - 3}</span>
        )}
      </div>
    </div>
  );
}
