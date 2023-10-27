import {useQuizContext} from "./context/QuizContext.jsx";

export default function Options() {
    const {questions, curQuesAnsIndex,curQuesIndex, dispatch} = useQuizContext()
    const question = questions[curQuesIndex]
    const hasAnswered = curQuesAnsIndex !== null;

    function handleAnswer(i) {
        dispatch({ type: "quiz/newAnswer", payload: i });
    }

    return (
        <div className="options">
            {question.options.map((option, i) => (
                <button
                    key={option}
                    className={`btn btn-option 
                    ${curQuesAnsIndex === i ? "answer" : ""} 
                    ${hasAnswered ? (i === question.correctOption ? "correct" : "wrong") : ""}`}
                    disabled={hasAnswered}
                    onClick={() => handleAnswer(i)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
