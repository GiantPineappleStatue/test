import React from 'react';

export default ({ className, style, children, onClick }) => (
    <span className={className} style={style} onClick={onClick}>
        {children}
    </span>
);
