import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CardMedia from '@mui/material/CardMedia';


export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="white"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://frc.utn.edu.ar/">
        Universidad Tecnológica Nacional - Facultad Regional Córdoba
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
      <br/>
      <br/>
      <Link color="inherit" href="https://frc.utn.edu.ar/">
        <CardMedia
          component="img"
          width="150px"
          image={process.env.PUBLIC_URL + 'UTN_LOGO_BLANCO_transparente.png'}
          alt="Universidad Tecnologica Nacional"
        />
      </Link>
    </Typography>
  );
}

export function SimpleCopyright(props) {
  return (
      <Typography
          variant="body2"
          color="white"
          align="center"
          {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://frc.utn.edu.ar/">
          Universidad Tecnológica Nacional - Facultad Regional Córdoba
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
        <br/>
      </Typography>
  );
}

export function LogoCard(props) {
  return (

        <Link color="inherit" href="https://frc.utn.edu.ar/">
          <CardMedia
              component="img"
              width="150px"
              image={process.env.PUBLIC_URL + 'UTN_LOGO_BLANCO_transparente.png'}
              alt="Universidad Tecnologica Nacional"
          />
        </Link>
  );
}