import React, {useEffect, useState} from 'react';
import RmCalculator from './RmCalculator';
import NumberInput from "./NumberInput";

import './Rm.css';
import Legend from "./Legend";
import FormulaToggle from "./FormulaToggle";

function Rm() {
    const [lastWeight, setLastWeight] = useState('180');
    const [lastRep, setLastRep] = useState('10');
    const [increment, setIncrement] = useState('5');
    const [minRep, setMinRep] = useState('8');
    const [maxRep, setMaxRep] = useState('10');
    const [isBrzycki, setIsBrzycki] = useState(true);
    const [resultsMatrix, setResultsMatrix] = useState(new RmCalculator(lastWeight, lastRep, increment, minRep, maxRep, isBrzycki));



    useEffect(() => {
        const rmMatrix = new RmCalculator(lastWeight, lastRep, increment, minRep, maxRep, isBrzycki);
        setResultsMatrix(rmMatrix);
    }, [lastWeight, lastRep, increment, minRep, maxRep, isBrzycki]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('lastWeight', lastWeight);
        console.log(lastWeight);
        const rmMatrix = new RmCalculator(lastWeight, lastRep, increment, minRep, maxRep, isBrzycki);
        console.log('rmMatrix', rmMatrix);
        setResultsMatrix(rmMatrix);
    };

    const formatNumber = (number) => {
        const formatted = number.toFixed(2);
        return formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted;
    };
    const updateLastRep = (value) => {
        if (Number(value) < Number(minRep)) {
            setMinRep(value);
        } else if (Number(value) > Number(maxRep)) {
            setMaxRep(value);
        }
    }

    const updateMinRep = (value) => {
        if (Number(value) > Number(maxRep)) {
            console.log('value > maxRep', value, maxRep);
            setMaxRep(value);
        }
    }

    const updateMaxRep = (value) => {
        if (Number(value) < Number(minRep)) {
            console.log('value < minRep', value, minRep)
            setMinRep(value);
        }
    }

    const handleFormulaToggle = () => {
        setIsBrzycki(!isBrzycki);
    };
    return (<div style={{
        color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'    }}>
        <h1>Rm Calculator</h1>
        <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
            <NumberInput
                id="lastWeight"
                label="Last weight"
                value={lastWeight}
                onChange={setLastWeight}
                helpText={'Enter the weight you lifted last time'}
            />
            <NumberInput
                id="lastRep"
                label="Last rep number"
                value={lastRep}
                onChange={setLastRep}
                onBlur={updateLastRep}
                helpText={'Enter the number of repetitions you did last time'}
            />
            <NumberInput
                id="increment"
                label="Weight increment"
                value={increment}
                onChange={setIncrement}
                helpText={'Enter the minimum weight increment you can use'}
            />
            <NumberInput
                id="minRep"
                label="Min rep number"
                value={minRep}
                onChange={setMinRep}
                onBlur={updateMinRep}
                helpText={'Enter the minimum number of repetitions you want to calculate'}
            />
            <NumberInput
                id="maxRep"
                label="Max rep number"
                value={maxRep}
                onChange={setMaxRep}
                onBlur={updateMaxRep}
                helpText={'Enter the maximum number of repetitions you want to calculate'}
            />
        </form>

        {resultsMatrix && (<table
            style={{
                borderSpacing: '0', borderCollapse: 'separate', margin: '0 auto', width: 'auto', padding: '10px'
            }}>
            <thead>
            <tr>
                <th style={{padding: '10px', borderBottom: '1px solid white'}}>W \ R</th>
                {Array.from({length: Number(maxRep) - Number(minRep) + 1}, (_, i) => i + Number(minRep)).map((rep, index) => (
                    <th key={index} style={{padding: '10px', borderBottom: '1px solid white'}}>{rep}</th>))}
            </tr>
            </thead>
            <tbody>

            {resultsMatrix.values.map((row, rowIndex) => (<tr key={rowIndex}>
                <td style={{padding: '10px', borderRight: '1px solid white'}}>{formatNumber(row[0].weight)}</td>
                {row.map((cell, cellIndex) => {
                    const cellValue = formatNumber(cell.value);
                    const backgroundColor = cell.color;
                    const textColor = cell.textColor;
                    return (<td key={cellIndex} style={{
                        padding: '10px',
                        borderRight: '1px solid white',
                        backgroundColor,
                        color: textColor
                    }}>
                        {cellValue}
                    </td>);
                })}
            </tr>))}
            </tbody>
        </table>)}

        <Legend/>
<FormulaToggle label1="Brzycki"
               label2="Epley"
               onToggle={handleFormulaToggle}
              />
    </div>);

}

export default Rm;




