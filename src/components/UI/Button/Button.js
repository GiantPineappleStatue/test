import React from 'react';
import PropTypes from 'prop-types';
const Button = ({ className, type, children, onClick, disabled, refs, style }) => (
    <button
        style={style}
        className={className}
        type={type}
        onClick={onClick}
        disabled={disabled}
        ref={refs}>
        {children}
    </button>
);

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};

Button.defaultProps = {
    type: 'button'
};

export default Button;
