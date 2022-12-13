import * as React from 'react';
import Image from "next/image";

export default function User(props) {

    const [project, setProject]  = React.useState(props.project);
    console.log(props);
    return("Proximamente!!!");

}

User.auth = true;