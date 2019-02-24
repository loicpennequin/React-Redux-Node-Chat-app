import React from 'react';
import { Flex } from 'components/ui';

import './style.scss';

const CardHeader = ({ children, className }) => (
    <Flex
        flexDirection="row"
        alignItems="center"
        className={`p-md ${className}`}
        styleName="card-header"
    >
        {children}
    </Flex>
);

export default CardHeader;
