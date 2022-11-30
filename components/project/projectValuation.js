import * as React from 'react';

export default function ProjectValuation(props) {

    const [project, setProject]  = React.useState(props.project);
    console.log(props);

    return("Project Valuation");

}