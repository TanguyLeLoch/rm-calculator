import React from 'react';
import './Toggle.css'; // Ensure you create and reference Toggle.css for styling

const Toggle = ({ onChange, isEnabled, setIsEnabled}) => {

    const toggle = () => {
        setIsEnabled(!isEnabled);
        onChange(!isEnabled); // Notify parent component of the change
    };

    return (
        <label className="switch">
            <input type="checkbox" checked={isEnabled} onChange={toggle} />
            <span className="slider round"></span>
        </label>
    );
};

export default Toggle;
