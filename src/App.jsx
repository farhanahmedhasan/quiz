import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Progress from "./Progress";
import Question from "./Question";
import MainContent from "./MainContent";
import StartScreen from "./StartScreen";
import FinishScreen from "./FinishScreen";
import { useEffect, useMemo, useReducer } from "react";
import Timer from "./Timer";

const SECS_PER_QUS = 30;

const initialState = {
    questions: [],
    //"loading", "error", "ready", "active", "finished"
    status: "loading",
    curQuesIndex: 0,
    curQuesAnsIndex: null,
    points: 0,
    highScore: 0,
    timeRemains: null,
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
                timeRemains: state.questions.length * SECS_PER_QUS,
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
                highScore: newHighScore,
            };
        }

        case "quizRestart": {
            return {
                ...state,
                status: "ready",
                points: 0,
                curQuesIndex: 0,
                curQuesAnsIndex: null,
            };
        }

        case "timerCounter": {
            const newHighScore = state.points > state.highScore ? state.points : state.highScore;

            return {
                ...state,
                highScore: newHighScore,
                timeRemains: state.timeRemains - 1,
                status: state.timeRemains === 1 ? "finished" : "active",
            };
        }

        default:
            return state;
    }
}

function App() {
    const [{ questions, status, curQuesIndex, curQuesAnsIndex, points, highScore, timeRemains }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const numQuestion = questions.length;
    const hasMoreQuestion = numQuestion > curQuesIndex + 1;
    const totalPoints = useMemo(() => questions.reduce((acc, cur) => acc + cur.points, 0), [questions]);

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

    function handleRestart() {
        dispatch({ type: "quizRestart" });
    }

    function handleTimer() {
        dispatch({ type: "timerCounter" });
    }

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

                        <Timer status={status} timeRemains={timeRemains} onCountTimer={handleTimer} />
                    </>
                )}

                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        totalPoints={totalPoints}
                        highScore={highScore}
                        onReStart={handleRestart}
                    />
                )}
            </MainContent>
        </div>
    );
}

export default App;
