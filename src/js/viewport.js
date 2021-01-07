"use strict";

const works = document.querySelectorAll(".cont__item");

const options = {
  root: null,
  rootMargin: "0px 0px -150px",
  threshold: 0,
};

const observer = new IntersectionObserver(doWhenIntersect, options);

works.forEach((work) => {
  observer.observe(work);
});

function doWhenIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-active");
    }
  });
}

// function activateIndex(element) {
// const currentActiveClass = document.querySelector(".is-active");
// すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
// if (currentActiveClass !== null) {
//   currentActiveClass.classList.remove("is-active");
// }
//
// }
//
// fadein {
//   transition: all 300ms ease-out;
//   opacity: 0;
// }

// fadein.on {
//   opacity: 1;
// }
