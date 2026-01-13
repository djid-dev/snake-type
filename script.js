import { WORDS as INITIAL_WORDS } from "./data.js";
import { onKeydown, onKeyUp, setGameStarted } from "./events.js";

const $ = document.querySelector.bind(document); // Atajo para seleccionar elementos del DOM

const $game = $("#game");
const $time = $("time");
const $paragraph = $("p");
const $input = $("input");
const $results = $("#results");
const $wpm = $results.querySelector("#wpm");
const $accuracy = $results.querySelector("#accuracy");
const $restartButton = $results.querySelector("#restartButton");


const INITIAL_TIME = 30;

let words = [];
let currentTime = INITIAL_TIME;
let intervalId;

initEvents();
prechargeGame();

// Funcion para precargar el juego
function prechargeGame() {
  $game.style.display = "flex";
  $results.style.display = "none";
  $input.value = "";
  setGameStarted(false);

  words = words.length > 0 ? words : INITIAL_WORDS.toSorted(() => Math.random() - 0.5).slice(0, 32);
  currentTime = INITIAL_TIME;

  $time.textContent = currentTime;
  $paragraph.innerHTML = words
    .map((word, index) => {
      const letters = word.split("");
      return `<x-word>
        ${letters.map((letter) => `<x-letter>${letter}</x-letter>`).join("")}
      </x-word>`;
    })
    .join("");

  const $firstWord = $paragraph.querySelector("x-word");
  $firstWord.classList.add("active");
  const $firstLetter = $firstWord.querySelector("x-letter");
  $firstLetter.classList.add("active");
}

function initGame() {
  setGameStarted(true);

  intervalId = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;

    if (currentTime === 0) {
      clearInterval(intervalId);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  $game.style.display = "none";
  $results.style.display = "flex";

  const correctWords = $paragraph.querySelectorAll("x-word.correct").length;
  const correctLetters = $paragraph.querySelectorAll("x-letter.correct").length;
  const incorrectLetters =
    $paragraph.querySelectorAll("x-letter.incorrect").length;

  const totalWords = words.length;
  const totalLetters = correctLetters + incorrectLetters;

  const accuracy = totalLetters > 0 ? (correctLetters / totalLetters) * 100 : 0;
  const wpm = totalWords > 0 ? (correctWords / totalWords) * 60 : 0;

  $wpm.textContent = `${wpm.toFixed(2)} wpm`;
  $accuracy.textContent = `${accuracy.toFixed(2)} %`;
}


// Funcion para terminar el juego


function initEvents() {
  $restartButton.addEventListener("click", prechargeGame);

  document.addEventListener("keydown", (e) => {
    $input.focus();
  });

  $input.addEventListener("keydown", (e) => onKeydown(e, initGame, gameOver));
  $input.addEventListener("input", (e) => onKeyUp(e, gameOver));
}

// Eventos teclado para teclas especiales
