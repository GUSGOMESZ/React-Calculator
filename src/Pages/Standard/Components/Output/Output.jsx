import React from "react";
import "./Output.css";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0
})

function formatOperand(operand) {
    if(operand == null) {
      return;
    }
  
    const [integer, decimal] = operand.split('.');
  
    if(decimal == null) {
      return INTEGER_FORMATTER.format(integer);
    }
  
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  }

function Output(props) {
    return (
        <div className="output">
            <div className="previous-operand">{formatOperand(props.previousOperand)} {props.operation}</div>
            <div className="current-operand">{formatOperand(props.currentOperand)}</div>
        </div>
    )
}

export default Output;