// Import core react and next.js modules
import { ReactNode } from 'react';
import Link from 'next/link';

// Import external modules and libraries i.e.: Lodash, MUI, etc.
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Healthera
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
