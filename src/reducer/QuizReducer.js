const quizInitStates = {
    questions: [],
    status: "loading", //"loading", "error", "ready", "active", "finished"
    curQuesIndex: 0,
    curQuesAnsIndex: null,
    points: 0,
    highScore: 0,
    timeRemains: null,
};

const SECS_PER_QUS = 30;

function quizReducer(state, action) {
    switch (action.type) {
        case "quiz/dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };

        case "quiz/dataFailed":
            return {
                ...state,
                status: "error",
            };

        case "quiz/Start":
            return {
                ...state,
                status: "active",
                timeRemains: state.questions.length * SECS_PER_QUS,
            };

        case "quiz/nextQuestion":
            return {
                ...state,
                curQuesIndex: state.curQuesIndex + 1,
                curQuesAnsIndex: null,
            };

        case "quiz/newAnswer": {
            const question = state.questions[state.curQuesIndex];
            const isCorrectAnswer = question.correctOption === action.payload;

            return {
                ...state,
                curQuesAnsIndex: action.payload,
                points: isCorrectAnswer ? state.points + question.points : state.points,
            };
        }

        case "quiz/finish": {
            const newHighScore = state.points > state.highScore ? state.points : state.highScore;

            return {
                ...state,
                status: "finished",
                highScore: newHighScore,
            };
        }

        case "quiz/restart": {
            return {
                ...state,
                status: "ready",
                points: 0,
                curQuesIndex: 0,
                curQuesAnsIndex: null,
            };
        }

        case "quiz/timer": {
            const newHighScore = state.points > state.highScore ? state.points : state.highScore;

            return {
                ...state,
                highScore: newHighScore,
                timeRemains: state.timeRemains - 1,
                status: state.timeRemains === 1 ? "finished" : "active",
            };
        }

        default:
            return state;
    }
}

export {quizInitStates, quizReducer}