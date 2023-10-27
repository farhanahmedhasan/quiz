import {useQuizContext} from "./context/QuizContext.jsx";
import Options from "./Options";

export default function Question() {
    const {questions, curQuesIndex} = useQuizContext()
    const question = questions[curQuesIndex]

    return (
        <div>
            <h4>{question.question}</h4>
            <Options />
        </div>
    );
}
