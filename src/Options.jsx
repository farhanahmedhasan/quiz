export default function Options({ question, curQuesAnsIndex, onNewAnswer }) {
    const hasAnswered = curQuesAnsIndex !== null;

    function handleAnswer(i) {
        onNewAnswer(i);
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
