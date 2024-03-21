import React, { useState } from 'react';
import RmCalculator from './RmCalculator';

function Rm() {
  const [lastWeight, setLastWeight] = useState(180);
  const [lastRep, setLastRep] = useState(10);
  const [increment, setIncrement] = useState(5);
  const [minRep, setMinRep] = useState(8);
  const [maxRep, setMaxRep] = useState(10);
  const [resultsMatrix, setResultsMatrix] = useState(
    new RmCalculator(lastWeight, lastRep, increment, minRep, maxRep));


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('lastWeight', lastWeight);
    console.log(lastWeight);
    const rmMatrix = new RmCalculator(lastWeight, lastRep, increment, minRep, maxRep);
    console.log('rmMatrix', rmMatrix);
    setResultsMatrix(rmMatrix);
  };

  const formatNumber = (number) => {
    const formatted = number.toFixed(2);
    return formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted;
  };

  return (
    <div style={{
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1>Rm Calculator</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor='lastWeight'>Previous Weight:</label>
          <input
            type='number'
            id='lastWeight'
            value={lastWeight}
            onChange={(e) => setLastWeight(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor='lastRep'>Previous nbRep:</label>
          <input
            type='number'
            id='lastRep'
            value={lastRep}
            onChange={(e) => setLastRep(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor='increment'>Increment:</label>
          <input
            type='number'
            id='increment'
            value={increment}
            onChange={(e) => setIncrement(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor='minRep'>Min nbRep:</label>
          <input
            type='number'
            id='minRep'
            value={minRep}
            onChange={(e) => setMinRep(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor='maxRep'>Max nbRep:</label>
          <input
            type='number'
            id='maxRep'
            value={maxRep}
            onChange={(e) => setMaxRep(parseInt(e.target.value))}
            required
          />
        </div>
        <button type='submit'>Calculate</button>
      </form>

      {resultsMatrix && (
        <table
          style={{ borderSpacing: '0', borderCollapse: 'separate', margin: '0 auto', width: 'auto', padding: '10px' }}>
          <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid white' }}>W \ R  </th>
            {Array.from({ length: maxRep - minRep + 1 }, (_, i) => i + minRep).map((rep, index) => (
              <th key={index} style={{ padding: '10px', borderBottom: '1px solid white' }}>{rep}</th>
            ))}
          </tr>
          </thead>
          <tbody>

          {resultsMatrix.values.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ padding: '10px', borderRight: '1px solid white' }}>{row[0].weight}</td>
              {row.map((cell, cellIndex) => {
                const cellValue = formatNumber(cell.value) ;
                const backgroundColor = cell.color;
                const textColor = cell.textColor;
                return (
                  <td key={cellIndex} style={{ padding: '10px', borderRight: '1px solid white', backgroundColor, color: textColor}}>
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );

}

export default Rm;




