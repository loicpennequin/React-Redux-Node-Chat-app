import React, { useState } from 'react';

import css from './style.scss';

const TextInput = ({ label, input, ...props }) => {
    const [focused, setFocused] = useState(false);
    return (
        <div styleName={`text-input_wrapper ${focused ? 'focused' : ''}`}>
            <input
                {...props}
                {...input}
                styleName="text-input"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    );
};

export default TextInput;
