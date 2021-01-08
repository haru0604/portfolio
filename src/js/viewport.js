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
var kv = document.querySelector(".kv");
kv.style.height = `${window.innerHeight}px`;

window.addEventListener("resize", () => {
  kv.style.height = `${window.innerHeight}px`;
});
