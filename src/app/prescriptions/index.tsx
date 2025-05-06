'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box, TextField, Typography, Tabs, Tab } from '@mui/material';
import {
  usePrescriptionStore,
  getHistoryPrescriptions,
} from '@/entities/prescription/model/usePrescriptionStore';
import { Layout } from '@/shared/components/Layout';
import { ThemeProvider } from '@/shared/components/ThemeProvider';
import debounce from 'lodash/debounce';
import { PrescriptionList } from './PrescriptionList';
import { PrescriptionHistoryGrid } from './PrescriptionHistoryGrid';

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
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 1000,
        }}
        onFocus={e => {
          e.target.style.left = '0';
          e.target.style.width = 'auto';
          e.target.style.height = 'auto';
        }}
        onBlur={e => {
          e.target.style.left = '-999px';
          e.target.style.width = '1px';
          e.target.style.height = '1px';
        }}
      >
        Skip to main content
      </a>
      <Layout>
        <main id="main-content" tabIndex={-1} aria-label="Main content">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              My Prescriptions
            </Typography>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              aria-label="Prescription tabs"
              sx={{ mb: 2 }}
            >
              <Tab label="Active" />
              <Tab label="History" />
            </Tabs>
            <Box hidden={tab !== 0}>
              <TextField
                fullWidth
                label="Search prescriptions"
                variant="outlined"
                onChange={handleSearch}
                value={searchValue}
                sx={{ mb: 4 }}
                placeholder="Search by medication name or doctor..."
                inputProps={{ 'aria-label': 'Search prescriptions' }}
              />
              <PrescriptionList
                prescriptions={activePrescriptions}
                loading={loading}
                error={error}
              />
            </Box>
            <Box hidden={tab !== 1}>
              <PrescriptionHistoryGrid prescriptions={historyPrescriptions} />
            </Box>
          </Box>
        </main>
      </Layout>
    </ThemeProvider>
  );
}
