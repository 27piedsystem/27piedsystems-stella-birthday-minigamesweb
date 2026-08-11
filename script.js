/* =========================================
   BIRTHDAY GAME — MAIN JAVASCRIPT
========================================= */


/* =========================================
   SCENES
========================================= */

const scenes = {
    opening: document.getElementById("opening"),
    shiba: document.getElementById("shiba-scene"),
    personalQuiz: document.getElementById("personal-quiz"),
    mbtiQuiz: document.getElementById("mbti-quiz"),
    mbtiResult: document.getElementById("mbti-result"),
    birthdayWishes: document.getElementById("birthday-wishes")
};


function showScene(scene) {

    Object.values(scenes).forEach(currentScene => {
        currentScene.classList.remove("active");
    });

    scene.classList.add("active");
}


/* =========================================
   BACKGROUND MUSIC
========================================= */

const backgroundMusic =
    document.getElementById("background-music");


function startMusic() {

    backgroundMusic.volume = 0.35;

    backgroundMusic.play().catch(() => {
        /*
         * Some browsers require the user
         * to interact with the page first.
         *
         * The music is started from the
         * Begin button below.
         */
    });
}


/* =========================================
   SCENE 1 — OPENING
========================================= */

const beginButton =
    document.getElementById("begin-button");


beginButton.addEventListener("click", () => {

    startMusic();

    showScene(scenes.shiba);

    startShibaScene();

});


/* =========================================
   SCENE 2 — SHIBA INU
========================================= */

function startShibaScene() {

    const shibaMessage =
        document.getElementById("shiba-message");

    shibaMessage.textContent =
        "Before we continue...";

    /*
     * The Shiba Inu character will be created
     * here later using SVG/code.
     */

}


/*
 * Temporary timing for moving from
 * the Shiba scene to the personal quiz.
 */

let shibaTimerStarted = false;


function continueFromShiba() {

    if (shibaTimerStarted) {
        return;
    }

    shibaTimerStarted = true;

    setTimeout(() => {

        showScene(scenes.personalQuiz);

        startPersonalQuiz();

    }, 3500);

}


/*
 * Start the timer after entering
 * the Shiba scene.
 */

const originalStartShibaScene = startShibaScene;

startShibaScene = function () {

    originalStartShibaScene();

    continueFromShiba();

};


/* =========================================
   SCENE 3 — PERSONAL QUESTIONS
========================================= */


/*
 * YOUR 8 PERSONAL QUESTIONS
 *
 * We will put your exact questions here.
 *
 * Do not change them yet.
 */

const personalQuestions = [

    {
        question: "PERSONAL QUESTION 1",
        answers: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ]
    },

    {
        question: "PERSONAL QUESTION 2",
        answers: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ]
    },

    {
        question: "PERSONAL QUESTION 3",
        answers: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ]
    },

    {
        question: "PERSONAL QUESTION 4",
        answers: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ]
    },

    {
        question: "PERSONAL QUESTION 5",
        answers: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ]
    },

    {
        question: "PERSONAL QUESTION 6",
        answers: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ]
    },

    {
        question: "PERSONAL QUESTION 7",
        answers: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ]
    },

    {
        question: "PERSONAL QUESTION 8",
        answers: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ]
    }

];


let personalQuestionIndex = 0;

let selectedPersonalAnswer = null;

const personalQuestionNumber =
    document.getElementById("personal-question-number");

const personalQuestion =
    document.getElementById("personal-question");

const personalAnswerArea =
    document.getElementById("personal-answer-area");

const personalNextButton =
    document.getElementById("personal-next-button");


function startPersonalQuiz() {

    personalQuestionIndex = 0;

    selectedPersonalAnswer = null;

    renderPersonalQuestion();

}


