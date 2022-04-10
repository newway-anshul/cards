let mainContainer;
window.addEventListener("load", () => {
  createBox(5);
});
function createBox(count) {
  mainContainer = document.querySelector("div.main-container");
  mainContainer.innerHTML = "";
  for (i = 1; i <= count; i++) {
    let div = document.createElement("div");
    div.classList.add("child");
    div.classList.add(`child-${i}`);
    div.innerHTML = `${i}<span parent-id="${i}" id="${i}">X</span>`;
    mainContainer.append(div);
  }
  mainContainer
    .querySelectorAll("span")
    .forEach((ele) => ele.addEventListener("click", closeClicked));
}
function closeClicked(e) {
  let parent = e.target.parentElement;
  if (parent.nextElementSibling) {
    move(parent, true);
  }
}
function getPosition(ele) {
  let boundingRct = ele.getBoundingClientRect();
  return {
    x: boundingRct.x + boundingRct.width / 2,
    y: boundingRct.y + boundingRct.height / 2,
  };
}
function move(currectEle, isReal) {
  let currentElePos, nextElePos, nextEle;
  currentElePos = currectEle.getBoundingClientRect();
  nextEle = currectEle.nextElementSibling;
  if (!nextEle) {
    return;
  }
  if (!!nextEle && nextEle.classList.contains("moved")) {
    nextEle = nextEle.nextElementSibling;
  }
  nextElePos = nextEle.getBoundingClientRect();
  currectEle.ontransitionend = () => {
    console.log("transition completed");
    currectEle.classList.add("moved");
    let xDiff = currentElePos.x - nextElePos.x;
    let yDiff = currentElePos.y - nextElePos.y;
    nextEle.style.transform = `translate(${xDiff}px,${yDiff}px)`;
    move(nextEle, false);
  };
  if (isReal) {
    currectEle.style.transform = `translateY(-380px)`;
  }
}
function reload() {
  createBox(5);
}
