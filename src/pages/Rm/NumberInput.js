import React, {useState} from 'react';
function noOp() {
    return () => {
    };
}

function NumberInput({id, label, value, onChange, helpText, onBlur}) {
    onBlur = onBlur || noOp;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) {
            onBlur(e.target.value);
        }
    };


    return (<div>
        <label htmlFor={id}>
            {label}
        </label>

        <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={true}
            inputMode="decimal"
            style={{fontSize: "16px"}}
            className={`number-input ${isFocused ? 'focused' : '' }`}
        />
        <div className={`input-help-text ${isFocused ? 'visible' : ''}`}>{helpText}</div>    </div>);
}

export default NumberInput;