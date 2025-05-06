import { Prescription, PrescriptionListFilters } from '../types';

export interface PrescriptionRepository {
  getAll(filters?: PrescriptionListFilters): Promise<Prescription[]>;
  getById(id: string): Promise<Prescription | null>;
  requestRefill(id: string): Promise<void>;
} 