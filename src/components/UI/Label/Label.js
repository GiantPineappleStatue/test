import React from 'react';

export default ({ children, className, htmlFor, onClick }) => {
    return (
        <label htmlFor={htmlFor} className={className} onClick={onClick}>
            {children}
        </label>
    );
};
