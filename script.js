document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startAdventureButton");

  if (startButton) {
    startButton.addEventListener("click", function () {
      alert("The Birthday Adventure is starting!");
    });
  }
});
