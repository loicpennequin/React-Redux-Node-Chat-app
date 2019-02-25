import React from 'react';

import './style.scss';

const Spinner = ({size = 'md'}) => {
    console.log(size);
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
