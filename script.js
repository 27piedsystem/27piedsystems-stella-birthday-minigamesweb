document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     SCENES
     ========================================= */

  const scenes = document.querySelectorAll(".scene");

  function showScene(id) {

    scenes.forEach(function (scene) {
      scene.classList.add("hidden");
      scene.classList.remove("active");
    });

    const scene = document.getElementById(id);

    if (scene) {
      scene.classList.remove("hidden");
      scene.classList.add("active");
      window.scrollTo(0, 0);
    }
  }


  /* =========================================
     MUSIC
     ========================================= */

  const music =
    document.getElementById("backgroundMusic");

  function startMusic() {

    if (!music) return;

    music.volume = 0.35;

    music.play().catch(function () {
      console.log("Music will start after another interaction.");
    });
  }


  /* =========================================
     OPENING
     ========================================= */

  const startAdventureButton =
    document.getElementById("startAdventureButton");

  if (startAdventureButton) {

    startAdventureButton.addEventListener("click", function () {

      startMusic();

      showScene("scene-introduction");

    });

  }


  /* =========================================
     INTRODUCTION
     ========================================= */

  const introductionContinueButton =
    document.getElementById("introductionContinueButton");

  if (introductionContinueButton) {

    introductionContinueButton.addEventListener("click", function () {

      showScene("scene-photo");

    });

  }


  /* =========================================
     PHOTO
     ========================================= */

  const photoContinueButton =
    document.getElementById("photoContinueButton");

  if (photoContinueButton) {

    photoContinueButton.addEventListener("click", function () {

      showScene("scene-platform-game");

      startGame();

    });

  }


  /* =========================================
     PLATFORM GAME
     ========================================= */

  const game =
    document.getElementById("platformGame");

  const world =
    document.getElementById("gameWorld");

  const chihuahua =
    document.getElementById("chihuahua");

  const mushroom =
    document.getElementById("magicMushroom");

  const shibainu =
    document.getElementById("shibainu");

  const cake =
    document.getElementById("birthdayCake");

  const gameMessage =
    document.getElementById("gameMessage");

  const starsDisplay =
    document.getElementById("gameStars");


  /* =========================================
     GAME VARIABLES
     ========================================= */

  let playerX = 120;
  let playerY = 28;

  let velocityX = 0;
  let velocityY = 0;

  let movingLeft = false;
  let movingRight = false;

  let jumping = false;

  let gameStarted = false;
  let gameFinished = false;

  let mushroomCollected = false;

  let starsCollected = 0;

  let cameraX = 0;

  let animationFrame;


  const gravity = 0.75;

  const moveSpeed = 4.5;

  const jumpPower = 13;


  /* =========================================
     PLAYER SIZE
     ========================================= */

  const playerWidth = 55;
  const playerHeight = 65;


  /* =========================================
     GROUND
     ========================================= */

  const groundY = 28;


  /* =========================================
     CONTROLS
     ========================================= */

  const leftButton =
    document.getElementById("leftButton");

  const rightButton =
    document.getElementById("rightButton");

  const jumpButton =
    document.getElementById("jumpButton");


  function pressLeft(event) {

    event.preventDefault();

    movingLeft = true;

  }


  function releaseLeft(event) {

    event.preventDefault();

    movingLeft = false;

  }


  function pressRight(event) {

    event.preventDefault();

    movingRight = true;

  }


  function releaseRight(event) {

    event.preventDefault();

    movingRight = false;

  }


  function pressJump(event) {

    event.preventDefault();

    jump();

  }


  if (leftButton) {

    leftButton.addEventListener(
      "touchstart",
      pressLeft,
      { passive: false }
    );

    leftButton.addEventListener(
      "touchend",
      releaseLeft,
      { passive: false }
    );

    leftButton.addEventListener(
      "mousedown",
      pressLeft
    );

    leftButton.addEventListener(
      "mouseup",
      releaseLeft
    );

  }


  if (rightButton) {

    rightButton.addEventListener(
      "touchstart",
      pressRight,
      { passive: false }
    );

    rightButton.addEventListener(
      "touchend",
      releaseRight,
      { passive: false }
    );

    rightButton.addEventListener(
      "mousedown",
      pressRight
    );

    rightButton.addEventListener(
      "mouseup",
      releaseRight
    );

  }


  if (jumpButton) {

    jumpButton.addEventListener(
      "touchstart",
      pressJump,
      { passive: false }
    );

    jumpButton.addEventListener(
      "click",
      pressJump
    );

  }


  /* =========================================
     KEYBOARD
     ========================================= */

  document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowLeft") {
      movingLeft = true;
    }

    if (event.key === "ArrowRight") {
      movingRight = true;
    }

    if (
      event.key === "ArrowUp" ||
      event.key === " " ||
      event.key === "w"
    ) {
      jump();
    }

  });


  document.addEventListener("keyup", function (event) {

    if (event.key === "ArrowLeft") {
      movingLeft = false;
    }

    if (event.key === "ArrowRight") {
      movingRight = false;
    }

  });


  /* =========================================
     JUMP
     ========================================= */

  function jump() {

    if (!gameStarted) return;

    if (gameFinished) return;

    if (!jumping) {

      velocityY = jumpPower;

      jumping = true;

    }

  }


  /* =========================================
     COLLISION HELPERS
     ========================================= */

  function touching(
    x1,
    y1,
    w1,
    h1,
    x2,
    y2,
    w2,
    h2
  ) {

    return (
      x1 < x2 + w2 &&
      x1 + w1 > x2 &&
      y1 < y2 + h2 &&
      y1 + h1 > y2
    );

  }


  /* =========================================
     PLATFORMS
     ========================================= */

  function getPlatforms() {

    return document.querySelectorAll(
      ".platform"
    );

  }


  function checkPlatforms() {

    const platforms =
      getPlatforms();

    let landed = false;

    platforms.forEach(function (platform) {

      const platformLeft =
        platform.offsetLeft;

      const platformTop =
        platform.offsetTop;

      const platformWidth =
        platform.offsetWidth;

      const platformHeight =
        platform.offsetHeight;


      const playerBottom =
        playerY + playerHeight;


      const previousBottom =
        playerBottom - velocityY;


      if (
        playerX + playerWidth > platformLeft &&
        playerX < platformLeft + platformWidth &&
        playerBottom >= platformTop &&
        previousBottom <= platformTop &&
        velocityY <= 0
      ) {

        playerY =
          platformTop - playerHeight;

        velocityY = 0;

        jumping = false;

        landed = true;

      }

    });


    if (!landed && playerY <= groundY) {

      playerY = groundY;

      velocityY = 0;

      jumping = false;

    }

  }


  /* =========================================
     MUSHROOM
     ========================================= */

  function checkMushroom() {

    if (mushroomCollected) return;

    if (!mushroom) return;


    const mushroomX =
      mushroom.offsetLeft;

    const mushroomY =
      mushroom.offsetTop;


    if (
      touching(
        playerX,
        playerY,
        playerWidth,
        playerHeight,
        mushroomX,
        mushroomY,
        60,
        60
      )
    ) {

      mushroomCollected = true;

      mushroom.style.display = "none";

      gameMessage.textContent =
        "the mushroom knows the way. keep going.";

    }

  }


  /* =========================================
     STARS
     ========================================= */

  function checkStars() {

    const collectibles =
      document.querySelectorAll(
        ".collectible"
      );


    collectibles.forEach(function (star) {

      if (star.dataset.collected === "true") {
        return;
      }


      const starX =
        star.offsetLeft;

      const starY =
        star.offsetTop;


      if (
        touching(
          playerX,
          playerY,
          playerWidth,
          playerHeight,
          starX,
          starY,
          40,
          40
        )
      ) {

        star.dataset.collected = "true";

        star.style.display = "none";

        starsCollected++;

        starsDisplay.textContent =
          "★ " + starsCollected;

      }

    });

  }


  /* =========================================
     CACTUS COLLISION
     ========================================= */

  function checkObstacles() {

    const obstacles =
      document.querySelectorAll(
        ".game-obstacle"
      );


    obstacles.forEach(function (obstacle) {

      const obstacleX =
        obstacle.offsetLeft;

      const obstacleY =
        obstacle.offsetTop;


      if (
        touching(
          playerX,
          playerY,
          playerWidth,
          playerHeight,
          obstacleX,
          obstacleY,
          50,
          60
        )
      ) {

        if (!jumping) {

          playerX -= 80;

          gameMessage.textContent =
            "careful, chihuahua. jump over it!";

        }

      }

    });

  }


  /* =========================================
     REACH SHIBAINU
     ========================================= */

  function checkFinish() {

    if (gameFinished) return;

    const shibaX =
      shibainu.offsetLeft;


    if (
      mushroomCollected &&
      playerX > shibaX - 130
    ) {

      finishGame();

    }

  }


  /* =========================================
     FINISH
     ========================================= */

  function finishGame() {

    gameFinished = true;

    movingLeft = false;

    movingRight = false;

    gameMessage.textContent =
      "you found me, chihuahua.";


    setTimeout(function () {

      showScene("scene-cake");

    }, 1800);

  }


  /* =========================================
     CAMERA
     ========================================= */

  function updateCamera() {

    if (!game) return;

    const screenWidth =
      game.clientWidth;

    const targetCamera =
      playerX - screenWidth * 0.35;


    cameraX =
      Math.max(
        0,
        Math.min(
          targetCamera,
          5000 - screenWidth
        )
      );


    world.style.transform =
      "translateX(" +
      (-cameraX) +
      "px)";

  }


  /* =========================================
     PLAYER
     ========================================= */

  function updatePlayer() {

    if (!gameStarted) return;

    if (gameFinished) return;


    velocityX = 0;


    if (movingLeft) {
      velocityX = -moveSpeed;
    }


    if (movingRight) {
      velocityX = moveSpeed;
    }


    playerX += velocityX;


    if (playerX < 0) {
      playerX = 0;
    }


    if (playerX > 4600) {
      playerX = 4600;
    }


    velocityY -= gravity;

    playerY += velocityY;


    checkPlatforms();


    chihuahua.style.left =
      playerX + "px";


    chihuahua.style.bottom =
      playerY + "px";


    if (velocityX !== 0) {

      if (velocityX > 0) {
        chihuahua.style.transform =
          "scaleX(1)";
      } else {
        chihuahua.style.transform =
          "scaleX(-1)";
      }

    }


    updateCamera();

    checkMushroom();

    checkStars();

    checkObstacles();

    checkFinish();

  }


  /* =========================================
     GAME LOOP
     ========================================= */

  function gameLoop() {

    updatePlayer();

    animationFrame =
      requestAnimationFrame(gameLoop);

  }


  /* =========================================
     START GAME
     ========================================= */

  function startGame() {

    if (gameStarted) return;

    gameStarted = true;

    gameFinished = false;

    playerX = 120;

    playerY = groundY;

    velocityX = 0;

    velocityY = 0;

    jumping = false;

    mushroomCollected = false;

    starsCollected = 0;

    cameraX = 0;


    if (mushroom) {
      mushroom.style.display = "flex";
    }


    document
      .querySelectorAll(".collectible")
      .forEach(function (star) {

        star.dataset.collected = "false";

        star.style.display = "block";

      });


    if (starsDisplay) {

      starsDisplay.textContent =
        "★ 0";

    }


    if (gameMessage) {

      gameMessage.textContent =
        "move with ◀ ▶ and jump with JUMP. find the mushroom.";

    }


    chihuahua.style.left =
      playerX + "px";

    chihuahua.style.bottom =
      playerY + "px";


    gameLoop();

  }


  /* =========================================
     CAKE → BIRTHDAY MESSAGE
     ========================================= */

  const birthdayMessageButton =
    document.getElementById(
      "birthdayMessageButton"
    );


  if (birthdayMessageButton) {

    birthdayMessageButton.addEventListener(
      "click",
      function () {

        showScene("scene-message");

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

        showScene("scene-bible");

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

        showScene("scene-final");

      }
    );

  }


  /* =========================================
     INITIAL SCENE
     ========================================= */

  showScene("scene-opening");

});
