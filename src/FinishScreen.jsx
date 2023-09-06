export default function FinishScreen({ points, totalPoints, highScore, onReStart }) {
    const percent = Math.ceil((points / totalPoints) * 100);

    let emoji;

    if (percent === 100) emoji = "🎖️";
    if (percent < 100 && percent >= 80) emoji = "🎉";
    if (percent < 80 && percent >= 50) emoji = "😃";
    if (percent < 50 && percent > 0) emoji = "🤔";
    if (percent === 0) emoji = "🤮";

    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points}</strong> out of {totalPoints} ({percent}%)
            </p>

            <p className="highscore">
                (Highscore: <strong>{highScore}</strong> points)
            </p>

            <button className="btn btn-ui" onClick={onReStart}>
                Restart Quiz
            </button>
        </>
    );
}
