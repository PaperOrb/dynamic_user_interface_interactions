const nav = document.querySelector(".nav-list");
const newsBtn = document.querySelector(".news");
const photosBtn = document.querySelector(".photos");
const moreBtn = document.querySelector(".more");
const dropdown = document.querySelector(".dropdown-container");
let tabId = "news";

const carousel = (function () {
  const carousel = document.querySelector(".carousel");
  const carouselTrack = document.querySelector(".carousel-track");

  function gotoLeftImg() {
    alert("yep");
  }

  function gotoRightImg() {
    alert("yep");
  }

  function gotoClickedImg() {}

  function timer() {}

  function display(property) {
    carousel.style.display = property;
  }

  return { display, gotoLeftImg, gotoRightImg, gotoClickedImg, timer };
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
