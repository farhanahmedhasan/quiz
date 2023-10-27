import {useQuizContext} from "./context/QuizContext.jsx";

export default function Progress() {
    const {questions, curQuesIndex, points, totalPoints, curQuesAnsIndex} = useQuizContext()
    const numQuestion = questions.length

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
