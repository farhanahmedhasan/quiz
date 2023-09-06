import { useEffect } from "react";

export default function Timer({ timeRemains, onCountTimer }) {
    let minutes = Math.floor(timeRemains / 60);
    let extraSeconds = timeRemains % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    useEffect(() => {
        if (!timeRemains) return;

        const timer = setInterval(() => {
            onCountTimer();
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemains, onCountTimer]);

    return (
        <p className="timer">
            {minutes}:{extraSeconds}
        </p>
    );
}
