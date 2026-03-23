import { useState, useMemo, useCallback } from 'react';
import { apartments as allApartments } from '../data/apartments';
import type { Filters } from '../types';
import { WARD_COORDS, TOKYO_DEFAULT } from '../utils/wardCoordinates';

const INITIAL_FILTERS: Filters = {
  ward: null,
  maxPrice: null,
  minBedrooms: null,
  features: [],
};

// Normalize ward name to match our data (case-insensitive)
function normalizeWard(ward: string): string | null {
  const wards = Object.keys(WARD_COORDS);
  const match = wards.find(w => w.toLowerCase() === ward.toLowerCase());
  return match ?? null;
}

export function useApartmentFilters() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return allApartments.filter(a => {
      if (filters.ward && a.ward !== filters.ward) return false;
      if (filters.maxPrice && a.price > filters.maxPrice) return false;
      if (filters.minBedrooms && a.bedrooms < filters.minBedrooms) return false;
      if (filters.features.length > 0) {
        const aptFeaturesLower = a.features.map(f => f.toLowerCase());
        if (!filters.features.every(f => aptFeaturesLower.includes(f.toLowerCase()))) return false;
      }
      return true;
    });
  }, [filters]);

  const mapCenter = useMemo(() => {
    if (filters.ward && WARD_COORDS[filters.ward]) {
      return WARD_COORDS[filters.ward];
    }
    return TOKYO_DEFAULT;
  }, [filters.ward]);

  const applyVoiceAction = useCallback((action: string, payload: Record<string, any>) => {
    console.log('[Filters] applyVoiceAction called:', action, payload);
    switch (action) {
      case 'filter_apartments': {
        const ward = payload.ward ? normalizeWard(payload.ward) : null;
        console.log('[Filters] Applying filter_apartments — ward:', ward, 'max_price:', payload.max_price, 'features:', payload.features);
        setFilters(prev => {
          const next = {
            ...prev,
            ward: ward ?? prev.ward,
            maxPrice: payload.max_price ?? prev.maxPrice,
            minBedrooms: payload.min_bedrooms ?? prev.minBedrooms,
            features: payload.features
              ? [...new Set([...prev.features, ...payload.features])]
              : prev.features,
          };
          console.log('[Filters] New filter state:', next);
          return next;
        });
        break;
      }
      case 'zoom_to_ward':
        if (payload.ward) {
          const ward = normalizeWard(payload.ward);
          if (ward) setFilters(prev => ({ ...prev, ward }));
        }
        break;
      case 'highlight_apartment':
        setHighlightedId(payload.apartment_id ?? null);
        break;
      case 'reset_filters':
        setFilters(INITIAL_FILTERS);
        setHighlightedId(null);
        break;
    }
  }, []);

  const clearFilter = useCallback((key: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: key === 'features' ? [] : null,
    }));
  }, []);

  return { filters, filtered, mapCenter, highlightedId, applyVoiceAction, clearFilter };
}
