export default function Progress({ numQuestion, curQuesIndex, points, totalPoints, curQuesAnsIndex }) {
    return (
        <header className="progress">
            <progress id="file" value={curQuesIndex + Number(curQuesAnsIndex !== null)} max={numQuestion} />
            <p>
                Question <strong>{curQuesIndex + 1}</strong>/{numQuestion}
            </p>

            <p>
                <strong>{points}</strong> / {totalPoints}
            </p>
        </header>
    );
}
