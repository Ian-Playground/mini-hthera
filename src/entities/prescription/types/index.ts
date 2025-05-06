export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  instructions: string;
  prescribingDoctor: string;
  refillsRemaining: number;
  nextRefillDate: string;
  status: 'active' | 'refill_requested' | 'expired';
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionListFilters {
  search?: string;
  status?: Prescription['status'];
}
