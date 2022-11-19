import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CardMedia from '@mui/material/CardMedia';

export function CopyrightWhite(props) {
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
          image='/UTN_LOGO_BLANCO_transparente.png'
          alt="Universidad Tecnologica Nacional"
        />
      </Link>
    </Typography>
  );
}

export function CopyrightBlack(props) {
    return (
        <Typography
            variant="body2"
            color="black"
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
                    image='/UTN_LOGO_NEGRO_transparente.png'
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

export function LogoCardBlack(props) {
  return (

        <Link color="inherit" href="https://frc.utn.edu.ar/">
          <CardMedia
              component="img"
              width="150px"
              image='/UTN_LOGO_NEGRO_transparente.png'
              alt="Universidad Tecnologica Nacional"
              {...props}
          />
        </Link>
  );
}

export function LogoCardWhite(props) {
  return (

      <Link color="inherit" href="https://frc.utn.edu.ar/">
        <CardMedia
            component="img"
            width="150px"
            image='/UTN_LOGO_BLANCO_transparente.png'
            alt="Universidad Tecnologica Nacional"
            {...props}
        />
      </Link>
  );
}