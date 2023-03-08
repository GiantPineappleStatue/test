import React from 'react';

export default ({
    ref,
    min,
    max,
    type,
    className,
    onChange,
    value,
    placeholder,
    name,
    id,
    required,
    checked,
    defaultValue,
    readOnly,
    onKeyDown,
    onInput
}) => (
    <input
        ref={ref}
        onInput={(validity) => validity.valid || (value = '')}
        onKeyDown={onKeyDown}
        checked={checked}
        required={required}
        type={type}
        className={className}
        placeholder={placeholder}
        name={name}
        onKeyDown={onKeyDown}
        id={id}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        readOnly={readOnly}
        min={min}
        max={max}
    />
);