function renderPersonalQuestion() {

    const currentQuestion =
        personalQuestions[personalQuestionIndex];

    personalQuestionNumber.textContent =
        `Question ${personalQuestionIndex + 1} of ${personalQuestions.length}`;

    personalQuestion.textContent =
        currentQuestion.question;

    personalAnswerArea.innerHTML = "";

    selectedPersonalAnswer = null;

    personalNextButton.classList.remove("enabled");


    currentQuestion.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "quiz-answer";

        button.textContent = answer;

        button.addEventListener("click", () => {

            document
                .querySelectorAll("#personal-answer-area .quiz-answer")
                .forEach(answerButton => {
                    answerButton.classList.remove("selected");
                });

            button.classList.add("selected");

            selectedPersonalAnswer = index;

            personalNextButton.classList.add("enabled");

        });

        personalAnswerArea.appendChild(button);

    });

}


personalNextButton.addEventListener("click", () => {

    if (selectedPersonalAnswer === null) {
        return;
    }

    personalQuestionIndex++;

    if (personalQuestionIndex < personalQuestions.length) {

        renderPersonalQuestion();

    } else {

        showScene(scenes.mbtiQuiz);

        startMBTIQuiz();

    }

});


/* =========================================
   SCENE 4 — MBTI TEST
========================================= */


/*
 * 20 REAL MBTI-STYLE QUESTIONS
 *
 * Each answer will contribute to one
 * of the four MBTI dimensions.
 *
 * We will replace the placeholder questions
 * with the properly written questions next.
 */

const mbtiQuestions = [

    {
        question: "MBTI QUESTION 1",
        answers: [
            {
                text: "Option A",
                type: "E"
            },
            {
                text: "Option B",
                type: "I"
            }
        ]
    },

    {
        question: "MBTI QUESTION 2",
        answers: [
            {
                text: "Option A",
                type: "E"
            },
            {
                text: "Option B",
                type: "I"
            }
        ]
    },

    {
        question: "MBTI QUESTION 3",
        answers: [
            {
                text: "Option A",
                type: "S"
            },
            {
                text: "Option B",
                type: "N"
            }
        ]
    },

    {
        question: "MBTI QUESTION 4",
        answers: [
            {
                text: "Option A",
                type: "S"
            },
            {
                text: "Option B",
                type: "N"
            }
        ]
    },

    {
        question: "MBTI QUESTION 5",
        answers: [
            {
                text: "Option A",
                type: "T"
            },
            {
                text: "Option B",
                type: "F"
            }
        ]
    },

    {
        question: "MBTI QUESTION 6",
        answers: [
            {
                text: "Option A",
                type: "T"
            },
            {
                text: "Option B",
                type: "F"
            }
        ]
    },

    {
        question: "MBTI QUESTION 7",
        answers: [
            {
                text: "Option A",
                type: "J"
            },
            {
                text: "Option B",
                type: "P"
            }
        ]
    },

    {
        question: "MBTI QUESTION 8",
        answers: [
            {
                text: "Option A",
                type: "J"
            },
            {
                text: "Option B",
                type: "P"
            }
        ]
    },

    {
        question: "MBTI QUESTION 9",
        answers: [
            {
                text: "Option A",
                type: "E"
            },
            {
                text: "Option B",
                type: "I"
            }
        ]
    },

    {
        question: "MBTI QUESTION 10",
        answers: [
            {
                text: "Option A",
                type: "S"
            },
            {
                text: "Option B",
                type: "N"
            }
        ]
    },

    {
        question: "MBTI QUESTION 11",
        answers: [
            {
                text: "Option A",
                type: "T"
            },
            {
                text: "Option B",
                type: "F"
            }
        ]
    },

    {
        question: "MBTI QUESTION 12",
        answers: [
            {
                text: "Option A",
                type: "J"
            },
            {
                text: "Option B",
                type: "P"
            }
        ]
    },

    {
        question: "MBTI QUESTION 13",
        answers: [
            {
                text: "Option A",
                type: "E"
            },
            {
                text: "Option B",
                type: "I"
            }
        ]
    },

    {
        question: "MBTI QUESTION 14",
        answers: [
            {
                text: "Option A",
                type: "S"
            },
            {
                text: "Option B",
                type: "N"
            }
        ]
    },

    {
        question: "MBTI QUESTION 15",
        answers: [
            {
                text: "Option A",
                type: "T"
            },
            {
                text: "Option B",
                type: "F"
            }
        ]
    },

    {
        question: "MBTI QUESTION 16",
        answers: [
            {
                text: "Option A",
                type: "J"
            },
            {
                text: "Option B",
                type: "P"
            }
        ]
    },

    {
        question: "MBTI QUESTION 17",
        answers: [
            {
                text: "Option A",
                type: "E"
            },
            {
                text: "Option B",
                type: "I"
            }
        ]
    },

    {
        question: "MBTI QUESTION 18",
        answers: [
            {
                text: "Option A",
                type: "S"
            },
            {
                text: "Option B",
                type: "N"
            }
        ]
    },

    {
        question: "MBTI QUESTION 19",
        answers: [
            {
                text: "Option A",
                type: "T"
            },
            {
                text: "Option B",
                type: "F"
            }
        ]
    },

    {
        question: "MBTI QUESTION 20",
        answers: [
            {
                text: "Option A",
                type: "J"
            },
            {
                text: "Option B",
                type: "P"
            }
        ]
    }

];


