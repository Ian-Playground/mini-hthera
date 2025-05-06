'use client';

import { useEffect } from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { usePrescriptionStore } from '@/entities/prescription/model/usePrescriptionStore';
import { Layout } from '@/shared/components/Layout';
import { ThemeProvider } from '@/shared/components/ThemeProvider';
import Link from 'next/link';
import { format } from 'date-fns';

export default function Home() {
  const { prescriptions, loading, error, fetchPrescriptions, setFilters } = usePrescriptionStore();

  useEffect(() => {
    fetchPrescriptions();
  }, [fetchPrescriptions]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: event.target.value });
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

  return (
    <ThemeProvider>
      <Layout>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Prescriptions
          </Typography>
          <TextField
            fullWidth
            label="Search prescriptions"
            variant="outlined"
            onChange={handleSearch}
            sx={{ mb: 4 }}
          />
          <Grid container spacing={3}>
            {prescriptions.map((prescription) => (
              <Grid item xs={12} sm={6} md={4} key={prescription.id}>
                <Link href={`/prescriptions/${prescription.id}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {prescription.medicationName}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {prescription.dosage}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Next refill: {format(new Date(prescription.nextRefillDate), 'MMM d, yyyy')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Refills remaining: {prescription.refillsRemaining}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
    </ThemeProvider>
  );
} 