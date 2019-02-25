import React from 'react';
import TextInput from './textInput.js';

import css from './style.scss';

const FormControl = ({ label, type = 'text', ...props }) => {
    let Input;
    switch (type) {
        default:
            Input = TextInput;
    }
    const styleName=`form-control ${props.disabled ? 'disabled' : ''}`;
    return (
        <div styleName={styleName}>
            <label styleName="label">{label}</label>
            <Input type={type} {...props} />
        </div>
    );
};

export default FormControl;
