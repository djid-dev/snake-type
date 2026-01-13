const $capsWarning = document.querySelector("#capsWarning");
const $paragraph = document.querySelector("p");
const $input = document.querySelector("input");


let isGameStarted = false; // Indica si el juego ha comenzado para empezar el contador

export function setGameStarted(state) {
  isGameStarted = state;
}
export function getGameStarted() {
  return isGameStarted;
}





export function onKeydown(event, initgameCallback, gameOverCallback) {
  const { key } = event;

  if (!getGameStarted()) {
    initgameCallback();
    setGameStarted(true);
  }

  const $currentWord = $paragraph.querySelector("x-word.active");
  const $currentLetter = $currentWord.querySelector("x-letter.active");

  const capsLock = event.getModifierState
    ? event.getModifierState("CapsLock")
    : false;

  $capsWarning.style.opacity = capsLock ? 1 : 0;

  switch (key) {
    case " ": // Espacio
      event.preventDefault();
      const $nextWord = $currentWord.nextElementSibling;
      const $nextLetter = $nextWord?.querySelector("x-letter");

      if (!$nextWord) {
        gameOverCallback();
      }

      $currentWord.classList.remove("active", "marked");
      $currentWord.querySelectorAll("x-letter").forEach(($letter) => {
        $letter.classList.remove("marked");
      });
      $currentLetter.classList.remove("active", "is-last");

      $nextWord.classList.add("active");
      $nextLetter.classList.add("active");

      $input.value = "";

      const hasMissedLetter = $currentWord.querySelectorAll(
        "x-letter:not(.correct)"
      ).length;

      const classToAdd = hasMissedLetter > 0 ? "marked" : "correct";
      $currentWord.classList.add(classToAdd);
      $currentWord.querySelectorAll("x-letter").forEach(($letter) => {
        if (
          !$letter.classList.contains("correct") &&
          !$letter.classList.contains("incorrect")
        ) {
          $letter.classList.add("marked");
        }
      });

      break;

    case "Backspace": // Retroceso
      const $prevWord = $currentWord?.previousElementSibling;
      const $prevLetter = $currentLetter.previousElementSibling;

      if (!$prevWord && !$prevLetter) {
        event.preventDefault();
        break;
      }

      const $prevWordMarked = $prevWord?.classList.contains("marked");
      const $prevWordIncorrect = $prevWord?.classList.contains("incorrect");
      if (!$prevLetter && ($prevWordMarked || $prevWordIncorrect)) {
        event.preventDefault();
        $currentWord.classList.remove("active");

        $prevWord.classList.remove("marked");
        $prevWord.classList.add("active");

        const hasMarkedLetter = $prevWord.querySelector("x-letter.marked");

        const $letterToGo = hasMarkedLetter
          ? hasMarkedLetter
          : $prevWord.querySelector("x-letter:last-child");

        if (hasMarkedLetter) {
          $prevWord.classList.remove("marked");

          $prevWord.querySelectorAll("x-letter").forEach(($letter) => {
            $letter.classList.remove("marked");
          });
        } else {
          $letterToGo.classList.add("is-last");
        }

        $currentLetter.classList.remove("active");
        $letterToGo.classList.add("active");

        $input.value = [
          ...$prevWord.querySelectorAll("x-letter.correct, x-letter.incorrect"),
        ]
          .map(($el) => {
            return $el.classList.contains("correct") ? $el.innerText : "*";
          })
          .join("");
      }

      break;
  }
}

export function onKeyUp(event) {
  //Recuperamos los elementos actuales
  const $currentWord = $paragraph.querySelector("x-word.active");
  const $currentLetter = $currentWord.querySelector("x-letter.active");

  const currentWord = $currentWord.innerText.trim();
  $input.maxLength = currentWord.length;

  const $allLetters = $currentWord.querySelectorAll("x-letter");

  $allLetters.forEach(($letter) =>
    $letter.classList.remove("correct", "incorrect", "marked")
  );

  $input.value.split("").forEach((char, index) => {
    const $letter = $allLetters[index];
    const letterToCheck = currentWord[index];

    const isCorrect = char === letterToCheck;
    const letterClass = isCorrect ? "correct" : "incorrect";

    $letter.classList.add(letterClass);
  });

  $currentLetter.classList.remove("active", "is-last");

  const inputLength = $input.value.length;
  const $nextActiveLetter = $allLetters[inputLength];

  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add("active");
  } else {
    $currentLetter.classList.add("active", "is-last");
  }
}
