import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Copyright } from '../copyright'

export function StickyFooter({ color = 'white' }) {
  const colorSchemas = {
    white: {
      background: 0,
      text: 'black',
    },
    black: {
      background: 800,
      text: 'white',
    },
  };

  const colors = colorSchemas[color];

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
          backgroundColor: (theme) => theme.palette.grey[colors.background],
        }}
      >
        <Container maxWidth="sm">
          <Copyright sx={{ pt: 2}} color={colors.text} />
        </Container>
      </Box>
    </Box>
  );
}