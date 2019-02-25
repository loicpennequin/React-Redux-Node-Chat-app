import React from 'react';

import './style.scss';

const Spinner = ({size = 'md'}) => {
    return (
        <div styleName={`spinner--${size}`}>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}

export default Spinner;
