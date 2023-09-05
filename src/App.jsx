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
    curQuesIndex: 0,
    curQuesAnsIndex: null,
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

        case "nextQuestion":
            return {
                ...state,
                curQuesIndex: state.curQuesIndex + 1,
                curQuesAnsIndex: null,
            };

        case "newAnswer": {
            return {
                ...state,
                curQuesAnsIndex: action.payload,
            };
        }

        default:
            return state;
    }
}

function App() {
    const [{ questions, status, curQuesIndex, curQuesAnsIndex }, dispatch] = useReducer(reducer, initialState);

    const numQuestion = questions.length;
    const hasMoreQuestion = numQuestion > curQuesIndex + 1;

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

    function handleNewAnswer(newAnswer) {
        dispatch({ type: "newAnswer", payload: newAnswer });
    }

    function handleNextQuestion() {
        dispatch({ type: "nextQuestion" });
    }

    return (
        <div className="app">
            <Header />
            <MainContent>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen numQuestion={numQuestion} onQuizStart={handleQuizStart} />}
                {status === "active" && (
                    <Question
                        question={questions[curQuesIndex]}
                        curQuesAnsIndex={curQuesAnsIndex}
                        onNewAnswer={handleNewAnswer}
                        onNextQuestion={handleNextQuestion}
                        hasMoreQuestion={hasMoreQuestion}
                    />
                )}
            </MainContent>
        </div>
    );
}

export default App;
