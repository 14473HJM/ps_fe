import * as React from 'react';
import Image from "next/image";

export default function Dashboard(props) {

    const [project, setProject]  = React.useState(props.project);
    console.log(props);
    return("Proximamente!!!");

}

Dashboard.auth = true;