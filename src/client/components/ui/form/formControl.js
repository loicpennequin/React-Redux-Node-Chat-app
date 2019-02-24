import React from 'react';
import TextInput from './textInput.js';

import css from './style.scss';

const FormControl = ({ label, type = 'text', ...props }) => {
    let Input;
    switch (type) {
        default:
            Input = TextInput;
    }

    return (
        <div styleName="form-control">
            <label styleName="label">{label}</label>
            <Input type={type} {...props} />
        </div>
    );
};

export default FormControl;
