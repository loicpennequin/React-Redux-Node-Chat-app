import React from 'react';
import './style.scss';

const GridItem = ({
    tag = 'div',
    className,
    colStart,
    colSpan = 1,
    rowStart,
    rowSpan = 1,
    children,
    ...props
}) => {
    const Tag = tag;
    const style = {
        gridColumn: colStart ? `${colStart} / span ${colSpan}` : undefined,
        gridRow: rowStart ? `${rowStart} / span ${rowSpan}` : undefined
    };
    return (
        <Tag style={style} className={className} {...props}>
            {children}
        </Tag>
    );
};

export default GridItem;
