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
const timeleft = document.getElementById("timer");
const finalscr = document.getElementById("final-score");
let totaltyped = "";
let currentcharindex = 0;
let errors = 0;
let Longtext = generatelongtext();
function shufflearray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generatelongtext() {
  const longText = shufflearray([...words]);
  return longText.join(" ");
}
writearea.textContent = Longtext;
document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    if (currentcharindex > 0) {
      currentcharindex = Math.max(currentcharindex - 1, 0);
      totaltyped = totaltyped.slice(0, -1);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totaltyped += e.key;
    currentcharindex++;
  }
  console.log(
    "e.key",
    e.key,
    "totaltyped",
    totaltyped,
    "currentcahrindex",
    currentcharindex
  );
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
  if (totaltyped.length >= 20) {
    const scrollamount = (totaltyped.length - 20) * 14;
    writearea.scrollLeft = scrollamount;
  }
});
