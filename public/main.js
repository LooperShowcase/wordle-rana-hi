const Number_OF_WORDS = 6;
const NUMBER_OF_CHARS = 5;

let words = document.getElementById("container");

for (let i = 0; i < Number_OF_WORDS; i++) {
  let singleWord = document.createElement("div");
  singleWord.className = "word";

  for (let j = 0; j < NUMBER_OF_CHARS; j++) {
    let singleChar = document.createElement("div");
    singleChar.className = "char";
    singleWord.appendChild(singleChar);
  }
  words.appendChild(singleWord);
}

let currentWord = 0; //متغير لمكان الكلمة
let currentChar = 0;
document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    if (currentChar > 0) {
      let wordDiv = words.children[currentWord];
      let charToDelete = wordDiv.children[currentChar - 1];
      charToDelete.innerHTML = "";
      currentChar--;
    }
  } else if (event.key === "Enter") {
    let wordDiv = words.children[currentWord];
    animateCSS(wordDiv, "wobble");
    if (currentChar === 5) {
      currentWord++;
      currentChar = 0;
    }
  } else if (currentChar < 5 && isLetter(event.key)) {
    let wordDiv = words.children[currentWord]; //متغير للكلمة
    let charDiv = wordDiv.children[currentChar];
    charDiv.innerHTML = event.key.toUpperCase();
    currentChar++;
  }

  //if (currentChar === 5) {
  // currentWord++; //next word
  //currentChar = 0; //first letter in the new word
  //}
  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
});

//animation:
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const element = document.querySelector(element);

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      elementclassList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
