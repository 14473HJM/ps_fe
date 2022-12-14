import * as React from 'react';
import Image from "next/image";
import Soon from '../../components/common/soon';

export default function Dashboard(props) {

    const [project, setProject]  = React.useState(props.project);
    console.log(props);
    return (<Soon />);

}

Dashboard.auth = true;