import React, { useReducer } from "react";

const numReducer = (state, action) => {
    
    switch (action.type) {
        case "INCREASE" :            
            return state + 1;
        case "DECREASE" :            
            return state - 1;
        default:
            return state;
    }
}

const Counter = () => {
    const [number, dispatch] = useReducer(numReducer, 0);

    const onIncrease = () => {
        dispatch({type: "INCREASE"});
    }
    const onDecrease = () => {
        dispatch({type: "DECREASE"});
    }
    return (
        <div>
            <strong>{number}</strong>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;