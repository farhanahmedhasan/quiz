import {quizInitStates, quizReducer} from "../reducer/QuizReducer.js";
import {createContext, useContext, useEffect, useMemo, useReducer} from "react";

const QuizContext = createContext(null)

function QuizProvider({children}){
    const [{questions,status,curQuesIndex,curQuesAnsIndex,points,highScore,timeRemains}, dispatch] = useReducer(quizReducer, quizInitStates)

    const hasMoreQuestion = questions.length > curQuesIndex + 1;
    const totalPoints = useMemo(() => questions.reduce((acc, cur) => acc + cur.points, 0), [questions]);

    async function fetchQuestions() {
        try {
            const res = await fetch("http://localhost:3000/questions");
            const data = await res.json();

            if (!res.ok) {
                return dispatch({ type: "quiz/dataFailed" });
            }

            dispatch({ type: "quiz/dataReceived", payload: data });
        } catch (error) {
            console.log(error);
            dispatch({ type: "quiz/dataFailed" });
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    return(
        <QuizContext.Provider value={{
            questions,
            status,
            curQuesIndex,
            curQuesAnsIndex,
            points,
            highScore,
            timeRemains,
            totalPoints,
            hasMoreQuestion,
            dispatch,
        }}
        >
            {children}
        </QuizContext.Provider>
    )
}

function useQuizContext(){
    const values = useContext(QuizContext)
    if(values === undefined) throw new Error("QuizContext must be used inside QuizProvider")
    return values
}

export {useQuizContext, QuizProvider}

