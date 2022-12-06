import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CardMedia from '@mui/material/CardMedia';

export function LogoCard(props) {
  const images = {
    black: '/UTN_LOGO_NEGRO_transparente.png',
    white: '/UTN_LOGO_BLANCO_transparente.png',
  };

  return (
    <Link color="inherit" href="https://frc.utn.edu.ar/">
      <CardMedia
        component="img"
        width="150px"
        image={images[props.color || 'black']}
        alt="Universidad Tecnologica Nacional"
        {...props}
      />
    </Link>
  );
}

export function Copyright(props) {
  return (
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
      <br />
      {!props.simple &&
      <>
        <br />
        <LogoCard {...props} />
      </>
      }
    </Typography>
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