import Options from "./Options";

export default function Question({ question, onNextQuestion, hasMoreQuestion }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} />

            {hasMoreQuestion && (
                <button className="btn btn-ui" onClick={onNextQuestion}>
                    Next
                </button>
            )}
        </div>
    );
}
