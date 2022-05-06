"use strict";

// loader 보이기
$(window).on("load", function () {
  $("#loader_box").delay("9500").fadeOut(500);
});

//swiper.js(project 슬라이더)
var slider = new Swiper(".swiper-container", {
  allowTouchMove: false,
  speed: 500,
  direction: "horizontal",
  navigation: {
    nextEl: ".swiper-button-next", // 다음 버튼 클래스명
    prevEl: ".swiper-button-prev", // 이번 버튼 클래스명
  },
});
slider.on("slideChange", function () {
  TweenMax.to(".slide-text span", 0.2, {
    y: "-100px",
  });
  TweenMax.to(".slide-number span", 0.2, {
    x: "-130px",
  });
  TweenMax.to(".swiper-slide-active", 0.5, {
    scale: 0.85,
  });
});

//gsap(project 슬라이더)
slider.on("slideChangeTransitionEnd", function () {
  TweenMax.to(".slide-text span", 0.2, {
    y: 0,
    delay: 0.5,
  });
  TweenMax.to(".slide-text span", 0, {
    y: "100px",
  });

  TweenMax.to(".slide-number span", 0.2, {
    x: 0,
    delay: 0.7,
  });
  TweenMax.to(".slide-number span", 0, {
    x: "130px",
  });

  TweenMax.to(".swiper-slide-active", 0.5, {
    scale: 1,
    ease: Power4.easeOut,
  });

  TweenMax.to(".swiper-slide-active .slide-text", 0, {
    autoAlpha: 1,
  });
  TweenMax.to(".swiper-slide-active .slide-number", 0, {
    autoAlpha: 1,
  });

  TweenMax.to(".swiper-slide-next .slide-text", 0, {
    autoAlpha: 0,
  });
  TweenMax.to(".swiper-slide-prev .slide-text", 0, {
    autoAlpha: 0,
  });

  TweenMax.to(".swiper-slide-next .slide-number", 0, {
    autoAlpha: 0,
  });
  TweenMax.to(".swiper-slide-prev .slide-number", 0, {
    autoAlpha: 0,
  });
});

TweenMax.to(".swiper-slide-next .slide-text", 0, {
  autoAlpha: 0,
});
TweenMax.to(".swiper-slide-prev .slide-text", 0, {
  autoAlpha: 0,
});

TweenMax.to(".swiper-slide-next .slide-number", 0, {
  autoAlpha: 0,
});
TweenMax.to(".swiper-slide-prev .slide-number", 0, {
  autoAlpha: 0,
});

TweenMax.to(".swiper-slide", 0, {
  scale: 0.85,
});

TweenMax.to(".swiper-slide-active", 0, {
  scale: 1,
});

// 스크롤 원텍스트(home의 스크롤텍스트)
let Scroll = document.querySelector("#scroll");
let outterText = document.querySelector(".outterText");
let innerText = document.querySelector(".innerText");

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  Scroll.style.clipPath = "circle(" + value + "px at center center)";
  outterText.style.left = 100 - value / 5 + "%";
  innerText.style.left = 100 - value / 5 + "%";
});

// navbar(navbar 높이 이상에서 border나오기)
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarMenu = document.querySelector(".navbar__menu");
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// home section 어두워지게 만들기
const home = document.querySelector(".homeslide");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// home section 높이의 반만큼 내려야 화살표버튼 보이게하기
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// 위로 올라가는 화살표 버튼
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// function isElementUnderBottom(elem, triggerDiff) {
//   const { top } = elem.getBoundingClientRect();
//   const { innerHeight } = window;
//   return top > innerHeight + (triggerDiff || 0);
// }

// function handleScroll() {
//   const elems = document.querySelectorAll(" .slide-number ,.slide-text");
//   elems.forEach((elem) => {
//     if (isElementUnderBottom(elem, -20)) {
//       elem.style.opacity = "0";
//       elem.style.transform = "translateY(70px)";
//     } else {
//       elem.style.opacity = "1";
//       elem.style.transform = "translateY(0px)";
//     }
//   });
// }

// window.addEventListener("scroll", handleScroll);

////////////active navabr/////////////////
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = ["#home", "#about", "#project", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // console.log("y");
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.scrollHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

//thankyou 메시지창 닫기
$(".close").on("click", function () {
  $(".thankyou_message").hide();
});

// 타이핑 모션

const typed = new Typed(".typed", {
  strings: ["hmm...", "hover me"], //브라우저에 띄워줄 문구
  stringsElement: null, //초기 공간을 비운다.
  typeSpeed: 100, //타이핑 속도
  backSpeed: 100, //backspace 속도
  smartBackspace: true, //동일한 문구가 존재할 때, backspace로 제거못하도록 구성후, 다음 문장을 표현
  startDelay: 1000, //최초 타이핑 시간을 1초만큼 지연시킴
  backDelay: 1000, //이전문장을 모두 타이핑한 후, 1초 후 backspace가 진행되도록 구성
  loop: true,
  showCursor: false,
  cursorChar: "|", //커서의 형태를 구성
});

//tab 메뉴

for (let i = 0; i < $(".tab-button__btn").length; i++) {
  $(".tab-button__btn")
    .eq(i)
    .click(function () {
      $(".tab-button__btn").removeClass("act");
      $(".tab-text__cnt").removeClass("show");
      $(".tab-button__btn").eq(i).addClass("act");
      $(".tab-text__cnt").eq(i).addClass("show");
    });
}

///클릭시 이메일 복사
function copyToClipboard(val) {
  const t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand("copy");
  document.body.removeChild(t);
}
function copy() {
  copyToClipboard("s01057111917@gmail.com");
  alert("이메일이 복사되었습니다.");
}
