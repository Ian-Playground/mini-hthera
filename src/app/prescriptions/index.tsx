'use client';

// Import core react modules
import { useEffect, useState, useMemo } from 'react';

// Import external modules and libraries i.e.: Lodash, MUI, etc.
import { Box, TextField, Typography, Tabs, Tab } from '@mui/material';
import debounce from 'lodash/debounce';

// Import store
import {
  usePrescriptionStore,
  getHistoryPrescriptions,
} from '@/entities/prescription/model/usePrescriptionStore';

// Import internal components
import { Layout } from '@/shared/components/Layout';
import { ThemeProvider } from '@/shared/components/ThemeProvider';
import { PrescriptionList } from './PrescriptionList';
import { PrescriptionHistoryGrid } from './PrescriptionHistoryGrid';

// Import styles
import './prescriptions.css';

export default function PrescriptionsPage() {
  const { prescriptions, loading, error, fetchPrescriptions, setFilters } = usePrescriptionStore();
  const [searchValue, setSearchValue] = useState('');
  const [tab, setTab] = useState(0);

  // Split prescriptions into active and history
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const historyPrescriptions = getHistoryPrescriptions(prescriptions);

  useEffect(() => {
    fetchPrescriptions();
  }, [fetchPrescriptions]);

  // Create a memoized debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setFilters({ search: value });
      }, 300),
    [setFilters]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Layout>
        <main id="main-content" tabIndex={-1} aria-label="Main content">
          <Box className="prescriptions">
            <Box className="prescriptions__header">
              <Typography variant="h4" component="h1" gutterBottom>
                My Prescriptions
              </Typography>
            </Box>
            <Box className="prescriptions__tabs">
              <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="Prescription tabs">
                <Tab label="Active" />
                <Tab label="History" />
              </Tabs>
            </Box>
            <Box hidden={tab !== 0}>
              <Box className="prescriptions__search">
                <TextField
                  fullWidth
                  label="Search prescriptions"
                  variant="outlined"
                  onChange={handleSearch}
                  value={searchValue}
                  placeholder="Search by medication name or doctor..."
                  inputProps={{ 'aria-label': 'Search prescriptions' }}
                />
              </Box>
              <Box className="prescriptions__list">
                <PrescriptionList
                  prescriptions={activePrescriptions}
                  loading={loading}
                  error={error}
                />
              </Box>
            </Box>
            <Box hidden={tab !== 1} className="prescriptions__history-grid">
              <PrescriptionHistoryGrid prescriptions={historyPrescriptions} />
            </Box>
          </Box>
        </main>
      </Layout>
    </ThemeProvider>
  );
}
