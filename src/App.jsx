import { useEffect, useReducer } from "react";
import MainContent from "./MainContent";
import Header from "./Header";

const initialState = {
    questions: [],
    //"loading", "error", "ready", "active", "finished"
    status: "loading",
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };

        case "dataFailed":
            return {
                ...state,
                status: "error",
            };

        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch("http://localhost:3000/questions");
                const data = await res.json();

                if (!res.ok) {
                    return dispatch({ type: "dataFailed" });
                }

                console.log(res.status);

                dispatch({ type: "dataReceived", payload: data });
            } catch (error) {
                console.log(error);
                dispatch({ type: "dataFailed" });
            }
        }

        fetchQuestions();
    }, []);

    return (
        <div className="app">
            <Header />
            <MainContent>
                <p>1/15</p>
                <p>Question?</p>
            </MainContent>
        </div>
    );
}

export default App;
