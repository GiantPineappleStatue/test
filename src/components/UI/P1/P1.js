import React from 'react';
export default ({ id, className, children, style, onClick, onMouseEnter, onMouseLeave }) => (
    <p
        id={id}
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        {children}
    </p>
);
