/* =========================================================
   HAPPY BIRTHDAY, STELLA
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   SCENES
========================================================= */

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


/* =========================================================
   MUSIC
========================================================= */

const backgroundMusic =
    document.getElementById("background-music");


function startMusic() {

    backgroundMusic.volume = 0.35;

    const playPromise =
        backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {
            console.log(
                "Music will start after browser permission."
            );
        });

    }
}


/* =========================================================
   OPENING
========================================================= */

const beginButton =
    document.getElementById("begin-button");


beginButton.addEventListener("click", () => {

    startMusic();

    showScene(scenes.shiba);

    startShibaScene();

});


/* =========================================================
   SHIBA SCENE
========================================================= */

const shibaMessage =
    document.getElementById("shiba-message");


function startShibaScene() {

    shibaMessage.textContent =
        "before we continue...";


    setTimeout(() => {

        shibaMessage.textContent =
            "there's something i want you to discover about yourself.";


    }, 1800);


    setTimeout(() => {

        showScene(
            scenes.personalQuiz
        );

        startPersonalQuiz();

    }, 4200);

}


/* =========================================================
   PERSONAL QUESTIONS
========================================================= */

/*
    IMPORTANT

    These are intentionally kept as the personal-question
    structure only.

    Your exact original 8 questions should be inserted here
    without changing your wording.
*/

const personalQuestions = [

    {
        question:
            "What’s the best wish you have for your birthday this year?",
        answers: [
            "Something for my future",
            "Something for the people I love",
            "Something I want to achieve",
            "Something unexpected"
        ]
    },

    {
        question:
            "What’s your motivation after turning 20?",
        answers: [
            "Becoming better than yesterday",
            "Building my future",
            "Making the people I love proud",
            "Finding more happiness"
        ]
    },

    {
        question:
            "What does turning 20 mean to you?",
        answers: [
            "A completely new chapter",
            "More freedom",
            "More responsibility",
            "I still feel like myself"
        ]
    },

    {
        question:
            "How much do you think your Leo personality describes you?",
        answers: [
            "Very accurately",
            "Somewhat accurately",
            "Only sometimes",
            "Not really"
        ]
    },

    {
        question:
            "Which zodiac energy do you enjoy being around the most?",
        answers: [
            "Fire",
            "Earth",
            "Air",
            "Water"
        ]
    },

    {
        question:
            "What kind of memory makes you happiest?",
        answers: [
            "A moment with someone I love",
            "A personal achievement",
            "A completely spontaneous moment",
            "A peaceful moment by myself"
        ]
    },

    {
        question:
            "If this year suddenly became your luckiest year ever, what would you do first?",
        answers: [
            "Travel somewhere",
            "Buy something I've always wanted",
            "Build something for my future",
            "Spend it with someone special"
        ]
    },

    {
        question:
            "How well do you think you know your partner?",
        answers: [
            "I know him extremely well",
            "Pretty well",
            "He still surprises me",
            "Let's see..."
        ]
    }

];


let personalQuestionIndex = 0;

let personalAnswers = [];


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

    personalAnswers = [];

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


    personalNextButton.disabled =
        true;


    currentQuestion.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className =
                "quiz-answer";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "#personal-answer-area .quiz-answer"
                        )
                        .forEach(
                            currentButton => {

                                currentButton.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    personalAnswers[
                        personalQuestionIndex
                    ] = index;


                    personalNextButton.disabled =
                        false;

                }
            );


            personalAnswerArea.appendChild(
                button
            );

        }
    );

}


