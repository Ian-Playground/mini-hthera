import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Prescription } from '@/entities/prescription/types';

interface PrescriptionHistoryGridProps {
  prescriptions: Prescription[];
}

const columns: GridColDef[] = [
  { field: 'medicationName', headerName: 'Medication', flex: 1, minWidth: 150 },
  { field: 'dosage', headerName: 'Dosage', flex: 1, minWidth: 100 },
  { field: 'prescribingDoctor', headerName: 'Doctor', flex: 1, minWidth: 150 },
  { field: 'nextRefillDate', headerName: 'Next Refill', flex: 1, minWidth: 120 },
  { field: 'refillsRemaining', headerName: 'Refills Left', type: 'number', flex: 1, minWidth: 100 },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
];

export function PrescriptionHistoryGrid({ prescriptions }: PrescriptionHistoryGridProps) {
  // DataGrid expects an 'id' field
  const rows = prescriptions.map(p => ({ ...p, id: p.id }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[20, 50, 100]}
        initialState={{ pagination: { paginationModel: { pageSize: 20, page: 0 } } }}
        disableRowSelectionOnClick
      />
    </div>
  );
}
