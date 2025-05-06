// Import testing utilities
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import next.js modules
import { useRouter } from 'next/navigation';

// Import components and stores
import PrescriptionDetail from '@/app/prescriptions/[id]/page';
import { usePrescriptionStore } from '@/entities/prescription/model/usePrescriptionStore';

// Mock CSS imports
jest.mock('@/app/prescriptions/[id]/prescription-detail.css', () => ({}));

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the prescription store
const mockUsePrescriptionStore = usePrescriptionStore as unknown as jest.Mock;
jest.mock('@/entities/prescription/model/usePrescriptionStore', () => ({
  usePrescriptionStore: jest.fn(),
}));

describe('PrescriptionDetail', () => {
  const mockRouter = {
    back: jest.fn(),
  };

  const mockPrescription = {
    id: '1',
    medicationName: 'Test Medication',
    dosage: '100mg',
    instructions: 'Take once daily',
    prescribingDoctor: 'Dr. Test',
    refillsRemaining: 2,
    nextRefillDate: '2024-05-15',
    status: 'active' as const,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('shows loading state', async () => {
    mockUsePrescriptionStore.mockReturnValue({
      loading: true,
      error: null,
      selectedPrescription: null,
      fetchPrescriptionById: jest.fn(),
    });

    await act(async () => {
      render(<PrescriptionDetail params={Promise.resolve({ id: '1' })} />);
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    const errorMessage = 'Failed to fetch prescription';
    mockUsePrescriptionStore.mockReturnValue({
      loading: false,
      error: errorMessage,
      selectedPrescription: null,
      fetchPrescriptionById: jest.fn(),
    });

    await act(async () => {
      render(<PrescriptionDetail params={Promise.resolve({ id: '1' })} />);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows not found state', async () => {
    mockUsePrescriptionStore.mockReturnValue({
      loading: false,
      error: null,
      selectedPrescription: null,
      fetchPrescriptionById: jest.fn(),
    });

    await act(async () => {
      render(<PrescriptionDetail params={Promise.resolve({ id: '1' })} />);
    });

    expect(screen.getByText('Prescription not found')).toBeInTheDocument();
  });

  it('displays prescription details', async () => {
    mockUsePrescriptionStore.mockReturnValue({
      loading: false,
      error: null,
      selectedPrescription: mockPrescription,
      fetchPrescriptionById: jest.fn(),
    });

    await act(async () => {
      render(<PrescriptionDetail params={Promise.resolve({ id: '1' })} />);
    });

    expect(screen.getByText(mockPrescription.medicationName)).toBeInTheDocument();
    expect(screen.getByText(mockPrescription.dosage)).toBeInTheDocument();
    expect(screen.getByText(mockPrescription.instructions)).toBeInTheDocument();
    expect(screen.getByText(mockPrescription.prescribingDoctor)).toBeInTheDocument();
  });

  it('clears search and navigates back when clicking back button', async () => {
    const mockSetFilters = jest.fn();
    const mockFetchPrescriptions = jest.fn();

    mockUsePrescriptionStore.mockReturnValue({
      loading: false,
      error: null,
      selectedPrescription: mockPrescription,
      fetchPrescriptionById: jest.fn(),
      setFilters: mockSetFilters,
      fetchPrescriptions: mockFetchPrescriptions,
    });

    await act(async () => {
      render(<PrescriptionDetail params={Promise.resolve({ id: '1' })} />);
    });

    const backButton = screen.getByRole('button', { name: /go back to the prescriptions list/i });
    await act(async () => {
      fireEvent.click(backButton);
    });

    expect(mockSetFilters).toHaveBeenCalledWith({ search: '' });
    expect(mockFetchPrescriptions).toHaveBeenCalled();
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('handles refill request', async () => {
    const mockRequestRefill = jest.fn();
    mockUsePrescriptionStore.mockReturnValue({
      loading: false,
      error: null,
      selectedPrescription: mockPrescription,
      fetchPrescriptionById: jest.fn(),
      requestRefill: mockRequestRefill,
    });

    await act(async () => {
      render(<PrescriptionDetail params={Promise.resolve({ id: '1' })} />);
    });

    const refillButton = screen.getByRole('button', { name: /request a refill/i });
    await act(async () => {
      fireEvent.click(refillButton);
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    expect(mockRequestRefill).toHaveBeenCalledWith('1');
  });

  it('disables refill button when status is refill_requested', async () => {
    const prescriptionWithRefillRequested = {
      ...mockPrescription,
      status: 'refill_requested' as const,
    };

    mockUsePrescriptionStore.mockReturnValue({
      loading: false,
      error: null,
      selectedPrescription: prescriptionWithRefillRequested,
      fetchPrescriptionById: jest.fn(),
    });

    await act(async () => {
      render(<PrescriptionDetail params={Promise.resolve({ id: '1' })} />);
    });

    const refillButton = screen.getByRole('button', { name: /request a refill/i });
    expect(refillButton).toBeDisabled();
  });

  it('fetches prescription data on mount', async () => {
    const mockFetchPrescriptionById = jest.fn();
    mockUsePrescriptionStore.mockReturnValue({
      loading: true,
      error: null,
      selectedPrescription: null,
      fetchPrescriptionById: mockFetchPrescriptionById,
    });

    await act(async () => {
      render(<PrescriptionDetail params={Promise.resolve({ id: '1' })} />);
    });

    expect(mockFetchPrescriptionById).toHaveBeenCalledWith('1');
  });
});
