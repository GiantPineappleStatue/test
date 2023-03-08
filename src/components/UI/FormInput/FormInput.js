import React from 'react';
import clsx from 'clsx';

const FormInput = ({
    inputType,
    title,
    placeholder,
    onChange,
    name,
    required,
    type,
    value,
    maxLength,
    options,
    label,
    className,
    multiple,
    min,
    max,
    pattern,
    onKeyDown
}) => {
    return (
        <div className={`form-group form-input ${clsx({ 'mb-0': label, 'mb-3': !label })} `}>
            {label && (
                <label htmlFor={name} className="text-white form-input__label">
                    {title}
                </label>
            )}
            {required && label && (
                <small className="text-muted ml-1 form-input__required">(required)</small>
            )}
            {inputType === 'input' && (
                <input
                    onChange={onChange}
                    required={required}
                    type={type}
                    onKeyDown={onKeyDown}
                    min={min}
                    max={max}
                    pattern={pattern}
                    className="form-control  bg-transparent form-input__feild "
                    id={name}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
            )}
            {inputType === 'textarea' && (
                <textarea
                    onChange={onChange}
                    className={`form-control form-input__feild bg-transparent ${className} `}
                    value={value}
                    name={name}
                    id={name}
                    rows="6"
                />
            )}
            {inputType === 'select' && (
                <select
                    className={`form-control form-input__feild bg-transparent ${className} `}
                    id={name}
                    name={name}
                    onChange={onChange}
                    multiple={multiple}>
                    {options.length > 0 && options.map((k, i) => <option key={i}>{k}</option>)}
                </select>
            )}
            {label && (
                <small className="form-text text-muted text-right form-input__length">
                    {maxLength && ` ${value.length}/${maxLength}`}
                </small>
            )}
        </div>
    );
};
FormInput.defaultProps = {
    value: '',
    type: 'text',
    options: [],
    multiple: false
};
export default FormInput;
