const scenes = {
    opening: document.getElementById("opening"),
    personalQuiz: document.getElementById("personal-quiz"),
    mbtiQuiz: document.getElementById("mbti-quiz"),
    secondPhoto: document.getElementById("second-photo"),
    mbtiResult: document.getElementById("mbti-result"),
    shiba: document.getElementById("shiba-scene"),
    wishes: document.getElementById("birthday-wishes")
};

function showScene(scene) {
    Object.values(scenes).forEach(item => {
        item.classList.remove("active");
    });

    scene.classList.add("active");
}


/* MUSIC */

const music = document.getElementById("background-music");

function startMusic() {
    if (!music) return;

    music.volume = 0.35;

    music.play().catch(() => {
        console.log("Music could not autoplay.");
    });
}


/* OPENING */

const beginButton = document.getElementById("begin-button");

beginButton.addEventListener("click", () => {
    startMusic();

    showScene(scenes.personalQuiz);

    startPersonalQuiz();
});


/* PERSONAL QUESTIONS */

const personalQuestions = [
    {
        question: "what’s the best wish you have for your birthday this year?",
        answers: [
            "something for my future",
            "something for the people i love",
            "something i want to achieve",
            "something unexpected"
        ]
    },

    {
        question: "what’s your motivation after turning 20?",
        answers: [
            "becoming better than yesterday",
            "building my future",
            "making the people i love proud",
            "finding more happiness"
        ]
    },

    {
        question: "what are you most excited to experience in this new chapter?",
        answers: [
            "more freedom",
            "new experiences",
            "building my future",
            "discovering more about myself"
        ]
    },

    {
        question: "you’re a leo and a fire sign. how much do you think it matches your personality?",
        answers: [
            "almost exactly",
            "a lot of it is me",
            "only some parts",
            "not really"
        ]
    },

    {
        question: "what kind of moment makes you feel happiest?",
        answers: [
            "being with someone i love",
            "achieving something important",
            "trying something new",
            "having peaceful time alone"
        ]
    },

    {
        question: "when life doesn't go according to plan, what do you usually do?",
        answers: [
            "make another plan",
            "take some time to think",
            "ask someone i trust",
            "just go with whatever happens"
        ]
    },

    {
        question: "what is something you want your 20s to be remembered for?",
        answers: [
            "growth",
            "adventure",
            "love",
            "success"
        ]
    },

    {
        question: "how well do you think your partner understands you?",
        answers: [
            "he knows me extremely well",
            "he knows me pretty well",
            "he still has a lot to discover",
            "let's see what he thinks"
        ]
    }
];

let personalIndex = 0;
let personalAnswers = [];

const personalQuestion =
    document.getElementById("personal-question");

const personalQuestionNumber =
    document.getElementById("personal-question-number");

const personalProgress =
    document.getElementById("personal-progress-current");

const personalAnswerArea =
    document.getElementById("personal-answer-area");

const personalNextButton =
    document.getElementById("personal-next-button");


function startPersonalQuiz() {
    personalIndex = 0;
    personalAnswers = [];

    renderPersonalQuestion();
}


function renderPersonalQuestion() {
    const current = personalQuestions[personalIndex];

    personalQuestionNumber.textContent =
        `question ${personalIndex + 1}`;

    personalProgress.textContent =
        personalIndex + 1;

    personalQuestion.textContent =
        current.question;

    personalAnswerArea.innerHTML = "";

    personalNextButton.disabled = true;

    current.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "quiz-answer";
        button.type = "button";
        button.textContent = answer;

        button.addEventListener("click", () => {

            document
                .querySelectorAll(
                    "#personal-answer-area .quiz-answer"
                )
                .forEach(currentButton => {
                    currentButton.classList.remove("selected");
                });

            button.classList.add("selected");

            personalAnswers[personalIndex] = index;

            personalNextButton.disabled = false;
        });

        personalAnswerArea.appendChild(button);
    });
}


personalNextButton.addEventListener("click", () => {

    if (
        personalAnswers[personalIndex] === undefined
    ) {
        return;
    }

    personalIndex++;

    if (
        personalIndex < personalQuestions.length
    ) {

        renderPersonalQuestion();

    } else {

        showScene(scenes.mbtiQuiz);

        startMBTIQuiz();
    }
});


/* =====================================================
   MBTI QUESTIONS
===================================================== */

