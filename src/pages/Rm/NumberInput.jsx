import React, {useState} from 'react';
import ValueAdjuster from "./ValueAdjuster";

function noOp() {
    return () => {
    };
}

function NumberInput({id, label, value, onChange, helpText, step = 1, onBlur}) {
    onBlur = onBlur || noOp;
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = (e) => {
        setIsFocused(true);
        e.target.select(); // Automatically select the text on focus
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) {
            onBlur(e.target.value);
        }
    };
    const adjustValue = (e) => {
        onChange(e);
        onBlur(e);
    }


    return (<>

        <div className={"number-input-container"}>
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
                className={`number-input ${isFocused ? 'focused' : ''}`}
            />
            <ValueAdjuster value={value} step={step} onChange={adjustValue}/>

        </div>
        <div className={`input-help-text ${isFocused ? 'visible' : ''}`}>{helpText}</div>
    </>);
}

export default NumberInput;