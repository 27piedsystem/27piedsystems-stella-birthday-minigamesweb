document.addEventListener("DOMContentLoaded", function () {

  const scenes = document.querySelectorAll(".game-scene");

  function showScene(sceneId) {
    scenes.forEach(function (scene) {
      scene.hidden = true;
      scene.classList.remove("active-scene");
    });

    const scene = document.getElementById(sceneId);

    if (scene) {
      scene.hidden = false;
      scene.classList.add("active-scene");
      window.scrollTo(0, 0);
    }
  }


  /* MUSIC */

  const music = document.getElementById("backgroundMusic");

  function playMusic() {
    if (!music) return;

    music.volume = 0.35;

    music.play().catch(function () {
      console.log("Music waiting for browser permission.");
    });
  }


  /* OPENING */

  const startButton =
    document.getElementById("startAdventureButton");

  if (startButton) {

    startButton.addEventListener("click", function () {

      playMusic();

      showScene("scene-introduction");

    });

  }


  /* INTRODUCTION */

  const introductionButton =
    document.getElementById("introductionContinueButton");

  if (introductionButton) {

    introductionButton.addEventListener("click", function () {

      showScene("scene-photo-one");

    });

  }


  /* PHOTO ONE */

  const photoOneButton =
    document.getElementById("photoOneContinueButton");

  if (photoOneButton) {

    photoOneButton.addEventListener("click", function () {

      showScene("scene-photo-two");

    });

  }


  /* PHOTO TWO */

  const photoTwoButton =
    document.getElementById("photoTwoContinueButton");

  if (photoTwoButton) {

    photoTwoButton.addEventListener("click", function () {

      showScene("scene-quest-map");

    });

  }


  /* QUESTS */

  const quests = {

    1: {
      question: "What is Stella's birthday?",
      answers: ["8 August", "20 August", "8 September"],
      correct: 0
    },

    2: {
      question: "How old is Stella now?",
      answers: ["18", "19", "20"],
      correct: 2
    },

    3: {
      question: "What nickname appears throughout this adventure?",
      answers: ["Chihuahua", "Turtle", "Panda"],
      correct: 0
    },

    4: {
      question: "What number is celebrated in this adventure?",
      answers: ["18", "20", "25"],
      correct: 1
    },

    5: {
      question: "What should you do when something isn't right?",
      answers: [
        "Ignore it",
        "Keep trying to make it right",
        "Give up immediately"
      ],
      correct: 1
    },

    6: {
      question: "What birthday number appears throughout the adventure?",
      answers: ["10", "20", "30"],
      correct: 1
    },

    7: {
      question: "What are you allowed to do when life becomes difficult?",
      answers: [
        "Take a break",
        "Give up",
        "Pretend nothing happened"
      ],
      correct: 0
    },

    8: {
      question: "What should you keep doing?",
      answers: [
        "Keep learning and becoming yourself",
        "Compare yourself to everyone",
        "Rush everything"
      ],
      correct: 0
    }

  };


  function setupQuest(number) {

    const quest = quests[number];

    if (!quest) return;

    const question =
      document.getElementById("quest" + number + "Question");

    const answers =
      document.getElementById("quest" + number + "Answers");

    const feedback =
      document.getElementById("quest" + number + "Feedback");

    if (!question || !answers || !feedback) return;

    question.textContent = quest.question;

    answers.innerHTML = "";

    feedback.textContent = "";

    quest.answers.forEach(function (answer, index) {

      const button = document.createElement("button");

      button.type = "button";
      button.className = "answer-button";
      button.textContent = answer;

      button.addEventListener("click", function () {

        if (index === quest.correct) {

          feedback.textContent = "Correct! ❤️";

          const nextQuest = number + 1;

          setTimeout(function () {

            if (nextQuest <= 8) {

              const nextMapButton =
                document.getElementById(
                  "questMapButton" + nextQuest
                );

              if (nextMapButton) {
                nextMapButton.disabled = false;
                nextMapButton.classList.remove("locked");
              }

              showScene("scene-quest-" + nextQuest);

              setupQuest(nextQuest);

            } else {

              showScene("scene-mini-game");

            }

          }, 700);

        } else {

          feedback.textContent = "Not quite. Try again!";

        }

      });

      answers.appendChild(button);

    });

  }


  /* QUEST MAP BUTTONS */

  for (let i = 1; i <= 8; i++) {

    const button =
      document.getElementById("questMapButton" + i);

    if (button) {

      button.addEventListener("click", function () {

        showScene("scene-quest-" + i);

        setupQuest(i);

      });

    }

  }


  /* MINI GAME */

  const startMiniGameButton =
    document.getElementById("startMiniGameButton");

  const jumpButton =
    document.getElementById("jumpButton");

  const restartMiniGameButton =
    document.getElementById("restartMiniGameButton");

  const gameScore =
    document.getElementById("gameScore");

  const miniGameMessage =
    document.getElementById("miniGameMessage");


  let running = false;
  let score = 0;
  let timer;


  if (jumpButton) {

    jumpButton.addEventListener("click", function () {

      const character =
        document.getElementById("gameCharacter");

      if (character) {

        character.classList.add("jumping");

        setTimeout(function () {

          character.classList.remove("jumping");

        }, 500);

      }

    });

  }


  function startMiniGame() {

    running = true;
    score = 0;

    if (startMiniGameButton) {
      startMiniGameButton.hidden = true;
    }

    if (restartMiniGameButton) {
      restartMiniGameButton.hidden = true;
    }

    timer = setInterval(function () {

      if (!running) return;

      score += 0.1004;

      if (gameScore) {

        gameScore.textContent =
          "Score: " + score.toFixed(4);

      }

      if (score >= 20.0806) {

        running = false;

        clearInterval(timer);

        if (miniGameMessage) {
          miniGameMessage.textContent =
            "You did it! ❤️";
        }

        setTimeout(function () {

          unlockGifts();

          showScene("scene-gifts");

        }, 1000);

      }

    }, 100);

  }


  if (startMiniGameButton) {

    startMiniGameButton.addEventListener(
      "click",
      startMiniGame
    );

  }


  if (restartMiniGameButton) {

    restartMiniGameButton.addEventListener(
      "click",
      startMiniGame
    );

  }


  /* GIFTS */

  function unlockGifts() {

    for (let i = 1; i <= 8; i++) {

      const gift =
        document.getElementById("gift" + i);

      if (gift) {

        gift.disabled = false;

        gift.classList.remove("locked");

      }

    }

  }


  const giftMessages = {

    1: "For all the little moments that made me smile.",

    2: "For the memories we already have.",

    3: "For every weird and funny moment.",

    4: "For your twentieth year.",

    5: "For the person you're still becoming.",

    6: "For every difficult day you get through.",

    7: "For everything you haven't discovered yet.",

    8: "Your story is still going."

  };


  for (let i = 1; i <= 8; i++) {

    const gift =
      document.getElementById("gift" + i);

    if (gift) {

      gift.addEventListener("click", function () {

        const number =
          document.getElementById("giftNumber");

        const title =
          document.getElementById("giftTitle");

        const message =
          document.getElementById("giftMessage");

        if (number) {
          number.textContent =
            "Gift " + String(i).padStart(2, "0");
        }

        if (title) {
          title.textContent = "A little something for you.";
        }

        if (message) {
          message.textContent = giftMessages[i];
        }

        showScene("scene-gift-message");

      });

    }

  }


  /* CLOSE GIFT */

  const closeGiftButton =
    document.getElementById("closeGiftButton");

  if (closeGiftButton) {

    closeGiftButton.addEventListener("click", function () {

      showScene("scene-gifts");

    });

  }


  /* BIRTHDAY MESSAGE */

  const messageOneButton =
    document.getElementById("messagePageOneButton");

  const messageTwoButton =
    document.getElementById("messagePageTwoButton");

  const bibleButton =
    document.getElementById("bibleVerseContinueButton");


  if (messageOneButton) {

    messageOneButton.addEventListener("click", function () {

      showScene("scene-message-two");

    });

  }


  if (messageTwoButton) {

    messageTwoButton.addEventListener("click", function () {

      showScene("scene-bible-verse");

    });

  }


  if (bibleButton) {

    bibleButton.addEventListener("click", function () {

      showScene("scene-final");

    });

  }


  /* START */

  showScene("scene-opening");

});
