import React, {useState} from 'react';
import Toggle from './Toggle'; // Ensure this is the path to your generic Toggle component

const FormulaToggle = ({ label1, label2, onToggle }) => {

    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = (isToggled) => {
        onToggle(isToggled);
    };

    // Conditional styles for labels
    const labelStyle = isEnabled => ({
        fontSize: "10px",
        border: isEnabled ? "0.5px solid rgba(255,255,255,0.5)" : "none",
        borderRadius: isEnabled ? "5px" : "0",
        padding: "1px",
    });

    return (
        <div>
            <div style={{marginBottom: '10px'}}>
            <span style={labelStyle(!isEnabled)}>
                {label1}
            </span>
                <Toggle onChange={handleToggle} isEnabled={isEnabled} setIsEnabled={setIsEnabled}/>
                <span style={labelStyle(isEnabled)}>
                {label2}
            </span>
            </div>
        </div>
    );
};

export default FormulaToggle;