personalNextButton.addEventListener(
    "click",
    () => {

        if (
            personalAnswers[
                personalQuestionIndex
            ] === undefined
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


/* =========================================================
   MBTI TEST
========================================================= */

/*
    This is a REAL preference-based MBTI-style scoring system.

    E / I
    S / N
    T / F
    J / P

    Each answer contributes to one side of a dimension.

    We do NOT simply assign a personality based on one
    question or randomly choose a type.
*/


const mbtiQuestions = [

    /* ---------- E / I ---------- */

    {
        question:
            "After spending a lot of time around people, you usually...",
        answers: [
            {
                text: "Feel energized and want to keep socializing.",
                type: "E"
            },
            {
                text: "Need some quiet time to recharge.",
                type: "I"
            }
        ]
    },

    {
        question:
            "When you meet someone new, you usually...",
        answers: [
            {
                text: "Start talking naturally and get to know them.",
                type: "E"
            },
            {
                text: "Observe them first before opening up.",
                type: "I"
            }
        ]
    },

    {
        question:
            "When something exciting happens, your first instinct is to...",
        answers: [
            {
                text: "Tell someone about it.",
                type: "E"
            },
            {
                text: "Process the feeling privately first.",
                type: "I"
            }
        ]
    },

    {
        question:
            "For a free weekend, you'd rather...",
        answers: [
            {
                text: "Make plans and spend time with people.",
                type: "E"
            },
            {
                text: "Have plenty of personal time.",
                type: "I"
            }
        ]
    },


    /* ---------- S / N ---------- */

    {
        question:
            "When learning something new, you prefer...",
        answers: [
            {
                text: "Real examples and practical details.",
                type: "S"
            },
            {
                text: "The bigger idea and possibilities behind it.",
                type: "N"
            }
        ]
    },

    {
        question:
            "When remembering an event, you tend to remember...",
        answers: [
            {
                text: "Specific things that happened.",
                type: "S"
            },
            {
                text: "The overall feeling and meaning.",
                type: "N"
            }
        ]
    },

    {
        question:
            "When someone explains a problem to you, you usually focus on...",
        answers: [
            {
                text: "What actually happened and what can be done.",
                type: "S"
            },
            {
                text: "What might be behind it and where it could lead.",
                type: "N"
            }
        ]
    },

    {
        question:
            "You are generally more interested in...",
        answers: [
            {
                text: "What is happening right now.",
                type: "S"
            },
            {
                text: "What could happen in the future.",
                type: "N"
            }
        ]
    },


    /* ---------- T / F ---------- */

    {
        question:
            "When making an important decision, you usually trust...",
        answers: [
            {
                text: "Logic and objective reasoning.",
                type: "T"
            },
            {
                text: "Your values and how people will feel.",
                type: "F"
            }
        ]
    },

    {
        question:
            "If a friend asks for advice, you are more likely to...",
        answers: [
            {
                text: "Help them analyze the situation.",
                type: "T"
            },
            {
                text: "Make sure they feel understood first.",
                type: "F"
            }
        ]
    },

    {
        question:
            "During an argument, what matters more to you?",
        answers: [
            {
                text: "Finding out what is logically correct.",
                type: "T"
            },
            {
                text: "Protecting the relationship and feelings involved.",
                type: "F"
            }
        ]
    },

    {
        question:
            "When giving criticism, you usually...",
        answers: [
            {
                text: "Focus directly on what needs improvement.",
                type: "T"
            },
            {
                text: "Think carefully about how the person will receive it.",
                type: "F"
            }
        ]
    },


    /* ---------- J / P ---------- */

    {
        question:
            "When you have an important task, you prefer to...",
        answers: [
            {
                text: "Plan it and finish it early.",
                type: "J"
            },
            {
                text: "Keep your options open and work when inspiration comes.",
                type: "P"
            }
        ]
    },

    {
        question:
            "A sudden change of plans usually makes you feel...",
        answers: [
            {
                text: "A little uncomfortable because you had a plan.",
                type: "J"
            },
            {
                text: "Fine because you can adapt.",
                type: "P"
            }
        ]
    },

    {
        question:
            "Your ideal daily routine is...",
        answers: [
            {
                text: "Structured and predictable.",
                type: "J"
            },
            {
                text: "Flexible and spontaneous.",
                type: "P"
            }
        ]
    },

    {
        question:
            "When preparing for a trip, you usually...",
        answers: [
            {
                text: "Plan the important details beforehand.",
                type: "J"
            },
            {
                text: "Figure things out as you go.",
                type: "P"
            }
        ]
    },


    /* ---------- BALANCING QUESTIONS ---------- */

    {
        question:
            "When you're overwhelmed, you usually want to...",
        answers: [
            {
                text: "Talk it through with someone.",
                type: "E"
            },
            {
                text: "Be alone and sort it out yourself.",
                type: "I"
            }
        ]
    },

    {
        question:
            "When imagining your future, you think more about...",
        answers: [
            {
                text: "Practical steps that could actually happen.",
                type: "S"
            },
            {
                text: "Different possibilities and what life could become.",
                type: "N"
            }
        ]
    },

    {
        question:
            "If two choices are equally logical, you would usually choose the one...",
        answers: [
            {
                text: "That makes the most objective sense.",
                type: "T"
            },
            {
                text: "That feels most right to you personally.",
                type: "F"
            }
        ]
    },

    {
        question:
            "If you suddenly have a completely free day, you would rather...",
        answers: [
            {
                text: "Know roughly what you're going to do.",
                type: "J"
            },
            {
                text: "Wake up and decide as the day happens.",
                type: "P"
            }
        ]
    }

];


let mbtiQuestionIndex = 0;

let mbtiAnswers = [];


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

    mbtiAnswers = [];


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


    mbtiNextButton.disabled =
        true;


    currentQuestion.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className =
                "quiz-answer";


            button.textContent =
                answer.text;


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "#mbti-answer-area .quiz-answer"
                        )
                        .forEach(
                            currentButton => {

                                currentButton.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    mbtiAnswers[
                        mbtiQuestionIndex
                    ] = answer.type;


                    mbtiNextButton.disabled =
                        false;

                }
            );


            mbtiAnswerArea.appendChild(
                button
            );

        }
    );

}


