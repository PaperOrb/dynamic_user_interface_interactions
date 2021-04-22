const nav = document.querySelector(".nav-list");
const newsBtn = document.querySelector(".news");
const photosBtn = document.querySelector(".photos");
const moreBtn = document.querySelector(".more");
const dropdown = document.querySelector(".dropdown-container");
const carouselNode = document.querySelector(".carousel");
const carouselNavDots = document.querySelector(".carousel__nav");
let tabId = "photos";

const carousel = (function () {
  const slidecontainer = document.querySelector(".carousel__slide-container");
  const carouselImgs = Array.from(slidecontainer.children);
  let currentImgId = "s1";
  let currentImg = document.getElementById(`${currentImgId}`);

  function getCurrentImgId() {
    return currentImgId;
  }

  function setCurrentImgId(direction) {
    let idToInt = Number(currentImgId[1]);

    if (direction === "left" && idToInt !== 1) {
      idToInt -= 1;
    } else if (direction === "left" && idToInt === 1) {
      idToInt = carouselImgs.length;
      setDefaultImgMargin("left");
    } else if (direction === "right" && idToInt !== carouselImgs.length) {
      idToInt += 1;
    } else if (direction === "right" && idToInt === carouselImgs.length) {
      idToInt = 1;
      setDefaultImgMargin("right");
    } else {
      console.log(carouselImgs.length);
    }
    currentImgId = "s" + idToInt;
  }

  function setCurrentImg() {
    currentImg = document.getElementById(`${currentImgId}`);
  }

  function setDefaultImgMargin(direction) {
    if (direction === "right") {
      carouselImgs.forEach((ele) => {
        ele.style.marginLeft = "100%";
      });
      carouselImgs[0].style.marginLeft = "0";
    } else {
      carouselImgs.forEach((ele) => {
        ele.style.marginLeft = "-100%";
      });
      carouselImgs[2].style.marginLeft = "0";
    }
  }

  function gotoLeftImg() {
    currentImg.style.marginLeft = "100%";
    setCurrentImgId("left");
    setCurrentImg();
    currentImg.style.marginLeft = "0";
  }

  function gotoRightImg() {
    currentImg.style.marginLeft = "-100%";
    setCurrentImgId("right");
    setCurrentImg();
    currentImg.style.marginLeft = "0";
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

  return {
    display,
    getCurrentImgId,
    gotoLeftImg,
    gotoRightImg,
    gotoClickedImg,
    timer,
    arrows,
    navDots,
    setDefaultImgMargin,
  };
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

carousel.setDefaultImgMargin("right");

// header navigation
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

// carousel arrow navigation
carouselNode.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "carousel__button--left":
      carousel.gotoLeftImg();
      break;
    case "carousel__button--right":
      carousel.gotoRightImg();
      break;
  }
  highlightNavDot(e.target); // fix so this highlights current slide dot
});

// carousel dot navigation
function highlightNavDot(target) {
  if (target.id !== "dot-container") {
    Array.from(carouselNavDots.children).forEach((ele) => {
      ele.classList.remove("current-slide-dot");
    });
    let slideNumber = carousel.getCurrentImgId()[1];
    let navDotId = "n" + slideNumber;
    let navDotEle = document.getElementById(navDotId);
    navDotEle.classList.add("current-slide-dot");
  }
}

carouselNavDots.addEventListener("click", (e) => {
  let currentNavDotId = e.target.id;
  let navDotIdToInt = Number(currentNavDotId[1]);
  highlightNavDot(e.target);

  switch (e.target.id) {
    case "n1":
      carousel.gotoLeftImg();
      break;
    case "n2":
      carousel.gotoRightImg();
      break;
    case "n3":
      carousel.gotoLeftImg();
      break;
  }
});
