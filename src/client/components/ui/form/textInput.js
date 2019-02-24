import React, { useState } from 'react';

import css from './style.scss';

const TextInput = ({ label, onFocus, onBlur, props }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div styleName={`text-input_wrapper ${focused ? 'focused' : ''}`}>
            <input
                {...props}
                styleName="text-input"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    );
};

export default TextInput;