mbtiNextButton.addEventListener(
    "click",
    () => {

        const selectedType =
            mbtiAnswers[
                mbtiQuestionIndex
            ];


        if (!selectedType) {
            return;
        }


        mbtiScores[
            selectedType
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


/* =========================================================
   CALCULATE MBTI
========================================================= */

function calculateMBTIResult() {

    const EI =
        mbtiScores.E >= mbtiScores.I
            ? "E"
            : "I";


    const SN =
        mbtiScores.S >= mbtiScores.N
            ? "S"
            : "N";


    const TF =
        mbtiScores.T >= mbtiScores.F
            ? "T"
            : "F";


    const JP =
        mbtiScores.J >= mbtiScores.P
            ? "J"
            : "P";


    const result =
        EI + SN + TF + JP;


    displayMBTIResult(result);

}


/* =========================================================
   PERSONALITY INFORMATION
========================================================= */

const personalityTypes = {

    ISTJ: {
        title: "The Inspector",
        description:
            "Practical, responsible, organized, and dependable.",
        details:
            "You tend to value reliability, clear expectations, consistency, and doing things properly."
    },

    ISFJ: {
        title: "The Defender",
        description:
            "Warm, responsible, observant, and deeply considerate.",
        details:
            "You tend to notice details about the people around you and show care through dependable actions."
    },

    INFJ: {
        title: "The Advocate",
        description:
            "Intuitive, thoughtful, idealistic, and reflective.",
        details:
            "You tend to look beneath the surface and care strongly about meaning, values, and the people close to you."
    },

    INTJ: {
        title: "The Architect",
        description:
            "Strategic, independent, analytical, and future-focused.",
        details:
            "You tend to enjoy understanding complex ideas and creating long-term plans."
    },

    ISTP: {
        title: "The Virtuoso",
        description:
            "Independent, observant, practical, and adaptable.",
        details:
            "You tend to learn through experience and enjoy understanding how things work."
    },

    ISFP: {
        title: "The Adventurer",
        description:
            "Gentle, flexible, observant, and authentic.",
        details:
            "You tend to value freedom, meaningful experiences, and staying true to yourself."
    },

    INFP: {
        title: "The Mediator",
        description:
            "Imaginative, empathetic, reflective, and values-driven.",
        details:
            "You tend to care deeply about authenticity, personal meaning, and emotional connection."
    },

    INTP: {
        title: "The Logician",
        description:
            "Curious, analytical, independent, and inventive.",
        details:
            "You tend to enjoy exploring ideas, solving problems, and understanding how things connect."
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
            "Warm, expressive, spontaneous, and energetic.",
        details:
            "You tend to enjoy experiences, people, and making ordinary moments memorable."
    },

    ENFP: {
        title: "The Campaigner",
        description:
            "Curious, enthusiastic, imaginative, and open-minded.",
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
            "You tend to value structure, efficiency, responsibility, and getting things done."
    },

    ESFJ: {
        title: "The Consul",
        description:
            "Warm, social, responsible, and attentive.",
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
            "You tend to organize ideas and resources around clear goals and long-term objectives."
    }

};


/* =========================================================
   DISPLAY RESULT
========================================================= */

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


/* =========================================================
   RESULT → FINAL WISHES
========================================================= */

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


/* =========================================================
   FINAL WISHES
========================================================= */

/*
    Your actual long birthday message goes here.

    We will put your original text here instead of
    inventing a replacement.
*/

const wishesText =
    document.getElementById(
        "wishes-text"
    );


wishesText.textContent =
    "Your birthday wishes will be added here.";


/* =========================================================
   START
========================================================= */

showScene(
    scenes.opening
);
