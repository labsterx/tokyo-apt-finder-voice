import type { Apartment } from '../types';

const WARD_COLORS: Record<string, string> = {
  Shibuya: 'bg-pink-100 text-pink-700',
  Shinjuku: 'bg-blue-100 text-blue-700',
  Minato: 'bg-emerald-100 text-emerald-700',
  Meguro: 'bg-amber-100 text-amber-700',
  Setagaya: 'bg-violet-100 text-violet-700',
};

interface Props {
  apartment: Apartment;
  isHighlighted: boolean;
  index: number;
}

export function ApartmentCard({ apartment, isHighlighted, index }: Props) {
  const wardColor = WARD_COLORS[apartment.ward] || 'bg-gray-100 text-gray-700';

  return (
    <div
      className={`apartment-card apartment-card-enter rounded-xl border bg-white p-4 ${
        isHighlighted ? 'apartment-card-highlighted ring-2 ring-indigo-500' : 'border-gray-200'
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Color bar top */}
      <div className="h-24 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 mb-3 flex items-center justify-center">
        <span className="text-3xl">🏠</span>
      </div>

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{apartment.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ml-2 ${wardColor}`}>
          {apartment.ward}
        </span>
      </div>

      <p className="text-lg font-bold text-indigo-600 mb-2">
        ¥{apartment.price.toLocaleString()}<span className="text-xs text-gray-400 font-normal">/mo</span>
      </p>

      <div className="flex gap-3 text-xs text-gray-500 mb-3">
        <span>{apartment.bedrooms}BR</span>
        <span>{apartment.size_sqm}m²</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {apartment.features.map(f => (
          <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
