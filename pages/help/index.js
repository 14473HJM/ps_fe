import * as React from 'react';
import Image from "next/image";

export default function Help(props) {

    const [project, setProject]  = React.useState(props.project);
    console.log(props);
    return("Proximamente!!!");

}

Help.auth = true;