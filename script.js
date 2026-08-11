/* ==================================================
   BIRTHDAY GAME
   MAIN JAVASCRIPT
================================================== */


/* ==================================================
   SCENES
================================================== */

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


/* ==================================================
   BACKGROUND MUSIC
================================================== */

const backgroundMusic =
    document.getElementById("background-music");


function startMusic() {

    backgroundMusic.volume = 0.35;

    backgroundMusic.play().catch(() => {
        console.log("Music could not start automatically.");
    });
}


/* ==================================================
   SCENE 01
   OPENING
================================================== */

const beginButton =
    document.getElementById("begin-button");


beginButton.addEventListener("click", () => {

    startMusic();

    showScene(scenes.shiba);

    startShibaScene();

});


/* ==================================================
   SCENE 02
   SHIBA INU
================================================== */

const shibaMessage =
    document.getElementById("shiba-message");


function startShibaScene() {

    shibaMessage.textContent =
        "before we continue...";

    setTimeout(() => {

        showScene(scenes.personalQuiz);

        startPersonalQuiz();

    }, 3500);

}


/* ==================================================
   SCENE 03
   PERSONAL QUESTIONS
================================================== */


/*
    YOUR ORIGINAL 8 QUESTIONS
    WILL GO HERE.

    I am leaving placeholders for now
    instead of changing your original wording.
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


const personalProgressCurrent =
    document.getElementById(
        "personal-progress-current"
    );

const personalQuestionNumber =
    document.getElementById(
        "personal-question-number"
    );

const personalQuestion =
    document.getElementById(
        "personal-question"
    );

const personalAnswerArea =
    document.getElementById(
        "personal-answer-area"
    );

const personalNextButton =
    document.getElementById(
        "personal-next-button"
    );


function startPersonalQuiz() {

    personalQuestionIndex = 0;

    selectedPersonalAnswer = null;

    renderPersonalQuestion();

}


function renderPersonalQuestion() {

    const currentQuestion =
        personalQuestions[
            personalQuestionIndex
        ];


    personalProgressCurrent.textContent =
        personalQuestionIndex + 1;


    personalQuestionNumber.textContent =
        `Question ${personalQuestionIndex + 1}`;


    personalQuestion.textContent =
        currentQuestion.question;


    personalAnswerArea.innerHTML = "";


    selectedPersonalAnswer = null;


    personalNextButton.disabled = true;


    currentQuestion.answers.forEach(
        (answer, index) => {

            const answerButton =
                document.createElement("button");


            answerButton.type = "button";

            answerButton.className =
                "quiz-answer";


            answerButton.textContent =
                answer;


            answerButton.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "#personal-answer-area .quiz-answer"
                        )
                        .forEach(button => {

                            button.classList.remove(
                                "selected"
                            );

                        });


                    answerButton.classList.add(
                        "selected"
                    );


                    selectedPersonalAnswer =
                        index;


                    personalNextButton.disabled =
                        false;

                }
            );


            personalAnswerArea.appendChild(
                answerButton
            );

        }
    );

}


personalNextButton.addEventListener(
    "click",
    () => {

        if (
            selectedPersonalAnswer === null
        ) {
            return;
        }


        personalQuestionIndex++;


        if (
            personalQuestionIndex <
            personalQuestions.length
        ) {

            renderPersonalQuestion();

        } else {

            showScene(
                scenes.mbtiQuiz
            );

            startMBTIQuiz();

        }

    }
);


/* ==================================================
   SCENE 04
   MBTI TEST
================================================== */


/*
    20 QUESTIONS

    Each question measures one MBTI preference.

    E / I
    S / N
    T / F
    J / P

    The actual questions will be written properly
    before the final version.
*/

