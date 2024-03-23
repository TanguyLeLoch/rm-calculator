function NumberInput({ id, label, value, onChange, onBlur = () => {}, required = true }) {
    return (<div>
        <label htmlFor={id}>{label}:</label>
        <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onBlur(e.target.value)}
            required={required}
            inputMode="decimal"
            style={{fontSize: "16px"}}
        />
    </div>);
}

export default NumberInput;