let mbtiQuestionIndex = 0;

let mbtiScores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
};

let selectedMBTIAnswer = null;


const mbtiQuestionNumber =
    document.getElementById("mbti-question-number");

const mbtiQuestion =
    document.getElementById("mbti-question");

const mbtiAnswerArea =
    document.getElementById("mbti-answer-area");

const mbtiNextButton =
    document.getElementById("mbti-next-button");


function startMBTIQuiz() {

    mbtiQuestionIndex = 0;

    selectedMBTIAnswer = null;

    mbtiScores = {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0
    };

    renderMBTIQuestion();

}


function renderMBTIQuestion() {

    const currentQuestion =
        mbtiQuestions[mbtiQuestionIndex];

    mbtiQuestionNumber.textContent =
        `Question ${mbtiQuestionIndex + 1} of ${mbtiQuestions.length}`;

    mbtiQuestion.textContent =
        currentQuestion.question;

    mbtiAnswerArea.innerHTML = "";

    selectedMBTIAnswer = null;

    mbtiNextButton.classList.remove("enabled");


    currentQuestion.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "quiz-answer";

        button.textContent = answer.text;

        button.addEventListener("click", () => {

            document
                .querySelectorAll("#mbti-answer-area .quiz-answer")
                .forEach(answerButton => {
                    answerButton.classList.remove("selected");
                });

            button.classList.add("selected");

            selectedMBTIAnswer = index;

            mbtiNextButton.classList.add("enabled");

        });

        mbtiAnswerArea.appendChild(button);

    });

}


mbtiNextButton.addEventListener("click", () => {

    if (selectedMBTIAnswer === null) {
        return;
    }

    const currentQuestion =
        mbtiQuestions[mbtiQuestionIndex];

    const selectedAnswer =
        currentQuestion.answers[selectedMBTIAnswer];

    mbtiScores[selectedAnswer.type]++;

    mbtiQuestionIndex++;


    if (mbtiQuestionIndex < mbtiQuestions.length) {

        renderMBTIQuestion();

    } else {

        calculateMBTIResult();

    }

});


/* =========================================
   MBTI RESULT
========================================= */

function calculateMBTIResult() {

    const type =
        (mbtiScores.E >= mbtiScores.I ? "E" : "I") +
        (mbtiScores.S >= mbtiScores.N ? "S" : "N") +
        (mbtiScores.T >= mbtiScores.F ? "T" : "F") +
        (mbtiScores.J >= mbtiScores.P ? "J" : "P");


    displayMBTIResult(type);

}


function displayMBTIResult(type) {

    const mbtiType =
        document.getElementById("mbti-type");

    const mbtiTitle =
        document.getElementById("mbti-title");

    const mbtiDescription =
        document.getElementById("mbti-description");

    const mbtiDetails =
        document.getElementById("mbti-details");


    const personality =
        personalityTypes[type];


    mbtiType.textContent = type;

    mbtiTitle.textContent =
        personality.title;

    mbtiDescription.textContent =
        personality.description;

    mbtiDetails.innerHTML =
        personality.details;


    showScene(scenes.mbtiResult);

}


/* =========================================
   MBTI PERSONALITY DATA
========================================= */


