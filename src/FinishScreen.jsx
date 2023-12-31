import {useQuizContext} from "./context/QuizContext.jsx";

export default function FinishScreen() {
    const {points, totalPoints, highScore, dispatch} = useQuizContext()

    const percent = Math.ceil((points / totalPoints) * 100);

    let emoji;

    if (percent === 100) emoji = "🎖️";
    if (percent < 100 && percent >= 80) emoji = "🎉";
    if (percent < 80 && percent >= 50) emoji = "😃";
    if (percent < 50 && percent > 0) emoji = "🤔";
    if (percent === 0) emoji = "🤮";

    function handleRestart() {
        dispatch({ type: "quiz/restart" });
    }

    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points}</strong> out of {totalPoints} ({percent}%)
            </p>

            <p className="highscore">
                (Highscore: <strong>{highScore}</strong> points)
            </p>

            <button className="btn btn-ui" onClick={handleRestart}>
                Restart Quiz
            </button>
        </>
    );
}
