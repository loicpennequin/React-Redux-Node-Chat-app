import React from 'react';
import './style.scss';

const Grid = ({
    tag = 'div',
    className,
    cols,
    rows,
    colSize = '1fr',
    rowSize = '1fr',
    colGap = 0,
    rowGap = 0,
    gap,
    children,
    ...props
}) => {
    const Tag = tag;
    const style = {
        gridTemplateColumns: cols ? `repeat(${cols}, ${colSize})` : undefined,
        gridTemplateRows: rows ? `repeat(${rows}, ${colSize})` : undefined,
        gridColumnGap: gap ? gap : colGap,
        gridRowGap: gap ? gap : rowGap
    };
    return (
        <Tag styleName="grid" style={style} className={className} {...props}>
            {children}
        </Tag>
    );
};

export default Grid;
