import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Title1(props) {
    return (
        <Typography component="h1" variant="h5" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}

function Title2(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}

Title1.propTypes = {
    children: PropTypes.node,
};
Title2.propTypes = {
    children: PropTypes.node,
};

export {Title1, Title2 };

