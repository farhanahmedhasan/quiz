import {useQuizContext} from "./context/QuizContext.jsx";

export default function StartScreen() {
    const {questions, dispatch} = useQuizContext()
    function handleQuizStart() {
        dispatch({ type: "quiz/Start" });
    }

    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{questions.length} questions to test your React mastery</h3>
            <button className="btn btn-up" onClick={handleQuizStart}>
                Let&apos;s Start
            </button>
        </div>
    );
}
