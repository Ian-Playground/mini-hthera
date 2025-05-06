'use client';

// Import core react and next.js modules
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Import external modules and libraries i.e.: Lodash, MUI, etc.
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { format } from 'date-fns';

// Import store
import { usePrescriptionStore } from '@/entities/prescription/model/usePrescriptionStore';

// Import internal components
import { Layout } from '@/shared/components/Layout';
import { ThemeProvider } from '@/shared/components/ThemeProvider';

// Import styles
import './prescription-detail.css';

export default function PrescriptionDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const {
    selectedPrescription,
    loading,
    error,
    fetchPrescriptionById,
    requestRefill,
    setFilters,
    fetchPrescriptions,
  } = usePrescriptionStore();
  const [isRefillDialogOpen, setIsRefillDialogOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPrescriptionById(params.id);
    }
  }, [params.id, fetchPrescriptionById]);

  const handleRequestRefill = async () => {
    await requestRefill(params.id);
    setIsRefillDialogOpen(false);
  };

  const handleBack = () => {
    setFilters({ search: '' });
    fetchPrescriptions();
    router.back();
  };

  if (loading) {
    return (
      <ThemeProvider>
        <Layout>
          <Typography>Loading...</Typography>
        </Layout>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider>
        <Layout>
          <Typography color="error">{error}</Typography>
        </Layout>
      </ThemeProvider>
    );
  }

  if (!selectedPrescription) {
    return (
      <ThemeProvider>
        <Layout>
          <Typography>Prescription not found</Typography>
        </Layout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Layout>
        <Box sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ mb: 4 }}
            aria-label="Go back to the prescriptions list"
          >
            Back to Prescriptions
          </Button>

          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {selectedPrescription.medicationName}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Dosage
            </Typography>
            <Typography paragraph>{selectedPrescription.dosage}</Typography>

            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <Typography paragraph>{selectedPrescription.instructions}</Typography>

            <Typography variant="h6" gutterBottom>
              Prescribing Doctor
            </Typography>
            <Typography paragraph>{selectedPrescription.prescribingDoctor}</Typography>

            <Typography variant="h6" gutterBottom>
              Refill Information
            </Typography>
            <Typography paragraph>
              Next refill date:{' '}
              {format(new Date(selectedPrescription.nextRefillDate), 'MMM d, yyyy')}
            </Typography>
            <Typography paragraph>
              Refills remaining: {selectedPrescription.refillsRemaining}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsRefillDialogOpen(true)}
              disabled={selectedPrescription.status === 'refill_requested'}
              aria-label="Request a refill for this prescription"
            >
              Request Refill
            </Button>
          </Box>
        </Box>

        <Dialog
          open={isRefillDialogOpen}
          onClose={() => setIsRefillDialogOpen(false)}
          aria-labelledby="refill-dialog-title"
          aria-describedby="refill-dialog-description"
          role="dialog"
          aria-modal="true"
        >
          <DialogTitle id="refill-dialog-title">Request Refill</DialogTitle>
          <DialogContent>
            <DialogContentText id="refill-dialog-description">
              Are you sure you want to request a refill for {selectedPrescription.medicationName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsRefillDialogOpen(false)} aria-label="Cancel refill request">
              Cancel
            </Button>
            <Button
              onClick={handleRequestRefill}
              color="primary"
              autoFocus
              aria-label="Confirm refill request"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </ThemeProvider>
  );
}
