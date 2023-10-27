import {useQuizContext} from "./context/QuizContext.jsx";
import FinishScreen from "./FinishScreen";
import MainContent from "./MainContent";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import Loader from "./Loader";
import Header from "./Header";
import Error from "./Error";
import Timer from "./Timer";

function App() {
    const {status, curQuesAnsIndex, hasMoreQuestion, dispatch} = useQuizContext()

    function handleNextQuestion() {
        if (hasMoreQuestion) {
            dispatch({ type: "quiz/nextQuestion" });
        }

        if (!hasMoreQuestion) {
            dispatch({ type: "quiz/finish" });
        }
    }

    return (
        <div className="app">
            <Header />
            <MainContent>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen />}
                {status === "active" && (
                    <>
                        <Progress />
                        <Question/>

                        {curQuesAnsIndex !== null && (
                            <button className="btn btn-ui" onClick={handleNextQuestion}>
                                {hasMoreQuestion ? "Next" : "Finish"}
                            </button>
                        )}

                        <Timer />
                    </>
                )}

                {status === "finished" && (
                    <FinishScreen />
                )}
            </MainContent>
        </div>
    );
}

export default App;
