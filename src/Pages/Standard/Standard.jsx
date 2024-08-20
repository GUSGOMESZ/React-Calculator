import React, { useReducer } from "react";
import "./Standard.css";
import Output from "./Components/Output/Output.jsx";
import OperationButton from "./Components/OperationButton/OperationButton.jsx";
import DigitButton from "./Components/DigitButton/DigitButton.jsx";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  PLUS_MINUS: 'plus-minus',
  GET_PERCENT: 'get-percent',
  CLEAR: 'clear',
  CLEAR_ENTRY: 'clear-entry',
  DELETE_DIGIT: 'delete-digit',
  INVERSE: 'inverse',
  TO_SQUARE: 'to-square',
  SQUARE_ROOT: 'square-root',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:

      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }

      if(payload.digit === "0" && state.currentOperand === "0") return state;

      if(payload.digit === "." && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: '0.',
        }
      }

      if(payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if(state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }
    case ACTIONS.PLUS_MINUS:
      if(state.currentOperand == null) {
        return {
          ...state,
        }
      }
      
      return {
        ...state,
        currentOperand: (parseFloat(state.currentOperand) * (-1)).toString(),
      }
    case ACTIONS.GET_PERCENT:
      if(state.currentOperand == null) {
        return {
          ...state,
        }
      }

      return {
        ...state,
        currentOperand: (parseFloat(state.currentOperand) * 0.01).toString(),
      }
    case ACTIONS.CLEAR:
      return {

      }
    case ACTIONS.CLEAR_ENTRY:
      return {
        ...state,
        currentOperand: null,
      }
    case ACTIONS.INVERSE:
      if(state.currentOperand == null) {
        return {
          ...state,
        }
      }

      return {
        ...state,
        currentOperand: (parseFloat(state.currentOperand) / (parseFloat(state.currentOperand) * parseFloat(state.currentOperand))).toString(),
      }
    case ACTIONS.TO_SQUARE:
      if(state.currentOperand == null) {
        return {
          ...state,
        }
      }

      return {
        ...state,
        currentOperand: (parseFloat(state.currentOperand) * parseFloat(state.currentOperand)).toString(),
      }
    case ACTIONS.SQUARE_ROOT:
      if(state.currentOperand == null) {
        return {
          ...state,
        }
      }

      return {
        ...state,
        currentOperand: (Math.sqrt(parseFloat(state.currentOperand))).toString(),
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }

      if(state.currentOperand == null) return state;

      if(state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if(state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if(isNaN(prev) || isNaN(current)) {
    return "";
  }

  let computation = "";

  switch(operation) {
    case "+":
    {
      computation = prev + current;
      break;
    }
    case "-":
    {
      computation = prev - current;
      break;
    }
    case "*":
    {
      computation = prev * current;
      break;
    }
    case "÷":
    {
      computation = prev / current;
      break;
    }
  }

  return computation.toString();
}

function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <>
      <div className="calculator">
          <div className="output">
            <Output previousOperand={previousOperand} currentOperand={currentOperand} operation={operation} />
          </div>
          <div className="buttons">
            <div className="row">
              <button className="operator" onClick={() => dispatch({ type: ACTIONS.GET_PERCENT })}>%</button>
              <button className="operator" onClick={() => dispatch({ type: ACTIONS.CLEAR_ENTRY })}>CE</button>
              <button className="operator" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>C</button>
              <button className="operator" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
            </div>
            <div className="row">
              <button className="operator" onClick={() => dispatch({ type: ACTIONS.INVERSE })}>1/x</button>
              <button className="operator" onClick={() => dispatch({ type: ACTIONS.TO_SQUARE })}>x²</button>
              <button className="operator" onClick={() => dispatch({ type: ACTIONS.SQUARE_ROOT })}>√</button>
              <OperationButton operation="÷" dispatch={dispatch} />
            </div>
            <div className="row">
              <DigitButton digit="7" dispatch={dispatch} />
              <DigitButton digit="8" dispatch={dispatch} />
              <DigitButton digit="9" dispatch={dispatch} />
              <OperationButton operation="*" dispatch={dispatch} />
            </div>
            <div className="row">
              <DigitButton digit="4" dispatch={dispatch} />
              <DigitButton digit="5" dispatch={dispatch} />
              <DigitButton digit="6" dispatch={dispatch} />
              <OperationButton operation="-" dispatch={dispatch} />
            </div>
            <div className="row">
              <DigitButton digit="1" dispatch={dispatch} />
              <DigitButton digit="2" dispatch={dispatch} />
              <DigitButton digit="3" dispatch={dispatch} />
              <OperationButton operation="+" dispatch={dispatch} />
            </div>
            <div className="row">
              <button className="minus" onClick={() => dispatch({ type: ACTIONS.PLUS_MINUS })}>+/-</button>
              <DigitButton digit="0" dispatch={dispatch} />
              <DigitButton digit="." dispatch={dispatch} />
              <button className="equal" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
            </div>
          </div>
      </div>
    </>
  )
}

export default App