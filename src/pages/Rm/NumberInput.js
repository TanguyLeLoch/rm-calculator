function NumberInput({ id, label, value, onChange, onBlur = () => {}, required = true }) {
    return (<div>
        <label htmlFor={id}>{label}:</label>
        <input
            type="number"
            id={id}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            onBlur={(e) => onBlur(parseInt(e.target.value))}
            required={required}
            pattern="[0-9]*"
            inputMode="numeric"
        />
    </div>);
}

export default NumberInput;