import React from 'react';

const NumericAdjustButtons = ({ value, onChange, step }) => {
    const incrementValue = () => onChange(String(Number(value) + step));
    const decrementValue = () => onChange(String(Number(value) - step));

    // Styles defined outside the return statement for clarity
    const containerStyle = {
        display: 'inline-flex',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '50px',
    };

    const buttonStyle = {
        fontSize: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        color: 'white',
        border: 'none',
    };

    const buttonRightStyle = {
        ...buttonStyle,
        borderRight: '1px solid rgba(255, 255, 255, 0.5)',
    };

    return (
        <div style={containerStyle}>
            <button onClick={incrementValue} style={buttonRightStyle}>+</button>
            <button onClick={decrementValue} style={buttonStyle}>-</button>
        </div>
    );
};

export default NumericAdjustButtons;
