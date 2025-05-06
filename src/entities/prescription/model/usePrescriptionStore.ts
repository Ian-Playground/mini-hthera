import { create } from 'zustand';
import { Prescription, PrescriptionListFilters } from '../types';
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
