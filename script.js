const questionCard = document.getElementById("questionCard");
const successCard = document.getElementById("successCard");
const buttonsArea = document.getElementById("buttonsArea");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const restartBtn = document.getElementById("restartBtn");

let noPosition = { x: 0, y: 0 };
let boundsReady = false;

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

const resetNoButton = () => {
  noPosition = { x: 0, y: 0 };
  noBtn.style.transform = "translate(0px, 0px)";
  boundsReady = false;
};

const moveNoButtonAway = (event) => {
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  if (!boundsReady) {
    noPosition = { x: 0, y: 0 };
    boundsReady = true;
  }

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const dx = btnCenterX - event.clientX;
  const dy = btnCenterY - event.clientY;
  const distance = Math.hypot(dx, dy) || 1;

  const pushStrength = 140;
  const moveX = (dx / distance) * pushStrength;
  const moveY = (dy / distance) * pushStrength;

  const maxX = areaRect.width / 2 - btnRect.width / 2;
  const maxY = areaRect.height / 2 + 30;

  noPosition.x = clamp(noPosition.x + moveX, -maxX, maxX);
  noPosition.y = clamp(noPosition.y + moveY, -maxY, maxY);

  noBtn.style.transform = `translate(${noPosition.x}px, ${noPosition.y}px)`;
};

buttonsArea.addEventListener("mousemove", (event) => {
  const nearNoButton = noBtn.getBoundingClientRect();
  const isClose =
    Math.abs(event.clientX - (nearNoButton.left + nearNoButton.width / 2)) < 120 &&
    Math.abs(event.clientY - (nearNoButton.top + nearNoButton.height / 2)) < 95;

  if (isClose) {
    moveNoButtonAway(event);
  }
});

buttonsArea.addEventListener("touchstart", () => {
  noBtn.style.transform = "translate(120px, -38px)";
});

yesBtn.addEventListener("click", () => {
  questionCard.classList.add("hidden");
  successCard.classList.remove("hidden");
});

restartBtn.addEventListener("click", () => {
  successCard.classList.add("hidden");
  questionCard.classList.remove("hidden");
  resetNoButton();
});

window.addEventListener("resize", resetNoButton);
