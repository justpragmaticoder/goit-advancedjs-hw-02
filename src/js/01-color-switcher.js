function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

(() => {
  const startData = document.querySelector("button[data-start]");
  const stopData = document.querySelector("button[data-stop]");
  const body = document.querySelector("body");

  let timer = null;
  stopData.setAttribute("disabled", true);

  startData.addEventListener("click", () => {
    stopData.removeAttribute("disabled");
    timer = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startData.setAttribute("disabled", true);
  });

  stopData.addEventListener("click", () => {
    startData.removeAttribute("disabled");
    clearInterval(timer);
    stopData.setAttribute("disabled", true);
  });
})();
