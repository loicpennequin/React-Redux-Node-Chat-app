import React from 'react';
import './style.scss';

const Flex = ({
    tag = 'div',
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    flexDirection = 'row',
    wrap,
    children,
    className,
    ...props
}) => {
    const Tag = tag;
    const style = {
        flexDirection,
        alignItems,
        justifyContent,
        flexWrap: wrap ? 'wrap' : 'no-wrap'
    };
    return (
        <Tag styleName="flex" style={style} className={className} {...props}>
            {children}
        </Tag>
    );
};

export default Flex;
