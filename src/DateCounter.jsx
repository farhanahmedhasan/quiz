import {useReducer} from "react";

const initialState = {step: 1, count: ""}

function CounterReducer(state, action) {
    switch (action.type) {
        case "setInput":
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }

        case "dec":
            return {
                ...state,
                count: +state.count - state.step
            }

        case "inc":
            return {
                ...state,
                count: +state.count + state.step
            }

        case "reset":
            return initialState

        default : return state
    }
}

export default function DateCounter() {
    const [counterState,dispatch] = useReducer(CounterReducer, initialState);

    const date = new Date("june 21 2027")
    date.setDate(date.getDate() + counterState.count)
    function handleChange(e) {
        const key = e.target.id
        let value = +e.target.value

        if(isNaN(value)) return

        dispatch({type: "setInput", payload: {key,value}})
    }

    function decCount() {
        dispatch({type: "dec"})
    }

    function incCount() {
        dispatch({type: "inc"})
    }

    function reset() {
        dispatch({type: "reset"})
    }

    return (
        <div className="counter">
            <div>
                <input type="range" min="1" max="10" id="step" value={counterState.step} onChange={handleChange}/>
                <span>{counterState.step}</span>
            </div>

            <div>
                <button onClick={decCount}>-</button>
                <input type="text" id="count" value={counterState.count} onChange={handleChange}/>
                <button onClick={incCount}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}