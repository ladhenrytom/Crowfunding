"use strict";

// selecting elements////////////////////////////
const menuOpen = document.querySelector(".hamburger");
const menuClose = document.querySelector(".hamburger__close");
const mobileNavLinks = document.querySelector(".nav--links__mobile");
const backThisProjectBtn = document.querySelector(".back-this-project");
const bookmarkBtn = document.querySelector(".bookmark");
const bookmarkText = document.querySelector(".bookmark--text");
const overlay = document.querySelector(".overlay");
const thankYou = document.querySelector(".thank--you");
const pledgeActive = document.querySelector(".pledge--active");
const gotItBtn = document.querySelector(".got--it");
const closePledgeBtn = document.querySelector(".close--btn");
const selectRewardBtns = document.querySelectorAll(".select--reward__btn");
const pledgeCardsActiveSelect = document.querySelectorAll(
  ".pledge--active__card--select"
);
const numberOfPledges = document.querySelectorAll(".number-of-pledges");
const cardHeaders = document.querySelectorAll(".card--header");
const radioBtns = document.querySelectorAll(".radio--btn");
const activeRadioBtns = document.querySelectorAll(".radio--btn__active");
const continueBtns = document.querySelectorAll(".continue");
const pledgesLeft = document.querySelectorAll(".pledges--left");
const inputVals = document.querySelectorAll("input");
const svgBookmark = document.querySelector(".svg--bookmark");

// expressions////////////////////////////////////////////
document.querySelector(".section").addEventListener("click", function () {
  mobileNavLinks.classList.add("hidden");
  menuClose.classList.add("hidden");
  menuOpen.classList.remove("hidden");
});

// functions///////////////////////////////////////////////
function scrollPledgeToView() {
  pledgeActive.scrollIntoView({ behavior: "smooth" });
}
function toggleOverlay() {
  overlay.classList.contains("hidden")
    ? overlay.classList.remove("hidden")
    : overlay.classList.add("hidden");
}
function toggleModal() {
  pledgeActive.classList.contains("hidden")
    ? pledgeActive.classList.remove("hidden")
    : pledgeActive.classList.add("hidden");
}
function bookmark() {
  document.querySelector(".svg--bookmark").classList.toggle("bookmarked");
  bookmarkBtn.classList.toggle("bookmarked");
  bookmarkText.innerHTML == "Bookmark"
    ? (bookmarkText.innerHTML = "Bookmarked")
    : (bookmarkText.innerHTML = "Bookmark");
}
function selectReward() {
  toggleModal();
  toggleOverlay();
  scrollPledgeToView();
}
function selectCard(list) {
  list.forEach((el) => {
    //   check if selected target is a card header
    if (el.classList.contains("select")) {
      el.addEventListener("mouseover", function () {
        el.classList.add("card--header__selected");
        radioBtns.forEach((e) => {
          if (e.children[0].classList.contains("hidden"))
            e.classList.remove("radio--btn__hover");
          if (e.getAttribute("id") == el.getAttribute("id"))
            e.classList.add("radio--btn__hover");
        });
      });
      el.addEventListener("mouseleave", function () {
        radioBtns.forEach((e) => {
          if (e.children[0].classList.contains("hidden")) {
            e.classList.remove("radio--btn__hover");
            el.classList.remove("card--header__selected");
          }
        });
      });
      el.addEventListener("click", function () {
        //   el.classList.add("card--header__selected");
        pledgeCardsActiveSelect.forEach((pledge) => {
          pledge.classList.remove("card--selected");
          if (el.getAttribute("id") == pledge.getAttribute("id"))
            pledge.classList.add("card--selected");
        });
        radioBtns.forEach((e) => {
          e.classList.remove("radio--btn__hover");
          e.children[0].classList.add("hidden");
          numberOfPledges.forEach((p) => {
            p.classList.add("hidden");
            if (el.getAttribute("id") == p.getAttribute("id"))
              p.classList.remove("hidden");
          });
          if (e.getAttribute("id") == el.getAttribute("id")) {
            e.classList.add("radio--btn__hover");
            e.children[0].classList.remove("hidden");
          }
        });
      });
    } else {
      return;
    }
  });
}
function openThankYouModal(arr) {
  arr.forEach((el) => {
    el.addEventListener("click", function () {
      overlay.classList.remove("hidden");
      pledgeActive.classList.add("hidden");
      thankYou.classList.remove("hidden");
      pledgesLeft.forEach((p) => {
        if (el.getAttribute("id") == p.getAttribute("id")) {
          // console.log(p.parentElement.children[1].classList);
          if (p.children[0]) p.children[0].innerHTML--;
          if (!p.children[0] && Number(p.innerHTML)) p.innerHTML--;
        }
      });
      thankYou.scrollIntoView({ behavior: "smooth" });
    });
  });
}
function closeThankYouModal() {
  overlay.classList.add("hidden");
  pledgeActive.classList.add("hidden");
  thankYou.classList.add("hidden");
  document.querySelector(".main--app").scrollIntoView({ behavior: "smooth" });
}

// event handlers////////////////

menuOpen.addEventListener("click", function (e) {
  mobileNavLinks.classList.remove("hidden");
  menuClose.classList.remove("hidden");
  menuOpen.classList.add("hidden");
});

menuClose.addEventListener("click", function () {
  mobileNavLinks.classList.add("hidden");
  menuOpen.classList.remove("hidden");
  menuClose.classList.add("hidden");
});

backThisProjectBtn.addEventListener("click", function () {
  toggleModal();
  toggleOverlay();
  scrollPledgeToView();
});
gotItBtn.addEventListener("click", function () {
  thankYou.classList.remove("hidden");
  overlay.classList.add("hidden");
});
closePledgeBtn.addEventListener("click", function () {
  toggleModal();
  toggleOverlay();
});
bookmarkBtn.addEventListener("click", function () {
  bookmark();
});
svgBookmark.addEventListener("click", function () {
  bookmark();
});
selectRewardBtns.forEach((el) => {
  el.addEventListener("click", function () {
    selectReward();
  });
});
gotItBtn.addEventListener("click", function () {
  closeThankYouModal();
});

// execute selecting cards
selectCard(cardHeaders);
selectCard(radioBtns);
openThankYouModal(continueBtns);
