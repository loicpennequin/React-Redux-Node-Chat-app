import React, { memo, useRef, useEffect } from 'react';

let p5;
if (typeof window !== 'undefined') {
    p5 = require('p5');
}

const Sketch = memo(({ sketch }) => {
    const wrapper = useRef(null);
    let canvas;
    useEffect(() => {
        canvas = new p5(sketch, wrapper.current);

        return () => {
            canvas.remove();
        };
    });
    return <div ref={wrapper} />;
});
export default Sketch;
