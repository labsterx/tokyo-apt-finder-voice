import { useApartmentFilters } from './hooks/useApartmentFilters';
import { useVoiceAgent } from './hooks/useVoiceAgent';
import { ApartmentGrid } from './components/ApartmentGrid';
import { TokyoMap } from './components/TokyoMap';
import { VoiceCopilot } from './components/VoiceCopilot';
import { FilterBar } from './components/FilterBar';

function App() {
  const { filters, filtered, mapCenter, highlightedId, applyVoiceAction, clearFilter } =
    useApartmentFilters();

  const voice = useVoiceAgent({ onAction: applyVoiceAction });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏠</span>
          <h1 className="text-xl font-bold text-gray-900">Tokyo Apartment Finder</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-indigo-600">{filtered.length}</span> of 20 apartments
          </span>
          <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
            Voice-Powered
          </span>
        </div>
      </header>

      {/* Filter Bar */}
      <FilterBar filters={filters} onClear={clearFilter} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Apartment Grid */}
        <div className="w-2/5 overflow-y-auto p-4 border-r border-gray-200">
          <ApartmentGrid apartments={filtered} highlightedId={highlightedId} />
        </div>

        {/* Map */}
        <div className="w-3/5">
          <TokyoMap
            apartments={filtered}
            center={mapCenter}
            highlightedId={highlightedId}
          />
        </div>
      </div>

      {/* Voice Copilot (floating) */}
      <VoiceCopilot voice={voice} />
    </div>
  );
}

export default App;
