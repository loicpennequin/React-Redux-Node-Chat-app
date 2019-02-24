import React from 'react';

import css from './style.scss';

const Button = ({
    children,
    color = 'white',
    outlined = false,
    className,
    ...props
}) => {
    const baseClass = `button-${color}${outlined ? '--outlined' : ''}`;

    return (
        <button {...props} className={className + ` ${css[baseClass]}`}>
            {children}
        </button>
    );
};

export default Button;
