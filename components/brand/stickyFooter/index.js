import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {CopyrightBlack, CopyrightWhite} from '../copyright'

export function StickyFooterBlack() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '16px',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[800]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <CopyrightWhite sx={{ pt: 2}} />
        </Container>
      </Box>
    </Box>
  );
}

export function StickyFooterWhite() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '16px',
            }}
        >
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[0]
                            : theme.palette.grey[0],
                }}
            >
                <Container maxWidth="sm">
                    <CopyrightBlack sx={{ pt: 2}} />
                </Container>
            </Box>
        </Box>
    );
}