const mbtiQuestions = [

    {
        question: "after spending a lot of time around people, you usually...",
        answers: [
            {
                text: "feel energized and want to keep socializing",
                type: "E"
            },
            {
                text: "need quiet time to recharge",
                type: "I"
            }
        ]
    },

    {
        question: "when you meet someone new, you usually...",
        answers: [
            {
                text: "start talking naturally",
                type: "E"
            },
            {
                text: "observe them before opening up",
                type: "I"
            }
        ]
    },

    {
        question: "when something exciting happens, you usually...",
        answers: [
            {
                text: "tell someone about it immediately",
                type: "E"
            },
            {
                text: "process it privately first",
                type: "I"
            }
        ]
    },

    {
        question: "your ideal weekend is usually...",
        answers: [
            {
                text: "making plans and being around people",
                type: "E"
            },
            {
                text: "having personal time and doing your own thing",
                type: "I"
            }
        ]
    },

    {
        question: "when learning something new, you prefer...",
        answers: [
            {
                text: "real examples and practical details",
                type: "S"
            },
            {
                text: "the bigger idea and possibilities",
                type: "N"
            }
        ]
    },

    {
        question: "when remembering an event, you usually remember...",
        answers: [
            {
                text: "specific details of what happened",
                type: "S"
            },
            {
                text: "the overall feeling and meaning",
                type: "N"
            }
        ]
    },

    {
        question: "when someone explains a problem, you focus more on...",
        answers: [
            {
                text: "what actually happened",
                type: "S"
            },
            {
                text: "what might be behind it",
                type: "N"
            }
        ]
    },

    {
        question: "you are generally more interested in...",
        answers: [
            {
                text: "what is happening right now",
                type: "S"
            },
            {
                text: "what could happen in the future",
                type: "N"
            }
        ]
    },

    {
        question: "when making an important decision, you usually trust...",
        answers: [
            {
                text: "logic and objective reasoning",
                type: "T"
            },
            {
                text: "your values and how people will feel",
                type: "F"
            }
        ]
    },

    {
        question: "when a friend asks for advice, you usually...",
        answers: [
            {
                text: "help analyze the problem",
                type: "T"
            },
            {
                text: "make sure they feel understood first",
                type: "F"
            }
        ]
    },

    {
        question: "during an argument, what matters more to you?",
        answers: [
            {
                text: "finding what is logically correct",
                type: "T"
            },
            {
                text: "protecting the relationship and feelings",
                type: "F"
            }
        ]
    },

    {
        question: "when giving criticism, you usually...",
        answers: [
            {
                text: "focus directly on what needs improvement",
                type: "T"
            },
            {
                text: "think carefully about how they will receive it",
                type: "F"
            }
        ]
    },

    {
        question: "when you have an important task, you prefer to...",
        answers: [
            {
                text: "plan it and finish it early",
                type: "J"
            },
            {
                text: "keep your options open",
                type: "P"
            }
        ]
    },

    {
        question: "a sudden change of plans usually makes you feel...",
        answers: [
            {
                text: "uncomfortable because you had a plan",
                type: "J"
            },
            {
                text: "fine because you can adapt",
                type: "P"
            }
        ]
    },

    {
        question: "your ideal daily routine is...",
        answers: [
            {
                text: "structured and predictable",
                type: "J"
            },
            {
                text: "flexible and spontaneous",
                type: "P"
            }
        ]
    },

    {
        question: "when preparing for a trip, you usually...",
        answers: [
            {
                text: "plan important details beforehand",
                type: "J"
            },
            {
                text: "figure things out as you go",
                type: "P"
            }
        ]
    },

    {
        question: "when you're overwhelmed, you usually want to...",
        answers: [
            {
                text: "talk it through with someone",
                type: "E"
            },
            {
                text: "be alone and sort it out yourself",
                type: "I"
            }
        ]
    },

    {
        question: "when imagining your future, you think more about...",
        answers: [
            {
                text: "practical steps that could happen",
                type: "S"
            },
            {
                text: "different possibilities",
                type: "N"
            }
        ]
    },

    {
        question: "if two choices are equally logical, you would choose the one...",
        answers: [
            {
                text: "that makes the most objective sense",
                type: "T"
            },
            {
                text: "that feels most right personally",
                type: "F"
            }
        ]
    },

    {
        question: "if you suddenly have a completely free day, you would rather...",
        answers: [
            {
                text: "know roughly what you're going to do",
                type: "J"
            },
            {
                text: "decide as the day happens",
                type: "P"
            }
        ]
    }

];


let mbtiIndex = 0;

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


const mbtiQuestion =
    document.getElementById("mbti-question");

const mbtiQuestionNumber =
    document.getElementById("mbti-question-number");

const mbtiProgress =
    document.getElementById("mbti-progress-current");

const mbtiAnswerArea =
    document.getElementById("mbti-answer-area");

const mbtiNextButton =
    document.getElementById("mbti-next-button");


