import Options from "./Options";

export default function Question({ question, curQuesAnsIndex, onNewAnswer }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} curQuesAnsIndex={curQuesAnsIndex} onNewAnswer={onNewAnswer} />
        </div>
    );
}
