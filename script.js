document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("backgroundMusic");
  const scenes = document.querySelectorAll(".game-scene");
  function showScene(id) {
    scenes.forEach(function (scene) {
      scene.hidden = true;
      scene.classList.remove("active-scene");
    });
    const nextScene = document.getElementById(id);
    if (nextScene) {
      nextScene.hidden = false;
      nextScene.classList.add("active-scene");
      window.scrollTo(0, 0);
    }
  }
  /* MUSIC */
  function startMusic() {
    if (!music) return;
    music.volume = 0.35;
    music.play().catch(function () {
      console.log("Music could not start automatically.");
    });
  }
  /* OPENING */
  document
    .getElementById("startAdventureButton")
    .addEventListener("click", function () {
      startMusic();
      showScene("scene-introduction");
    });
  /* INTRODUCTION */
  document
    .getElementById("introductionContinueButton")
    .addEventListener("click", function () {
      showScene("scene-photo-one");
    });
  /* PHOTO ONE */
  document
    .getElementById("photoOneContinueButton")
    .addEventListener("click", function () {
      showScene("scene-photo-two");
    });
  /* PHOTO TWO */
  document
    .getElementById("photoTwoContinueButton")
    .addEventListener("click", function () {
      showScene("scene-quest-map");
    });
  /* QUEST DATA */
  const quests = {
    1: {
      question: "When is Stella's birthday?",
      answers: [
        "8 August",
        "20 August",
        "8 September"
      ],
      correct: 0
    },
    2: {
      question: "How old is Stella?",
      answers: [
        "18",
        "19",
        "20"
      ],
      correct: 2
    },
    3: {
      question: "What nickname is used in this adventure?",
      answers: [
        "Chihuahua",
        "Panda",
        "Turtle"
      ],
      correct: 0
    },
    4: {
      question: "What number is being celebrated?",
      answers: [
        "18",
        "20",
        "25"
      ],
      correct: 1
    },
    5: {
      question: "What should you do when something isn't right?",
      answers: [
        "Ignore it",
        "Keep trying",
        "Give up"
      ],
      correct: 1
    },
    6: {
      question: "What number appears throughout this adventure?",
      answers: [
        "10",
        "20",
        "30"
      ],
      correct: 1
    },
    7: {
      question: "What are you allowed to do when life becomes difficult?",
      answers: [
        "Take a break",
        "Give up",
        "Pretend everything is fine"
      ],
      correct: 0
    },
    8: {
      question: "What should you keep doing?",
      answers: [
        "Keep learning and becoming yourself",
        "Compare yourself with everyone",
        "Rush everything"
      ],
      correct: 0
    }
  };
  function setupQuest(number) {
    const quest = quests[number];
    const question =
      document.getElementById("quest" + number + "Question");
    const answers =
      document.getElementById("quest" + number + "Answers");
    const feedback =
      document.getElementById("quest" + number + "Feedback");
    question.textContent = quest.question;
    answers.innerHTML = "";
    feedback.textContent = "";
    quest.answers.forEach(function (answer, index) {
      const button = document.createElement("button");
      button.className = "answer-button";
      button.type = "button";
      button.textContent = answer;
      button.addEventListener("click", function () {
        if (index === quest.correct) {
          feedback.textContent = "Correct! ❤️";
          const next = number + 1;
          setTimeout(function () {
            if (next <= 8) {
              const nextButton =
                document.getElementById(
                  "questMapButton" + next
                );
              if (nextButton) {
                nextButton.disabled = false;
              }
              showScene("scene-quest-" + next);
              setupQuest(next);
            } else {
              showScene("scene-mini-game");
            }
          }, 700);
        } else {
          feedback.textContent =
            "Not quite. Try again.";
        }
      });
      answers.appendChild(button);
    });
  }
  /* QUEST MAP */
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
  let score = 0;
  let gameRunning = false;
  let gameTimer = null;
  const startMiniGameButton =
    document.getElementById("startMiniGameButton");
  const restartMiniGameButton =
    document.getElementById("restartMiniGameButton");
  const jumpButton =
    document.getElementById("jumpButton");
  const gameCharacter =
    document.getElementById("gameCharacter");
  const gameScore =
    document.getElementById("gameScore");
  const miniGameMessage =
    document.getElementById("miniGameMessage");
  function jump() {
    if (!gameCharacter) return;
    gameCharacter.classList.remove("jumping");
    void gameCharacter.offsetWidth;
    gameCharacter.classList.add("jumping");
  }
  if (jumpButton) {
    jumpButton.addEventListener("click", jump);
  }
  function startMiniGame() {
    score = 0;
    gameRunning = true;
    if (startMiniGameButton) {
      startMiniGameButton.hidden = true;
    }
    if (restartMiniGameButton) {
      restartMiniGameButton.hidden = true;
    }
    if (miniGameMessage) {
      miniGameMessage.textContent = "";
    }
    clearInterval(gameTimer);
    gameTimer = setInterval(function () {
      score += 0.1004;
      if (gameScore) {
        gameScore.textContent =
          "Score: " + score.toFixed(4);
      }
      if (score >= 20.0806) {
        clearInterval(gameTimer);
        gameRunning = false;
        if (miniGameMessage) {
          miniGameMessage.textContent =
            "You did it!";
        }
        unlockGifts();
        setTimeout(function () {
          showScene("scene-gifts");
        }, 1200);
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
      }
    }
  }
  const giftMessages = {
    1: "For all the little moments that made me smile.",
    2: "For all the memories we already have.",
    3: "For every weird and funny moment.",
    4: "For your twentieth year.",
    5: "For the person you're becoming.",
    6: "For every difficult day you get through.",
    7: "For everything you haven't discovered yet.",
    8: "Your story is still just beginning."
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
        number.textContent =
          "Gift " + String(i).padStart(2, "0");
        title.textContent =
          "A little something for you.";
        message.textContent =
          giftMessages[i];
        showScene("scene-gift-message");
      });
    }
  }
  /* CLOSE GIFT */
  document
    .getElementById("closeGiftButton")
    .addEventListener("click", function () {
      showScene("scene-gifts");
    });
  /* BIRTHDAY MESSAGE */
  document
    .getElementById("messagePageOneButton")
    .addEventListener("click", function () {
      showScene("scene-message-two");
    });
  document
    .getElementById("messagePageTwoButton")
    .addEventListener("click", function () {
      showScene("scene-bible-verse");
    });
  document
    .getElementById("bibleVerseContinueButton")
    .addEventListener("click", function () {
      showScene("scene-final");
    });
  /* START */
  showScene("scene-opening");
});