/*
 * The full 16-type personality descriptions
 * will be added after we finish the actual
 * question scoring.
 */

const personalityTypes = {

    INFJ: {
        title: "The Advocate",
        description:
            "Thoughtful, intuitive, and deeply guided by personal meaning.",
        details:
            "You tend to look beneath the surface, care deeply about what matters to you, and think carefully about the people around you."
    },

    INFP: {
        title: "The Mediator",
        description:
            "Imaginative, thoughtful, and guided by personal values.",
        details:
            "You tend to value authenticity, meaning, and emotional depth."
    },

    ENFP: {
        title: "The Campaigner",
        description:
            "Curious, enthusiastic, imaginative, and people-oriented.",
        details:
            "You tend to become excited by possibilities and enjoy discovering what makes people and experiences meaningful."
    },

    ENFJ: {
        title: "The Protagonist",
        description:
            "Warm, encouraging, organized, and attentive to people.",
        details:
            "You tend to notice what others need and enjoy helping people move toward something meaningful."
    },

    ISFP: {
        title: "The Adventurer",
        description:
            "Gentle, observant, flexible, and strongly connected to experience.",
        details:
            "You tend to appreciate beauty, personal freedom, and authentic experiences."
    },

    ESFP: {
        title: "The Entertainer",
        description:
            "Energetic, spontaneous, warm, and engaged with the present.",
        details:
            "You tend to bring energy into experiences and enjoy making moments memorable."
    },

    ISFJ: {
        title: "The Defender",
        description:
            "Reliable, considerate, observant, and caring.",
        details:
            "You tend to remember details about people and show care through practical actions."
    },

    ESFJ: {
        title: "The Consul",
        description:
            "Warm, social, responsible, and attentive to others.",
        details:
            "You tend to value harmony, connection, and making people feel included."
    },

    INTJ: {
        title: "The Architect",
        description:
            "Independent, strategic, analytical, and future-focused.",
        details:
            "You tend to enjoy understanding complex systems and building long-term plans."
    },

    INTP: {
        title: "The Logician",
        description:
            "Curious, analytical, independent, and interested in how things work.",
        details:
            "You tend to explore ideas deeply and enjoy solving problems from different angles."
    },

    ENTJ: {
        title: "The Commander",
        description:
            "Direct, strategic, confident, and goal-oriented.",
        details:
            "You tend to naturally organize ideas and people around a clear objective."
    },

    ENTP: {
        title: "The Debater",
        description:
            "Curious, inventive, energetic, and intellectually playful.",
        details:
            "You tend to enjoy exploring possibilities, questioning assumptions, and discovering better ideas."
    },

    ISTJ: {
        title: "The Logistician",
        description:
            "Practical, dependable, organized, and detail-oriented.",
        details:
            "You tend to value consistency, responsibility, and clear expectations."
    },

    ESTJ: {
        title: "The Executive",
        description:
            "Organized, practical, direct, and responsible.",
        details:
            "You tend to prefer clear structures, practical solutions, and getting things done."
    },

    ISTP: {
        title: "The Virtuoso",
        description:
            "Independent, practical, observant, and adaptable.",
        details:
            "You tend to enjoy understanding how things work and solving problems directly."
    },

    ESTP: {
        title: "The Entrepreneur",
        description:
            "Energetic, adaptable, practical, and action-oriented.",
        details:
            "You tend to learn through experience and enjoy responding to opportunities as they appear."
    }

};


/* =========================================
   SCENE 5 — RESULT → WISHES
========================================= */

const birthdayEndingButton =
    document.getElementById("birthday-ending-button");


birthdayEndingButton.addEventListener("click", () => {

    showScene(scenes.birthdayWishes);

});


/* =========================================
   FINAL BIRTHDAY WISHES
========================================= */


/*
 * YOUR LONG BIRTHDAY MESSAGE
 *
 * We will put your exact final wishes here.
 */

const wishesText =
    document.getElementById("wishes-text");


wishesText.textContent =
    "Your birthday wishes will go here.";


/* =========================================
   INITIAL STATE
========================================= */

showScene(scenes.opening);