function startMBTIQuiz() {

    mbtiIndex = 0;

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

    const current =
        mbtiQuestions[mbtiIndex];

    mbtiQuestionNumber.textContent =
        `question ${mbtiIndex + 1} of 20`;

    mbtiProgress.textContent =
        mbtiIndex + 1;

    mbtiQuestion.textContent =
        current.question;

    mbtiAnswerArea.innerHTML = "";

    delete mbtiAnswerArea.dataset.selected;

    mbtiNextButton.disabled = true;

    current.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className = "quiz-answer";

        button.type = "button";

        button.textContent =
            answer.text;

        button.addEventListener("click", () => {

            document
                .querySelectorAll(
                    "#mbti-answer-area .quiz-answer"
                )
                .forEach(currentButton => {

                    currentButton.classList.remove(
                        "selected"
                    );

                });

            button.classList.add("selected");

            mbtiAnswerArea.dataset.selected =
                answer.type;

            mbtiNextButton.disabled = false;
        });

        mbtiAnswerArea.appendChild(button);
    });
}


mbtiNextButton.addEventListener("click", () => {

    const selected =
        mbtiAnswerArea.dataset.selected;

    if (!selected) {
        return;
    }

    mbtiScores[selected]++;

    mbtiIndex++;

    /*
       QUESTION 20 FINISHED
       ↓
       STELLA PHOTO 2
       ↓
       MBTI RESULT
    */

    if (
        mbtiIndex < mbtiQuestions.length
    ) {

        renderMBTIQuestion();

    } else {

        showScene(
            scenes.secondPhoto
        );
    }
});


/* =====================================================
   PHOTO 2 → MBTI RESULT
===================================================== */

const photoContinueButton =
    document.getElementById(
        "photo-continue-button"
    );


photoContinueButton.addEventListener(
    "click",
    () => {

        calculateMBTI();

    }
);


function calculateMBTI() {

    const first =
        mbtiScores.E >= mbtiScores.I
            ? "E"
            : "I";

    const second =
        mbtiScores.S >= mbtiScores.N
            ? "S"
            : "N";

    const third =
        mbtiScores.T >= mbtiScores.F
            ? "T"
            : "F";

    const fourth =
        mbtiScores.J >= mbtiScores.P
            ? "J"
            : "P";

    const type =
        first +
        second +
        third +
        fourth;

    showMBTIResult(type);
}


/* =====================================================
   MBTI RESULTS
===================================================== */

const personalityTypes = {

    ISTJ: {
        title: "The Inspector",
        description:
            "practical, responsible, organized, and dependable.",
        details:
            "you tend to value reliability, consistency, clear expectations, and doing things properly."
    },

    ISFJ: {
        title: "The Defender",
        description:
            "warm, responsible, observant, and considerate.",
        details:
            "you tend to notice details about people and show care through dependable actions."
    },

    INFJ: {
        title: "The Advocate",
        description:
            "intuitive, thoughtful, idealistic, and reflective.",
        details:
            "you tend to look beneath the surface and care strongly about meaning, values, and people close to you."
    },

    INTJ: {
        title: "The Architect",
        description:
            "strategic, independent, analytical, and future-focused.",
        details:
            "you tend to enjoy understanding complex ideas and creating long-term plans."
    },

    ISTP: {
        title: "The Virtuoso",
        description:
            "independent, observant, practical, and adaptable.",
        details:
            "you tend to learn through experience and enjoy understanding how things work."
    },

    ISFP: {
        title: "The Adventurer",
        description:
            "gentle, flexible, observant, and authentic.",
        details:
            "you tend to value freedom, meaningful experiences, and staying true to yourself."
    },

    INFP: {
        title: "The Mediator",
        description:
            "imaginative, empathetic, reflective, and values-driven.",
        details:
            "you tend to care deeply about authenticity, personal meaning, and emotional connection."
    },

    INTP: {
        title: "The Logician",
        description:
            "curious, analytical, independent, and inventive.",
        details:
            "you tend to enjoy exploring ideas, solving problems, and understanding how things connect."
    },

    ESTP: {
        title: "The Entrepreneur",
        description:
            "energetic, practical, adaptable, and action-oriented.",
        details:
            "you tend to respond quickly to opportunities and learn through direct experience."
    },

    ESFP: {
        title: "The Entertainer",
        description:
            "warm, expressive, spontaneous, and energetic.",
        details:
            "you tend to enjoy experiences, people, and making ordinary moments memorable."
    },

    ENFP: {
        title: "The Campaigner",
        description:
            "curious, enthusiastic, imaginative, and open-minded.",
        details:
            "you tend to become excited by possibilities and enjoy discovering what makes people and experiences meaningful."
    },

    ENTP: {
        title: "The Debater",
        description:
            "inventive, curious, energetic, and intellectually playful.",
        details:
            "you tend to enjoy questioning assumptions and exploring different possibilities."
    },

    ESTJ: {
        title: "The Executive",
        description:
            "organized, practical, direct, and responsible.",
        details:
            "you tend to value structure, efficiency, responsibility, and getting things done."
    },

    ESFJ: {
        title: "The Consul",
        description:
            "warm, social, responsible, and attentive.",
        details:
            "you tend to value connection, harmony, and making people feel included."
    },

    ENFJ: {
        title: "The Protagonist",
        description:
            "warm, encouraging, organized, and people-focused.",
        details:
            "you tend to notice what others need and enjoy helping people grow."
    },

    ENTJ: {
        title: "The Commander",
        description:
            "strategic, confident, direct, and goal-oriented.",
        details:
            "you tend to organize ideas and resources around clear goals and long-term objectives."
    }

};