const mbtiQuestions = [

    {
        question: "MBTI QUESTION 1",
        dimension: "EI",
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
        dimension: "EI",
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
        dimension: "SN",
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
        dimension: "SN",
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
        dimension: "TF",
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
        dimension: "TF",
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
        dimension: "JP",
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
        dimension: "JP",
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
        dimension: "EI",
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
        dimension: "SN",
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
        dimension: "TF",
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
        dimension: "JP",
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
        dimension: "EI",
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
        dimension: "SN",
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
        dimension: "TF",
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
        dimension: "JP",
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
        dimension: "EI",
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
        dimension: "SN",
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
        dimension: "TF",
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
        dimension: "JP",
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

let selectedMBTIAnswer = null;


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


const mbtiProgressCurrent =
    document.getElementById(
        "mbti-progress-current"
    );

const mbtiQuestionNumber =
    document.getElementById(
        "mbti-question-number"
    );

const mbtiQuestion =
    document.getElementById(
        "mbti-question"
    );

const mbtiAnswerArea =
    document.getElementById(
        "mbti-answer-area"
    );

const mbtiNextButton =
    document.getElementById(
        "mbti-next-button"
    );


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
        mbtiQuestions[
            mbtiQuestionIndex
        ];


    mbtiProgressCurrent.textContent =
        mbtiQuestionIndex + 1;


    mbtiQuestionNumber.textContent =
        `Question ${mbtiQuestionIndex + 1} of ${mbtiQuestions.length}`;


    mbtiQuestion.textContent =
        currentQuestion.question;


    mbtiAnswerArea.innerHTML = "";


    selectedMBTIAnswer = null;

    mbtiNextButton.disabled = true;


    currentQuestion.answers.forEach(
        (answer, index) => {

            const answerButton =
                document.createElement("button");


            answerButton.type = "button";

            answerButton.className =
                "quiz-answer";


            answerButton.textContent =
                answer.text;


            answerButton.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "#mbti-answer-area .quiz-answer"
                        )
                        .forEach(button => {

                            button.classList.remove(
                                "selected"
                            );

                        });


                    answerButton.classList.add(
                        "selected"
                    );


                    selectedMBTIAnswer =
                        index;


                    mbtiNextButton.disabled =
                        false;

                }
            );


            mbtiAnswerArea.appendChild(
                answerButton
            );

        }
    );

}


mbtiNextButton.addEventListener(
    "click",
    () => {

        if (
            selectedMBTIAnswer === null
        ) {
            return;
        }


        const currentQuestion =
            mbtiQuestions[
                mbtiQuestionIndex
            ];


        const selectedAnswer =
            currentQuestion.answers[
                selectedMBTIAnswer
            ];


        mbtiScores[
            selectedAnswer.type
        ]++;


        mbtiQuestionIndex++;


        if (
            mbtiQuestionIndex <
            mbtiQuestions.length
        ) {

            renderMBTIQuestion();

        } else {

            calculateMBTIResult();

        }

    }
);


/* ==================================================
   MBTI RESULT
================================================== */

function calculateMBTIResult() {

    const type =

        (
            mbtiScores.E >= mbtiScores.I
                ? "E"
                : "I"
        )

        +

        (
            mbtiScores.S >= mbtiScores.N
                ? "S"
                : "N"
        )

        +

        (
            mbtiScores.T >= mbtiScores.F
                ? "T"
                : "F"
        )

        +

        (
            mbtiScores.J >= mbtiScores.P
                ? "J"
                : "P"
        );


    displayMBTIResult(type);

}


function displayMBTIResult(type) {

    const mbtiType =
        document.getElementById(
            "mbti-type"
        );

    const mbtiTitle =
        document.getElementById(
            "mbti-title"
        );

    const mbtiDescription =
        document.getElementById(
            "mbti-description"
        );

    const mbtiDetails =
        document.getElementById(
            "mbti-details"
        );


    const personality =
        personalityTypes[type];


    mbtiType.textContent =
        type;


    mbtiTitle.textContent =
        personality.title;


    mbtiDescription.textContent =
        personality.description;


    mbtiDetails.textContent =
        personality.details;


    showScene(
        scenes.mbtiResult
    );

}


