import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Progress from "./Progress";
import Question from "./Question";
import MainContent from "./MainContent";
import StartScreen from "./StartScreen";
import FinishScreen from "./FinishScreen";
import { useEffect, useMemo, useReducer } from "react";

const initialState = {
    questions: [],
    //"loading", "error", "ready", "active", "finished"
    status: "loading",
    curQuesIndex: 0,
    curQuesAnsIndex: null,
    points: 0,
    highScore: 0,
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
            const question = state.questions[state.curQuesIndex];
            const isCorrectAnswer = question.correctOption === action.payload;

            return {
                ...state,
                curQuesAnsIndex: action.payload,
                points: isCorrectAnswer ? state.points + question.points : state.points,
            };
        }

        case "finishQuiz": {
            const newHighScore = state.points > state.highScore ? state.points : state.highScore;

            return {
                ...state,
                status: "finished",
                curQuesIndex: 0,
                curQuesAnsIndex: null,
                highScore: newHighScore,
            };
        }

        default:
            return state;
    }
}

function App() {
    const [{ questions, status, curQuesIndex, curQuesAnsIndex, points, highScore }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const numQuestion = questions.length;
    const hasMoreQuestion = numQuestion > curQuesIndex + 1;
    const totalPoints = useMemo(() => questions.reduce((acc, cur) => acc + cur.points, 0), [questions]);

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

    function handleNewAnswer(index) {
        dispatch({ type: "newAnswer", payload: index });
    }

    function handleNextQuestion() {
        if (hasMoreQuestion) {
            dispatch({ type: "nextQuestion" });
        }

        if (!hasMoreQuestion) {
            dispatch({ type: "finishQuiz" });
        }
    }

    return (
        <div className="app">
            <Header />
            <MainContent>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen numQuestion={numQuestion} onQuizStart={handleQuizStart} />}
                {status === "active" && (
                    <>
                        <Progress
                            numQuestion={numQuestion}
                            curQuesIndex={curQuesIndex}
                            points={points}
                            totalPoints={totalPoints}
                            curQuesAnsIndex={curQuesAnsIndex}
                        />
                        <Question
                            question={questions[curQuesIndex]}
                            curQuesAnsIndex={curQuesAnsIndex}
                            onNewAnswer={handleNewAnswer}
                            onNextQuestion={handleNextQuestion}
                            hasMoreQuestion={hasMoreQuestion}
                        />
                        {curQuesAnsIndex !== null && (
                            <button className="btn btn-ui" onClick={handleNextQuestion}>
                                {hasMoreQuestion ? "Next" : "Finish"}
                            </button>
                        )}
                    </>
                )}

                {status === "finished" && (
                    <FinishScreen points={points} totalPoints={totalPoints} highScore={highScore} />
                )}
            </MainContent>
        </div>
    );
}

export default App;
