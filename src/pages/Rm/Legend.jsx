import React from 'react';
import ColorSquare from './ColorSquare'; // Ensure this import path matches your file structure

function Legend() {
    const listStyle = {
        listStyleType: "none", // Removes bullet points
        padding: 0, // Removes default padding
        margin: "0 auto", // Centers the list
    };

    const listItemStyle = {
        display: "flex", // Uses flexbox for layout
        alignItems: "center", // Centers items vertically
    };
    const textStyle = {
        fontSize: "10px",
        paddingLeft: "5px"
    }

    return (<ul style={listStyle}>
        <li style={listItemStyle}><ColorSquare color="green"/><span style={textStyle}> Your last 1RM</span></li>
        <li style={listItemStyle}><ColorSquare color="orange"/> <span style={textStyle}>Your goal today</span></li>
        <li style={listItemStyle}><ColorSquare color="yellow"/> <span style={textStyle}>The best 1RM / rep</span></li>
    </ul>);
}

export default Legend;
