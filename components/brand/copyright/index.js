import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Image from 'next/image'
import tupBlanco from '../../../public/tup_completo_blanco_transparente.png'
import tupNegro from '../../../public/tup_completo_negro_transparente.png'

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export function LogoCard(props) {
  const images = {
    black: tupNegro,
    white: tupBlanco,
  };

  return (
    <Link color="inherit" href="https://frc.utn.edu.ar/">
      <Image
        src={images[props.color || 'black']}
        alt="Tecnicatura universitaria en programación"
        {...props}
      />
    </Link>
  );
}

export function Copyright(props) {
  return (
    <Box style={footerStyle}>
      <Typography
        variant="body2"
        align="center"
        {...props}
      >
        Copyright © 
        <Link color="inherit" href="https://frc.utn.edu.ar/">
          Universidad Tecnológica Nacional - Facultad Regional Córdoba
        </Link>
        {` ${new Date().getFullYear()}.`}
      </Typography>
      {!props.simple &&
        <LogoCard {...props} width={150} />
      }
    </Box>
  );
}

export function PsLogoCard(props) {
  const images = {
    black: '/ps_n.png',
    white: '/ps_b.png',
  };

  return (
      <Link color="inherit" href="https://frc.utn.edu.ar/">
        <CardMedia
            component="img"
            width="150px"
            image={images[props.color || 'black']}
            alt="Practica Supervisada Admin"
            {...props}
        />
      </Link>
  );
}