/* ==================================================
   MBTI PERSONALITY TYPES
================================================== */

const personalityTypes = {

    ISTJ: {
        title: "The Inspector",
        description:
            "Practical, responsible, organized, and dependable.",
        details:
            "You tend to value reliability, clear expectations, and doing things properly."
    },

    ISFJ: {
        title: "The Defender",
        description:
            "Thoughtful, dependable, observant, and caring.",
        details:
            "You tend to notice details about people and show care through consistency and practical actions."
    },

    INFJ: {
        title: "The Advocate",
        description:
            "Intuitive, thoughtful, idealistic, and deeply reflective.",
        details:
            "You tend to look beneath the surface and care deeply about meaning, values, and the people close to you."
    },

    INTJ: {
        title: "The Architect",
        description:
            "Strategic, independent, analytical, and future-focused.",
        details:
            "You tend to enjoy understanding complex ideas and building plans for the future."
    },

    ISTP: {
        title: "The Virtuoso",
        description:
            "Independent, observant, practical, and adaptable.",
        details:
            "You tend to learn through experience and enjoy figuring out how things work."
    },

    ISFP: {
        title: "The Adventurer",
        description:
            "Gentle, flexible, observant, and authentic.",
        details:
            "You tend to value personal freedom, meaningful experiences, and being true to yourself."
    },

    INFP: {
        title: "The Mediator",
        description:
            "Imaginative, empathetic, reflective, and guided by personal values.",
        details:
            "You tend to care strongly about authenticity, meaning, and emotional depth."
    },

    INTP: {
        title: "The Logician",
        description:
            "Curious, analytical, independent, and inventive.",
        details:
            "You tend to enjoy exploring ideas and understanding how things connect."
    },

    ESTP: {
        title: "The Entrepreneur",
        description:
            "Energetic, practical, adaptable, and action-oriented.",
        details:
            "You tend to respond quickly to opportunities and learn through direct experience."
    },

    ESFP: {
        title: "The Entertainer",
        description:
            "Warm, energetic, spontaneous, and expressive.",
        details:
            "You tend to enjoy experiences, people, and making ordinary moments memorable."
    },

    ENFP: {
        title: "The Campaigner",
        description:
            "Curious, enthusiastic, imaginative, and people-oriented.",
        details:
            "You tend to become excited by possibilities and enjoy discovering what makes people and experiences meaningful."
    },

    ENTP: {
        title: "The Debater",
        description:
            "Inventive, curious, energetic, and intellectually playful.",
        details:
            "You tend to enjoy questioning assumptions and exploring different possibilities."
    },

    ESTJ: {
        title: "The Executive",
        description:
            "Organized, practical, direct, and responsible.",
        details:
            "You tend to value structure, efficiency, and getting things done."
    },

    ESFJ: {
        title: "The Consul",
        description:
            "Warm, social, responsible, and attentive to others.",
        details:
            "You tend to value connection, harmony, and making people feel included."
    },

    ENFJ: {
        title: "The Protagonist",
        description:
            "Warm, encouraging, organized, and people-focused.",
        details:
            "You tend to notice what others need and enjoy helping people grow."
    },

    ENTJ: {
        title: "The Commander",
        description:
            "Strategic, confident, direct, and goal-oriented.",
        details:
            "You tend to naturally organize ideas and resources around a clear objective."
    }

};


/* ==================================================
   SCENE 05 → SCENE 06
================================================== */

const birthdayEndingButton =
    document.getElementById(
        "birthday-ending-button"
    );


birthdayEndingButton.addEventListener(
    "click",
    () => {

        showScene(
            scenes.birthdayWishes
        );

    }
);


/* ==================================================
   FINAL BIRTHDAY WISHES
================================================== */

const wishesText =
    document.getElementById(
        "wishes-text"
    );


wishesText.textContent =
    "Your birthday wishes will go here.";


/* ==================================================
   INITIAL STATE
================================================== */

showScene(
    scenes.opening
);