function showMBTIResult(type) {

    const personality =
        personalityTypes[type];

    document.getElementById(
        "mbti-type"
    ).textContent = type;

    document.getElementById(
        "mbti-title"
    ).textContent =
        personality.title;

    document.getElementById(
        "mbti-description"
    ).textContent =
        personality.description;

    document.getElementById(
        "mbti-details"
    ).textContent =
        personality.details;

    showScene(
        scenes.mbtiResult
    );
}


/* =====================================================
   RESULT → SHIBA
===================================================== */

const resultContinueButton =
    document.getElementById(
        "result-continue-button"
    );


resultContinueButton.addEventListener(
    "click",
    () => {

        showScene(
            scenes.shiba
        );

    }
);


/* =====================================================
   SHIBA → WISHES
===================================================== */

const wishesButton =
    document.getElementById(
        "wishes-button"
    );


wishesButton.addEventListener(
    "click",
    () => {

        showScene(
            scenes.wishes
        );

    }
);


/* =====================================================
   FINAL WISHES
===================================================== */

const wishesText =
    document.getElementById(
        "wishes-text"
    );


wishesText.textContent = `happy birthday, stella halim

my chihuahua,

you’re 20 now, and i just want to leave you with some words for this new part of your life. getting older means there are more things to think about, more decisions to make, and sometimes you just have to figure things out on your own. life doesn’t always give you a clear answer, and that’s okay.

i hope you don’t put too much pressure on yourself to have everything figured out already. you’re still learning. you’re still finding out what you like, what you don’t like, what you want, and what kind of person you want to become. there’s nothing wrong with changing your mind along the way. life isn’t something you have to understand all at once.

you’re going to make mistakes, and some of them might hurt. some decisions won’t turn out the way you expected, and sometimes you’ll work hard for something and still not get it. when that happens, don’t let it make you think you’re not good enough. take the lesson, accept what happened, and keep going. you don’t have to be perfect to move forward.

there will also be times when you look at other people and feel like they’re already ahead of you. maybe they have a better job, more money, a clearer future, or they seem like they already know what they’re doing. don’t let that make you feel like you’re behind. everyone has their own timing, and honestly, most people are still figuring things out too. you don’t have to compete with anyone. just focus on building your own life.

as you get older, learning how to stand on your own becomes important. learn how to make your own decisions, take responsibility when you’re wrong, know when to say no, and know when something isn’t good for you anymore. you don’t always have to explain yourself to everyone. sometimes you just need to know what’s right for you and have the courage to follow it.

and don’t think being strong means you can’t be tired or confused. you’re allowed to have bad days. you’re allowed to feel lost sometimes. you’re allowed to take a break when things become too much. being strong doesn’t mean pretending everything is okay. sometimes being strong is simply getting yourself back up and continuing after a difficult day.

there’s one bible verse i wanted to leave here because i think it’s simple and fits life really well.

ecclesiastes 3:1

to everything there is a season, and a time to every purpose under the heaven.

life really does have different seasons. sometimes things will be good, sometimes things will be difficult, and sometimes nothing will seem to make sense. but none of those moments last forever. you’ll grow, things will change, and you’ll understand some things later that you can’t understand right now.

so my chihuahua, take your time. don’t rush yourself just because you think you should already know what you’re doing. learn things properly, make mistakes, try again, work for what you want, and don’t be afraid to start over when something isn’t right.

there are still so many things you haven’t experienced yet. there are places you haven’t seen, things you haven’t learned, and parts of yourself you haven’t discovered yet. you don’t need to know exactly where everything is going. just keep moving and keep becoming better in your own way.

when life gets difficult, don’t forget that one bad day is just one bad day. one mistake is just one mistake. one failure doesn’t decide what your whole life is going to be.

i hope you grow into someone who is strong but still kind, independent but still knows when to listen, confident but still humble, and someone who can look back at herself and know that she didn’t give up when things got hard.

that’s all from your shibainu.
i love you 2in1, and it’s always be.`;
