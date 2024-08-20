import React from "react";
import { ACTIONS } from "../../Standard";
import "./DigitButton.css"

function DigitButton({ dispatch, digit }) {
    return (
        <button className="digit" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})}>
            {digit}
        </button>
    );
}

export default DigitButton;