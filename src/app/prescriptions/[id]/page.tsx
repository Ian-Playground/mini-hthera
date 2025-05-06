'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { usePrescriptionStore } from '@/entities/prescription/model/usePrescriptionStore';
import { Layout } from '@/shared/components/Layout';
import { ThemeProvider } from '@/shared/components/ThemeProvider';
import { format } from 'date-fns';
import { useState } from 'react';

export default function PrescriptionDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { selectedPrescription, loading, error, fetchPrescriptionById, requestRefill } =
    usePrescriptionStore();
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
          <Button variant="outlined" onClick={() => router.back()} sx={{ mb: 4 }}>
            Back to Prescriptions
          </Button>

          <Card>
            <CardContent>
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
              >
                Request Refill
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Dialog open={isRefillDialogOpen} onClose={() => setIsRefillDialogOpen(false)}>
          <DialogTitle>Request Refill</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to request a refill for {selectedPrescription.medicationName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsRefillDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRequestRefill} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </ThemeProvider>
  );
}
