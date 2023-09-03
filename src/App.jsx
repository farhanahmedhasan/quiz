import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import MainContent from "./MainContent";
import Question from "./Question";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";

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

        case "quizStart":
            return {
                ...state,
                status: "active",
            };

        default:
            return state;
    }
}

function App() {
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

    const numQuestion = questions.length;

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch("http://localhost:3000/questions");
                const data = await res.json();

                if (!res.ok) {
                    return dispatch({ type: "dataFailed" });
                }

                dispatch({ type: "dataReceived", payload: data });
            } catch (error) {
                console.log(error);
                dispatch({ type: "dataFailed" });
            }
        }

        fetchQuestions();
    }, []);

    function handleQuizStart() {
        dispatch({ type: "quizStart" });
    }

    return (
        <div className="app">
            <Header />
            <MainContent>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen numQuestion={numQuestion} onQuizStart={handleQuizStart} />}
                {status === "active" && <Question />}
            </MainContent>
        </div>
    );
}

export default App;
