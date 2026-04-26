// Set Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML =
  `${gameName} Game Created By ORG | UNK`;

// Tries
let tires = 6;
let letters = 6;
let curTry = 1;
let hints = 3;

// Words
let words = [
  "ORGUNK",
  "Master",
  "Branch",
  "Mainly",
  "School",
  "Remove",
  "Number",
  "Arabic",
];

// Hints
document.querySelector(".hint span").innerHTML = hints;
const hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click", getHint);

let gusWord = words[Math.floor(Math.random() * words.length)];
let msgA = document.querySelector(".msg");
function genInputs() {
  const inpCont = document.querySelector(".inputs");
  for (let i = 1; i <= tires; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-input");
    // inputs
    for (let x = 1; x <= letters; x++) {
      const inp = document.createElement("input");
      inp.type = "text";
      inp.id = `guess-${i}-letter-${x}`;
      inp.setAttribute("maxLength", "1");
      tryDiv.appendChild(inp);
    }
    inpCont.appendChild(tryDiv);
  }
  inpCont.children[0].children[1].focus();

  // Disabled All Input Not First
  const allDisInp = document.querySelectorAll(".disabled-input input");
  allDisInp.forEach((e) => (e.disabled = true));

  // Make Text Upper
  const allInp = document.querySelectorAll("input");
  allInp.forEach((e, i) => {
    e.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // Focus Next Input
      if (allInp[i + 1]) allInp[i + 1].focus();
    });
    // Arrows
    e.addEventListener("keydown", function (e) {
      const curI = [...allInp].indexOf(e.target);
      if (e.key === "ArrowRight")
        if (curI + 1 < allInp.length) allInp[curI + 1].focus();

      if (e.key === "ArrowLeft")
        if (curI - 1 < allInp.length) allInp[curI - 1].focus();
    });
  });
}
const gusBtn = document.querySelector(".check");
gusBtn.addEventListener("click", handleGus);
function handleGus() {
  if (curTry > 6) return "End";
  if (document.querySelector(".sec-div"))
    document.querySelector(".sec-div").innerHTML = "";
  let sucGus = true;
  for (let i = 1; i <= letters; i++) {
    const inpF = document.querySelector(`#guess-${curTry}-letter-${i}`);
    const userL = inpF.value.toLowerCase();
    const correctL = gusWord[i - 1].toLowerCase();

    // Game Logic
    if (userL === correctL) {
      inpF.classList.add("in-place");
    } else if (gusWord.includes(userL) && userL !== "") {
      inpF.classList.add("not-in-place");
      sucGus = false;
    } else {
      inpF.classList.add("wrong-guess");
      sucGus = false;
    }
  }
  // Check Win Lose
  if (sucGus) {
    if (hints === 3) {
      msgA.innerHTML = `You Win\n <span style='font-size: 40px;'>Without Any Hint (You Genius)</span> The Word Is <span>${gusWord}</span>`;
    } else msgA.innerHTML = `You Win, The Word Is <span>${gusWord}</span>`;
    msgA.style.transform =
      "translate(-50%, -50%) translateZ(0px) rotateX(0deg)";
    msgA.style.opacity = "1";

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((e) => {
      e.classList.add("disabled-btn");
    });

    gusBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    document.querySelector(`.try-${curTry}`).classList.add("disabled-input");
    const curTryInp = document.querySelectorAll(`.try-${curTry} input`);
    curTryInp.forEach((e) => (e.disabled = true));

    curTry++;
    const nextTryInp = document.querySelectorAll(`.try-${curTry} input`);
    nextTryInp.forEach((e) => (e.disabled = false));

    let el = document.querySelector(`.try-${curTry}`);
    if (el) {
      document
        .querySelector(`.try-${curTry}`)
        .classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      msgA.innerHTML = `You Lose, The Word Is <span>${gusWord}</span>`;
      msgA.style.transform =
        "translate(-50%, -50%) translateZ(0px) rotateX(0deg)";
      msgA.style.opacity = "1";

      gusBtn.disabled = true;
      hintBtn.disabled = true;
    }
  }
}
function getHint() {
  if (hints > 0) {
    hints--;
    document.querySelector(".hint span").innerHTML = hints;
  }
  if (hints === 0) hintBtn.disabled = true;
  const enaInp = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enaInp).filter((e) => e.value === "");
  if (emptyEnabledInputs.length > 0) {
    const randomI = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInp = emptyEnabledInputs[randomI];
    const iToF = Array.from(enaInp).indexOf(randomInp);
    if (iToF !== -1) {
      randomInp.value = gusWord[iToF].toUpperCase();
    }
  }
}
function handleBack(e) {
  if (e.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currI = Array.from(inputs).indexOf(e.target);
    if (currI > 0) {
      inputs[currI].value = "";
      inputs[currI - 1].value = "";
      inputs[currI - 1].focus();
    }
  }
}
document.addEventListener("keydown", handleBack);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && curTry > 0) {
    handleGus();
  } else {
    return;
  }
});
window.onload = () => {
  genInputs();
};

let a = 0;
let sec = document.querySelector(".sec").addEventListener("click", () => {
  let ke = document.createElement("span");
  ke.appendChild(document.createTextNode(gusWord));
  ke.className = "sec-div";
  if (a === 0) {
    document.querySelector(".sec").appendChild(ke);
  }
  ke.style.cssText = "font-size: 12px;margin-left: auto;opacity: 1;";
  a++;
});
