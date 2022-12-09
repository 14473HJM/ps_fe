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
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          px: 2,
          backgroundColor: (theme) => theme.palette.grey[colors.background],
        }}
      >
        <Container>
          <Copyright color={colors.text} />
        </Container>
      </Box>
    </Box>
  );
}