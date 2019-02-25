import React from 'react';

import css from './style.scss';

const Button = ({
    children,
    color = 'white',
    outlined = false,
    disabled,
    className = '',
    ...props
}) => {
    const baseClass = `button-${color}${outlined ? '--outlined' : ''}`;
    const otherClasses = `${disabled ? 'disabled' : ''} `;

    return (
        <button {...props} styleName={otherClasses} className={className + ` ${css[baseClass]}`}>
            {children}
        </button>
    );
};

export default Button;
