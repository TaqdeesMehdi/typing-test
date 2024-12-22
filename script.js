const words = [
  "bushwas",
  "adaxial",
  "initialling",
  "conveyorize",
  "unsubdued",
  "bathtub",
  "prenames",
  "isogenic",
  "profitless",
  "interinvolves",
  "paperbacks",
  "caravansary",
  "querulously",
  "purloiner",
  "confiteor",
  "manitu",
  "adoptionist",
  "scup",
  "syncopation",
  "growliness",
  "prinked",
  "shalom",
  "condoled",
  "corrigenda",
  "caloric",
  "nonmanagement",
  "endolymphs",
  "tine",
  "upholster",
  "apyrases",
  "idoliser",
  "corns",
  "regimes",
  "stillborn",
  "misadvices",
  "hoorah",
  "toroth",
  "mining",
  "tallowing",
  "nonspecific",
  "clavicle",
  "osteomata",
  "hammered",
  "lawines",
  "tub",
  "epithelializes",
  "eschars",
  "fundi",
  "markkas",
  "irritable",
  "ganglions",
  "portfolios",
  "epochs",
  "desuetudes",
  "lyophilizes",
  "congealer",
  "chromogen",
  "harrower",
  "whitesmith",
  "anthocyanin",
  "vavasor",
  "mislocates",
  "procurator",
  "earthshakers",
  "roadbed",
  "uvulae",
  "lionising",
  "incubator",
  "goitrogenic",
  "hoariest",
  "airest",
  "defeasance",
  "danseuse",
  "rubbernecker",
  "occidents",
  "uncleaner",
  "nonuniquenesses",
  "bedamning",
  "exemptions",
  "huntings",
  "sensitizing",
  "pennoned",
  "wisped",
  "whitey",
  "dispatching",
  "chromyls",
  "cussers",
  "inject",
  "ultraserious",
  "daunorubicins",
  "pour",
  "impenetrability",
  "carpaccios",
  "baculum",
  "vegan",
  "polies",
  "disharmonizing",
  "swindled",
  "dandyishly",
  "nimbi",
];

const writearea = document.getElementById("text-area");
const tryagainbtn = document.getElementById("button");
const timerelement = document.getElementById("timer");
const finalscr = document.getElementById("final-score");
const finalmessage = document.getElementById("final-msg");
const colorchange1 = document.getElementById("theme1");
const colorchange2 = document.getElementById("theme2");
const defaultcolor = document.getElementById("default");
const clicksound = new Audio("sound.mp3");
let totaltyped = "";
let currentcharindex = 0;
let errors = 0;
let Longtext = generatelongtext();
let timeleft = 60;
let timerinterval;
let typingstarted = false;

// Shuffle array function
function shufflearray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Generate long list
function generatelongtext() {
  const longText = shufflearray([...words]);
  return longText.join(" ");
}
// Timer function
function starttimer() {
  if (!typingstarted) {
    typingstarted = true;
    timerinterval = setInterval(() => {
      timeleft--;
      timerelement.textContent = `Time Left : ${timeleft}s`;
      if (timeleft <= 0) {
        clearInterval(timerinterval);
        endtest();
      }
    }, 1000);
  }
}
// Endtest function
function endtest() {
  timerelement.textContent = `Time's Up!`;
  finalscr.textContent = `Final WPM :${calcwpm()}`;
  writearea.style.display = "none";
  tryagainbtn.style.display = "block";
  calcwpm();
}
// Calculate word per minute WPM
function calcwpm() {
  const wordstyped = totaltyped.trim().split(/\s+/).length;
  const basewpm = Math.round((wordstyped / 60) * 60);
  if (basewpm < 100) {
    finalmessage.textContent = "Really bro? you can do better!😒";
  } else {
    finalmessage.textContent = "Wow ! nice one 🥳";
  }
  const adjuestedwpm = Math.max(basewpm - errors, 0);
  return adjuestedwpm;
}
//MAIN functionality
document.addEventListener("keydown", (e) => {
  starttimer();
  if (e.key === "Backspace") {
    if (currentcharindex > 0) {
      currentcharindex = Math.max(currentcharindex - 1, 0);
      totaltyped = totaltyped.slice(0, -1);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totaltyped += e.key;
    currentcharindex++;
  }

  const textArray = Longtext.split("");
  writearea.innerText = "";
  errors = 0;
  for (let i = 0; i < textArray.length; i++) {
    const span = document.createElement("span");
    if (i < totaltyped.length) {
      if (totaltyped[i] === textArray[i]) {
        span.classList.add("correct");
      } else {
        span.classList.add("error");
        errors++;
      }
    }
    span.textContent = textArray[i];
    writearea.appendChild(span);
  }
  if (totaltyped.length >= 22) {
    const scrollamount = (totaltyped.length - 22) * 14;
    writearea.scrollLeft = scrollamount;
  }
});
colorchange1.addEventListener("click", () => {
  document.body.style.backgroundImage = "linear-gradient(Red, blue)";
});
colorchange2.addEventListener("click", () => {
  document.body.style.backgroundImage = "linear-gradient(yellow, orange)";
});
defaultcolor.addEventListener("click", () => {
  document.body.style.backgroundImage = "linear-gradient(#662D8C , #ED1E79)";
});
function reset() {
  clearInterval(timerinterval);
  timeleft = 60;
  timerelement.textContent = `Time Left : ${timeleft}s`;
  finalscr.textContent = "";
  writearea.style.display = "block";
  tryagainbtn.style.display = "none";
  totaltyped = "";
  finalmessage.textContent = "";
  typingstarted = false;
  currentcharindex = 0;
  errors = 0;
  writearea.scrollLeft = 0;
  Longtext = generatelongtext();
  init();
}
tryagainbtn.addEventListener("click", () => {
  reset();
  clicksound.currentTime = 0;
  clicksound.play();
});

function init() {
  if (ismobile()) {
    showmobilemsg();
  } else {
    writearea.innerText = Longtext;
    timerelement.textContent = `Time Left : ${timeleft}s`;
  }
}
// tryagainbtn.addEventListener("click", reset);
function ismobile() {
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
}
function showmobilemsg() {
  writearea.textContent = "Only for laptop or desktop users";
}
init();
