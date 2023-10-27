import {useCallback, useEffect} from "react";
import {useQuizContext} from "./context/QuizContext.jsx";

export default function Timer() {
    const {timeRemains, dispatch} = useQuizContext()


    const handleTimer = useCallback(() => {
            dispatch({ type: "quiz/timer" });
    }, [dispatch]);



    let minutes = Math.floor(timeRemains / 60);
    let extraSeconds = timeRemains % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    useEffect(() => {
        if (!timeRemains) return;

        const timer = setInterval(() => {
            handleTimer();
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemains, handleTimer]);

    return (
        <p className="timer">
            {minutes}:{extraSeconds}
        </p>
    );
}
