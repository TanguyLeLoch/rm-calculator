import React from 'react';

const ColorSquare = ({ color }) => {
    const style = {
        display: "inline-block",
        width: "12px",
        height: "12px",
        backgroundColor: color,
        marginRight: "5px"
    };

    return <span style={style}></span>;
};

export default ColorSquare;