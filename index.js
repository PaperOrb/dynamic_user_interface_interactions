const nav = document.querySelector(".nav-list");
const newsBtn = document.querySelector(".news");
const photosBtn = document.querySelector(".photos");
const moreBtn = document.querySelector(".more");
const dropdown = document.querySelector(".dropdown-container");
const carouselNode = document.querySelector(".carousel");
let tabId = "news";

const carousel = (function () {
  const slidecontainer = document.querySelector(".carousel__slide-container");
  const carouselImgs = Array.from(slidecontainer.children);
  let currentImgId = 3;
  let currentImg = document.getElementById(`${currentImgId}`);

  function setCurrentImg(direction) {
    direction === "left" ? --currentImgId : ++currentImgId;
    currentImg = document.getElementById(`${currentImgId}`);
  }

  function gotoLeftImg() {
    currentImg.classList.toggle("selected-image");
    setCurrentImg("left");
    currentImg.classList.toggle("selected-image");
  }

  function gotoRightImg() {
    alert("yep");
  }

  function gotoClickedImg() {}

  function timer() {}

  function display(property) {
    carouselNode.style.display = property;
  }

  function arrows() {
    return document.querySelectorAll(".carousel__button");
  }

  function navDots() {
    return document.querySelectorAll(".nav-dots");
  }

  return { display, gotoLeftImg, gotoRightImg, gotoClickedImg, timer, arrows, navDots };
})();

const news = (function () {
  const newsContent = document.querySelector(".news-content");

  function display(property) {
    newsContent.style.display = property;
  }

  return { display };
})();

function renderDropdown(dropdown) {
  dropdown.toggleAttribute("hidden");
}

nav.addEventListener("click", (e) => {
  tabId = e.target.id;
  const acceptableIDS = ["more", "news", "photos"];
  if (!acceptableIDS.some((id) => id === tabId)) return;

  if (tabId === "more") {
    renderDropdown(dropdown);
    return; // guard clause so that dropdown can display without toggling unrelated stuff
  }

  tabId === "photos" ? carousel.display("flex") : carousel.display("none");
  tabId === "news" ? news.display("flex") : news.display("none");
});

carouselNode.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "carousel__button--left":
      carousel.gotoLeftImg();
      break;
    case "carousel__button--right":
      carousel.gotoLeftImg();
      break;
  }
});
