// Import core react and zustand modules
import { create } from 'zustand';

// Import types
import { Prescription, PrescriptionListFilters } from '../types';

// Import internal components
import { mockPrescriptionRepository } from '../api/mockPrescriptionRepository';

interface PrescriptionState {
  prescriptions: Prescription[];
  selectedPrescription: Prescription | null;
  loading: boolean;
  error: string | null;
  filters: PrescriptionListFilters;
}

interface PrescriptionActions {
  fetchPrescriptions: () => Promise<void>;
  fetchPrescriptionById: (id: string) => Promise<void>;
  requestRefill: (id: string) => Promise<void>;
  setFilters: (filters: PrescriptionListFilters) => void;
  clearError: () => void;
}

export const usePrescriptionStore = create<PrescriptionState & PrescriptionActions>((set, get) => ({
  prescriptions: [],
  selectedPrescription: null,
  loading: false,
  error: null,
  filters: {},

  fetchPrescriptions: async () => {
    set({ loading: true, error: null });
    try {
      const prescriptions = await mockPrescriptionRepository.getAll(get().filters);
      set({ prescriptions, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch prescriptions', loading: false });
    }
  },

  fetchPrescriptionById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const prescription = await mockPrescriptionRepository.getById(id);
      set({ selectedPrescription: prescription, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch prescription', loading: false });
    }
  },

  requestRefill: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await mockPrescriptionRepository.requestRefill(id);
      // Refresh the prescriptions list
      await get().fetchPrescriptions();
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to request refill', loading: false });
    }
  },

  setFilters: (filters: PrescriptionListFilters) => {
    set({ filters });
    get().fetchPrescriptions();
  },

  clearError: () => set({ error: null }),
}));

// Selector for history prescriptions (for DataGrid)
export const getHistoryPrescriptions = (prescriptions: Prescription[]): Prescription[] => {
  let historyPrescriptions = prescriptions.filter(p => p.status !== 'active');
  if (historyPrescriptions.length < 80 && prescriptions.length > 0) {
    // Generate more based on the first available history prescription
    const base = historyPrescriptions[0] || { ...prescriptions[0], status: 'expired', id: 'h0' };
    historyPrescriptions = Array.from({ length: 100 }, (_, i) => ({
      ...base,
      id: `h${i}`,
      medicationName: base.medicationName + ' #' + (i + 1),
    }));
  }
  return historyPrescriptions;
};
