document.addEventListener("DOMContentLoaded", function () {


  /* =========================================
     MUSIC
     ========================================= */

  const backgroundMusic =
    document.getElementById("backgroundMusic");


  function startMusic() {

    if (!backgroundMusic) {
      return;
    }

    backgroundMusic.volume = 0.55;

    const playPromise =
      backgroundMusic.play();

    if (playPromise !== undefined) {

      playPromise.catch(function () {

        console.log(
          "Music will start after another user interaction."
        );

      });

    }

  }



  /* =========================================
     SCENE SYSTEM
     ========================================= */

  const scenes = {

    opening:
      document.getElementById("scene-opening"),

    introduction:
      document.getElementById("scene-introduction"),

    photo:
      document.getElementById("scene-photo"),

    platformGame:
      document.getElementById("scene-platform-game"),

    cake:
      document.getElementById("scene-cake"),

    message:
      document.getElementById("scene-message"),

    bible:
      document.getElementById("scene-bible"),

    final:
      document.getElementById("scene-final")

  };


  function showScene(sceneName) {

    Object.keys(scenes).forEach(function (name) {

      if (!scenes[name]) {
        return;
      }

      scenes[name].classList.add("hidden");
      scenes[name].classList.remove("active");

    });


    const selectedScene =
      scenes[sceneName];

    if (!selectedScene) {
      return;
    }


    selectedScene.classList.remove("hidden");
    selectedScene.classList.add("active");

  }



  /* =========================================
     OPENING
     ========================================= */

  const startAdventureButton =
    document.getElementById(
      "startAdventureButton"
    );


  if (startAdventureButton) {

    startAdventureButton.addEventListener(
      "click",
      function () {

        startMusic();

        showScene("introduction");

      }
    );

  }



  /* =========================================
     INTRODUCTION
     ========================================= */

  const introductionContinueButton =
    document.getElementById(
      "introductionContinueButton"
    );


  if (introductionContinueButton) {

    introductionContinueButton.addEventListener(
      "click",
      function () {

        showScene("photo");

      }
    );

  }



  /* =========================================
     PHOTO
     ========================================= */

  const photoContinueButton =
    document.getElementById(
      "photoContinueButton"
    );


  if (photoContinueButton) {

    photoContinueButton.addEventListener(
      "click",
      function () {

        showScene("platformGame");

        startPlatformGame();

      }
    );

  }



  /* =========================================
     PLATFORM GAME
     ========================================= */

  const gameWorld =
    document.getElementById("gameWorld");

  const chihuahua =
    document.getElementById("chihuahua");

  const shibainu =
    document.getElementById("shibainu");

  const gameMessage =
    document.getElementById("gameMessage");

  const gameScore =
    document.getElementById("gameScore");


  const leftButton =
    document.getElementById("leftButton");

  const rightButton =
    document.getElementById("rightButton");

  const jumpButton =
    document.getElementById("jumpButton");



  /* =========================================
     GAME SETTINGS
     ========================================= */

  const WORLD_WIDTH = 5000;

  const GRAVITY = 0.65;

  const MOVE_SPEED = 5.2;

  const JUMP_POWER = 13.5;


  let playerX = 120;

  let playerY = 28;

  let velocityY = 0;

  let cameraX = 0;

  let movingLeft = false;

  let movingRight = false;

  let jumping = false;

  let gameStarted = false;

  let gameFinished = false;

  let animationFrame;



  /* =========================================
     SCORE
     ========================================= */

  function updateScore() {

    if (gameScore) {

      gameScore.textContent =
        "200.806";

    }

  }



  /* =========================================
     START GAME
     ========================================= */

  function startPlatformGame() {

    if (gameStarted) {
      return;
    }

    gameStarted = true;

    gameFinished = false;

    playerX = 120;

    playerY = 28;

    velocityY = 0;

    cameraX = 0;


    if (gameMessage) {

      gameMessage.textContent =
        "Walk right ➡ and jump over the platforms.";

    }


    updateScore();

    positionPlayer();

    gameLoop();

  }



  /* =========================================
     PLAYER POSITION
     ========================================= */

  function positionPlayer() {

    if (!chihuahua) {
      return;
    }


    chihuahua.style.left =
      playerX + "px";

    chihuahua.style.bottom =
      playerY + "px";


    if (shibainu) {

      shibainu.style.bottom =
        "28px";

    }

  }



  /* =========================================
     CAMERA
     ========================================= */

  function updateCamera() {

    const screenWidth =
      window.innerWidth;


    const targetCamera =
      playerX -
      screenWidth * 0.35;


    cameraX =
      Math.max(
        0,
        Math.min(
          targetCamera,
          WORLD_WIDTH - screenWidth
        )
      );


    if (gameWorld) {

      gameWorld.style.transform =
        "translateX(" +
        (-cameraX) +
        "px)";

    }

  }



  /* =========================================
     PLATFORM COLLISION
     ========================================= */

  function getPlatforms() {

    if (!gameWorld) {
      return [];
    }

    return Array.from(
      gameWorld.querySelectorAll(
        ".platform"
      )
    );

  }



  function checkGroundCollision() {

    const playerWidth = 55;

    const playerLeft =
      playerX;

    const playerRight =
      playerX + playerWidth;


    let landed = false;


    getPlatforms().forEach(
      function (platform) {

        const platformLeft =
          parseFloat(
            platform.style.left
          ) || 0;


        const platformBottom =
          parseFloat(
            platform.style.bottom
          ) || 0;


        const platformWidth =
          parseFloat(
            platform.style.width
          ) || platform.offsetWidth;


        const platformTop =
          platformBottom +
          28;


        const platformRight =
          platformLeft +
          platformWidth;


        const playerBottom =
          playerY;


        const playerTop =
          playerY + 65;


        const horizontalCollision =
          playerRight > platformLeft &&
          playerLeft < platformRight;


        const falling =
          velocityY <= 0;


        const verticalCollision =
          playerBottom <= platformTop &&
          playerBottom >=
            platformTop - 20;


        if (
          horizontalCollision &&
          falling &&
          verticalCollision
        ) {

          playerY =
            platformTop;

          velocityY = 0;

          landed = true;

        }

      }
    );


    return landed;

  }



  /* =========================================
     JUMP
     ========================================= */

  function jump() {

    if (!gameStarted || gameFinished) {
      return;
    }


    const onGround =
      playerY <= 30;


    if (!onGround) {
      return;
    }


    velocityY =
      JUMP_POWER;

    jumping = true;

  }



  /* =========================================
     MOVEMENT
     ========================================= */

  function movePlayer() {

    if (movingLeft) {

      playerX -=
        MOVE_SPEED;

    }


    if (movingRight) {

      playerX +=
        MOVE_SPEED;

    }


    playerX =
      Math.max(
        0,
        Math.min(
          playerX,
          WORLD_WIDTH - 80
        )
      );

  }



  /* =========================================
     GRAVITY
     ========================================= */

  function applyGravity() {

    velocityY -= GRAVITY;

    playerY += velocityY;


    const landed =
      checkGroundCollision();


    if (!landed && playerY < 28) {

      playerY = 28;

      velocityY = 0;

      jumping = false;

    }


    if (landed) {

      jumping = false;

    }

  }



  /* =========================================
     REACH SHIBAINU
     ========================================= */

  function checkFinish() {

    if (!shibainu) {
      return;
    }


    const shibainuX =
      parseFloat(
        shibainu.style.left
      ) || 4500;


    const distance =
      Math.abs(
        playerX - shibainuX
      );


    if (
      distance < 85 &&
      !gameFinished
    ) {

      finishGame();

    }

  }



  function finishGame() {

    gameFinished = true;

    movingLeft = false;

    movingRight = false;


    if (gameMessage) {

      gameMessage.textContent =
        "You found Shibainu.";

    }


    setTimeout(
      function () {

        showScene("cake");

      },
      900
    );

  }



  /* =========================================
     GAME LOOP
     ========================================= */

  function gameLoop() {

    if (!gameStarted) {
      return;
    }


    if (!gameFinished) {

      movePlayer();

      applyGravity();

      updateCamera();

      positionPlayer();

      checkFinish();

    }


    animationFrame =
      requestAnimationFrame(
        gameLoop
      );

  }



  /* =========================================
     KEYBOARD CONTROLS
     ========================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (!gameStarted || gameFinished) {
        return;
      }


      if (
        event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a"
      ) {

        movingLeft = true;

      }


      if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
      ) {

        movingRight = true;

      }


      if (
        event.key === "ArrowUp" ||
        event.key === " " ||
        event.key.toLowerCase() === "w"
      ) {

        event.preventDefault();

        jump();

      }

    }
  );



  document.addEventListener(
    "keyup",
    function (event) {

      if (
        event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a"
      ) {

        movingLeft = false;

      }


      if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
      ) {

        movingRight = false;

      }

    }
  );



  /* =========================================
     MOBILE LEFT BUTTON
     ========================================= */

  function startMovingLeft(event) {

    event.preventDefault();

    movingLeft = true;

  }


  function stopMovingLeft(event) {

    event.preventDefault();

    movingLeft = false;

  }


  if (leftButton) {

    leftButton.addEventListener(
      "touchstart",
      startMovingLeft,
      { passive: false }
    );


    leftButton.addEventListener(
      "touchend",
      stopMovingLeft,
      { passive: false }
    );


    leftButton.addEventListener(
      "touchcancel",
      stopMovingLeft,
      { passive: false }
    );


    leftButton.addEventListener(
      "mousedown",
      startMovingLeft
    );


    leftButton.addEventListener(
      "mouseup",
      stopMovingLeft
    );


    leftButton.addEventListener(
      "mouseleave",
      stopMovingLeft
    );

  }



  /* =========================================
     MOBILE RIGHT BUTTON
     ========================================= */

  function startMovingRight(event) {

    event.preventDefault();

    movingRight = true;

  }


  function stopMovingRight(event) {

    event.preventDefault();

    movingRight = false;

  }


  if (rightButton) {

    rightButton.addEventListener(
      "touchstart",
      startMovingRight,
      { passive: false }
    );


    rightButton.addEventListener(
      "touchend",
      stopMovingRight,
      { passive: false }
    );


    rightButton.addEventListener(
      "touchcancel",
      stopMovingRight,
      { passive: false }
    );


    rightButton.addEventListener(
      "mousedown",
      startMovingRight
    );


    rightButton.addEventListener(
      "mouseup",
      stopMovingRight
    );


    rightButton.addEventListener(
      "mouseleave",
      stopMovingRight
    );

  }



  /* =========================================
     JUMP BUTTON
     ========================================= */

  if (jumpButton) {

    jumpButton.addEventListener(
      "touchstart",
      function (event) {

        event.preventDefault();

        jump();

      },
      { passive: false }
    );


    jumpButton.addEventListener(
      "click",
      function () {

        jump();

      }
    );

  }



  /* =========================================
     CAKE → MESSAGE
     ========================================= */

  const birthdayMessageButton =
    document.getElementById(
      "birthdayMessageButton"
    );


  if (birthdayMessageButton) {

    birthdayMessageButton.addEventListener(
      "click",
      function () {

        showScene("message");

      }
    );

  }



  /* =========================================
     MESSAGE → BIBLE
     ========================================= */

  const messageContinueButton =
    document.getElementById(
      "messageContinueButton"
    );


  if (messageContinueButton) {

    messageContinueButton.addEventListener(
      "click",
      function () {

        showScene("bible");

      }
    );

  }



  /* =========================================
     BIBLE → FINAL
     ========================================= */

  const bibleContinueButton =
    document.getElementById(
      "bibleContinueButton"
    );


  if (bibleContinueButton) {

    bibleContinueButton.addEventListener(
      "click",
      function () {

        showScene("final");

      }
    );

  }



  /* =========================================
     KEEP MUSIC PLAYING
     ========================================= */

  document.addEventListener(
    "visibilitychange",
    function () {

      if (
        document.visibilityState ===
        "visible"
      ) {

        if (
          backgroundMusic &&
          backgroundMusic.paused
        ) {

          backgroundMusic.play()
            .catch(function () {});

        }

      }

    }
  );


});
