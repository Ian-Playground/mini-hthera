import { Grid, Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { format } from 'date-fns';
import { Prescription } from '@/entities/prescription/types';

interface PrescriptionListProps {
  prescriptions: Prescription[];
  loading?: boolean;
  error?: string | null;
}

export function PrescriptionList({ prescriptions, loading, error }: PrescriptionListProps) {
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  return (
    <Grid container spacing={3}>
      {prescriptions.map(prescription => (
        <Grid item xs={12} sm={6} md={4} key={prescription.id}>
          <Link
            href={`/prescriptions/${prescription.id}`}
            style={{ textDecoration: 'none' }}
            aria-label={`View details for ${prescription.medicationName}`}
          >
            <Card
              sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}
              role="article"
              aria-labelledby={`prescription-title-${prescription.id}`}
            >
              <CardContent>
                <Typography id={`prescription-title-${prescription.id}`} variant="h6" gutterBottom>
                  {prescription.medicationName}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {prescription.dosage}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Doctor: {prescription.prescribingDoctor}
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
  );
}

export default PrescriptionList;
