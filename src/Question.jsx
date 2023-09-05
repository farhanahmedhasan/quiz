import Options from "./Options";

export default function Question({ question, curQuesAnsIndex, onNewAnswer, onNextQuestion, hasMoreQuestion }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} curQuesAnsIndex={curQuesAnsIndex} onNewAnswer={onNewAnswer} />

            {hasMoreQuestion && curQuesAnsIndex !== null && (
                <button className="btn btn-ui" onClick={onNextQuestion}>
                    Next
                </button>
            )}
        </div>
    );
}
