import type { Apartment } from '../types';
import { ApartmentCard } from './ApartmentCard';

interface Props {
  apartments: Apartment[];
  highlightedId: number | null;
}

export function ApartmentGrid({ apartments, highlightedId }: Props) {
  if (apartments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 py-16">
        <span className="text-4xl mb-3">🔍</span>
        <p className="font-medium">No apartments match your criteria</p>
        <p className="text-sm mt-1">Try asking to reset filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {apartments.map((apt, i) => (
        <ApartmentCard
          key={apt.id}
          apartment={apt}
          isHighlighted={apt.id === highlightedId}
          index={i}
        />
      ))}
    </div>
  );
}
