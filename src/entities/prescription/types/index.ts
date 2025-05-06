export type PrescriptionStatus = 'active' | 'refill_requested' | 'expired';

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  instructions: string;
  prescribingDoctor: string;
  refillsRemaining: number;
  nextRefillDate: string;
  status: PrescriptionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionListFilters {
  search?: string;
  status?: PrescriptionStatus;
}
