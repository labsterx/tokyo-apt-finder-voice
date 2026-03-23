import type { Filters } from '../types';

interface Props {
  filters: Filters;
  onClear: (key: keyof Filters) => void;
}

export function FilterBar({ filters, onClear }: Props) {
  const pills: { label: string; key: keyof Filters }[] = [];

  if (filters.ward) pills.push({ label: `📍 ${filters.ward}`, key: 'ward' });
  if (filters.maxPrice) pills.push({ label: `💴 < ¥${filters.maxPrice.toLocaleString()}`, key: 'maxPrice' });
  if (filters.minBedrooms) pills.push({ label: `🛏 ${filters.minBedrooms}+ BR`, key: 'minBedrooms' });
  if (filters.features.length > 0) {
    pills.push({ label: `✨ ${filters.features.join(', ')}`, key: 'features' });
  }

  if (pills.length === 0) {
    return (
      <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-sm text-gray-400">All apartments shown — speak to filter</span>
      </div>
    );
  }

  return (
    <div className="px-6 py-2 bg-gray-50 border-b border-gray-200 flex items-center gap-2 flex-wrap">
      <span className="text-xs text-gray-400 mr-1">Filters:</span>
      {pills.map(p => (
        <button
          key={p.key}
          onClick={() => onClear(p.key)}
          className="filter-pill inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
        >
          {p.label}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ))}
    </div>
  );
}
