import React from 'react';

import css from './style.scss';

const Card = ({
    children,
    rounded = false,
    transparent = false,
    className
}) => {
    const style = {
        borderRadius: rounded ? css.borderRadius : 0,
        backgroundColor: transparent ? 'transparent' : undefined,
        border: transparent ? 'solid white 1px' : undefined
    };
    return (
        <div styleName="card" className={className} style={style}>
            {children}
        </div>
    );
};

export default Card;
