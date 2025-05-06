import { PrescriptionListFilters } from '../types';
import { PrescriptionRepository } from './prescriptionRepository';
import { mockPrescriptions } from '@/shared/mocks/prescriptions';

export const mockPrescriptionRepository: PrescriptionRepository = {
  getAll: async (filters?: PrescriptionListFilters) => {
    let result = [...mockPrescriptions];

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        p =>
          p.medicationName.toLowerCase().includes(searchLower) ||
          p.prescribingDoctor.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.status) {
      result = result.filter(p => p.status === filters.status);
    }

    return result;
  },

  getById: async (id: string) => {
    return mockPrescriptions.find(p => p.id === id) || null;
  },

  requestRefill: async (id: string) => {
    const prescription = mockPrescriptions.find(p => p.id === id);
    if (prescription) {
      prescription.status = 'refill_requested';
      prescription.updatedAt = new Date().toISOString();
    }
  },
};
