export default function Question({ question, onNextQuestion, hasMoreQuestion }) {
    console.log(question);
    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
                {question.options.map((option) => (
                    <button key={option} className="btn btn-option">
                        {option}
                    </button>
                ))}
            </div>

            {hasMoreQuestion && (
                <button className="btn btn-ui" onClick={onNextQuestion}>
                    Next
                </button>
            )}
        </div>
    );
}
