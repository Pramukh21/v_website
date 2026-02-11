const questionCard = document.getElementById("questionCard");
const successCard = document.getElementById("successCard");
const buttonsArea = document.getElementById("buttonsArea");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const restartBtn = document.getElementById("restartBtn");
const memoryGrid = document.getElementById("memoryGrid");
const memoriesSection = document.getElementById("memoriesSection");
const photoHint = document.getElementById("photoHint");

const romanticMemories = [
  // Add your own files here after placing them in assets/photos/
  // "assets/photos/us-1.jpg",
  // "assets/photos/us-2.jpg",
  // "assets/photos/us-3.jpg",
];

let noPosition = { x: 0, y: 0 };
let boundsReady = false;
let lastEscapeAt = 0;

const ESCAPE_COOLDOWN_MS = 45;
const REPEL_RADIUS = 170;
const MAX_PUSH = 220;

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

const resetNoButton = () => {
  noPosition = { x: 0, y: 0 };
  noBtn.style.transform = "translate(0px, 0px)";
  boundsReady = false;
};

const renderMemories = () => {
  if (romanticMemories.length === 0) {
    memoriesSection.classList.add("hidden");
    photoHint.classList.remove("hidden");
    return;
  }

  memoriesSection.classList.remove("hidden");
  photoHint.classList.add("hidden");
  memoryGrid.innerHTML = "";

  romanticMemories.forEach((photoPath, index) => {
    const image = document.createElement("img");
    image.src = photoPath;
    image.alt = `Memory ${index + 1}`;
    image.loading = "lazy";
    image.className = "memory-img";
    memoryGrid.appendChild(image);
  });
};

const moveNoButtonAway = (event, intensity = 1) => {
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

  const pushStrength = MAX_PUSH * intensity;
  const moveX = (dx / distance) * pushStrength;
  const moveY = (dy / distance) * pushStrength;

  const maxX = areaRect.width / 2 - btnRect.width / 2 + 28;
  const maxY = areaRect.height / 2 + 54;

  noPosition.x = clamp(noPosition.x + moveX, -maxX, maxX);
  noPosition.y = clamp(noPosition.y + moveY, -maxY, maxY);

  noBtn.style.transform = `translate(${noPosition.x}px, ${noPosition.y}px)`;
};

const forceEscape = (event) => {
  const now = performance.now();
  if (now - lastEscapeAt < ESCAPE_COOLDOWN_MS) {
    return;
  }

  lastEscapeAt = now;
  const btnRect = noBtn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const pointerDistance = Math.hypot(event.clientX - btnCenterX, event.clientY - btnCenterY);

  if (pointerDistance < REPEL_RADIUS) {
    const intensity = 1 + (REPEL_RADIUS - pointerDistance) / REPEL_RADIUS;
    moveNoButtonAway(event, intensity);
  }
};

const randomLeap = () => {
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = areaRect.width / 2 - btnRect.width / 2 + 28;
  const maxY = areaRect.height / 2 + 54;

  noPosition.x = (Math.random() * 2 - 1) * maxX;
  noPosition.y = (Math.random() * 2 - 1) * maxY;
  noBtn.style.transform = `translate(${noPosition.x}px, ${noPosition.y}px)`;
};

document.addEventListener("pointermove", (event) => {
  if (questionCard.classList.contains("hidden")) {
    return;
  }

  forceEscape(event);
});

buttonsArea.addEventListener("touchstart", () => {
  randomLeap();
});

noBtn.addEventListener("pointerenter", randomLeap);
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  randomLeap();
});

yesBtn.addEventListener("click", () => {
  renderMemories();
  questionCard.classList.add("hidden");
  successCard.classList.remove("hidden");
});

restartBtn.addEventListener("click", () => {
  successCard.classList.add("hidden");
  questionCard.classList.remove("hidden");
  resetNoButton();
});

window.addEventListener("resize", resetNoButton);
