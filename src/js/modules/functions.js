import Swiper, { Navigation, Autoplay } from "swiper";
import IMask from 'imask';

export function initSwiperPresentation() {
  const swiper = new Swiper(".presentation__slider", {
    modules: [Navigation, Autoplay],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1000,
    simulateTouch: false,
    spaceBetween: 20,
    watchOverflow: false,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  return swiper;
}

export function initSwiperNews(selector) {
  const swiper = new Swiper(".news__slider", {
    modules: [Autoplay],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1000,
    spaceBetween: 20,
    watchOverflow: false,
  });
  return swiper;
}

export function initAccordion() {
  const accCol = document.querySelectorAll(".acc");
  accCol.forEach((acc) => {
    const accBtn = acc.querySelector(".acc__btn");
    const accBtnPaddingTop = +getComputedStyle(accBtn).paddingTop.slice(0, -2);
    const accPanel = acc.querySelector(".acc__panel");

    accBtn.addEventListener("click", () => {
      accCol.forEach((otherAcc) => {
        if (acc === otherAcc || !otherAcc.classList.contains("acc_active"))
          return;

        const otherAccPanel = otherAcc.querySelector(".acc__panel");
        otherAcc.classList.remove("acc_active");
        otherAccPanel.classList.remove("acc__panel_active");
        otherAccPanel.style.maxHeight = 0;
      });

      if (accPanel.classList.contains("acc__panel_active")) {
        acc.classList.remove("acc_active");
        accPanel.classList.remove("acc__panel_active");
        accPanel.style.maxHeight = 0;
        return;
      }

      acc.classList.add("acc_active");
      accPanel.classList.add("acc__panel_active");
      accPanel.style.maxHeight =
        accPanel.scrollHeight + accBtnPaddingTop + "px";
    });
  });
}

export function navSubparagraph() {
  const navBtnsCol = document.querySelectorAll(".nav__btn");
  const header = document.querySelector(".header");
  const headerPaddingBottom = +getComputedStyle(header).paddingBottom.slice(
    0,
    -2
  );
  let waitingTranition = false;
  navBtnsCol.forEach((navBtn) => {
    const navMore = navBtn.nextElementSibling;
    navMore.style.width = navMore.querySelector('ul').contentWidth + "px";
    navBtn.addEventListener("click", () => {
      // Checking if an animation is currently playing
      if (waitingTranition) {
        setTimeout(() => {
          navBtn.click();
        }, 500);
        return;
      }

      // Close menu before opening
      navBtnsCol.forEach((otherNavBtn) => {
        if (otherNavBtn === navBtn) return;
        if (!otherNavBtn.classList.contains("nav__btn_active")) return;

        const otherNavMore = otherNavBtn.nextElementSibling;
        otherNavBtn.classList.remove("nav__btn_active");
        otherNavMore.classList.remove("nav__more_active");
        otherNavMore.style.maxHeight = 0;

        waitingTranition = true;
      });

      // Close Menu
      if (navBtn.classList.contains("nav__btn_active")) {
        header.style.paddingBottom = headerPaddingBottom + "px";
        navBtn.classList.remove("nav__btn_active");
        navMore.classList.remove("nav__more_active");
        navMore.style.maxHeight = 0;
        return;
      }

      // Open Menu
      const openMenu = () => {
        header.style.paddingBottom =
          navMore.scrollHeight + headerPaddingBottom + "px";
        navBtn.classList.add("nav__btn_active");
        navMore.style.maxHeight = navMore.scrollHeight + "px";
        navMore.classList.add("nav__more_active");
      };
      if (waitingTranition) {
        setTimeout(() => {
          openMenu();
          waitingTranition = false;
        }, 500);
        return;
      }
      openMenu();
    });
  });

  document.addEventListener("click", (e) => {
    const activeNavBtn = document.querySelector(".nav__btn_active");
    if (e.target.closest(".nav__btn") || !activeNavBtn) return;

    const activeNavMore = activeNavBtn.nextElementSibling;
    header.style.paddingBottom = headerPaddingBottom + "px";
    activeNavBtn.classList.remove("nav__btn_active");
    activeNavMore.classList.remove("nav__more_active");
    activeNavMore.style.maxHeight = 0;
  });
}

export function burgerMenuSubparagraph() {
  const navBtnsCol = document.querySelectorAll(".burger-menu__btn");
  let waitingTranition = false;
  navBtnsCol.forEach((navBtn) => {
    const navMore = navBtn.nextElementSibling;
    navBtn.addEventListener("click", () => {
      // Checking if an animation is currently playing
      if (waitingTranition) {
        setTimeout(() => {
          navBtn.click();
        }, 500);
        return;
      }

      // Close menu before opening
      navBtnsCol.forEach((otherNavBtn) => {
        if (otherNavBtn === navBtn) return;
        if (!otherNavBtn.classList.contains("burger-menu__btn_active")) return;

        const otherNavMore = otherNavBtn.nextElementSibling;
        otherNavBtn.classList.remove("burger-menu__btn_active");
        otherNavMore.classList.remove("burger-menu__more_active");
        otherNavMore.style.maxHeight = 0;

        waitingTranition = true;
      });

      // Close Menu
      if (navBtn.classList.contains("burger-menu__btn_active")) {
        navBtn.classList.remove("burger-menu__btn_active");
        navMore.classList.remove("burger-menu__more_active");
        navMore.style.maxHeight = 0;
        return;
      }

      console.log(1);
      // Open Menu
      const openMenu = () => {
        navBtn.classList.add("burger-menu__btn_active");
        navMore.style.maxHeight = navMore.scrollHeight + "px";
        navMore.classList.add("burger-menu__more_active");
      };
      if (waitingTranition) {
        setTimeout(() => {
          openMenu();
          waitingTranition = false;
        }, 500);
        return;
      }
      openMenu();
    });
  });

  document.addEventListener("click", (e) => {
    const activeNavBtn = document.querySelector(".burger-menu__btn_active");
    if (e.target.closest(".burger-menu__btn") || !activeNavBtn) return;

    const activeNavMore = activeNavBtn.nextElementSibling;
    activeNavBtn.classList.remove("burger-menu__btn_active");
    activeNavMore.classList.remove("burger-menu__more_active");
    activeNavMore.style.maxHeight = 0;
  });
}

export function openCloseBurgerMenu() {
  const burgerBtn = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".burger-menu");
  if (!burgerBtn || !burgerMenu) return;

  burgerBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle("burger-menu_active");
    burgerBtn.classList.toggle("burger_active");
    if (burgerBtn.classList.contains("burger_active")) {
      document.documentElement.style.overflow = "hidden";
      return;
    }
    document.documentElement.style.overflow = "auto";
  });
}

export function phoneMask() {
  const phoneMask = IMask(
    document.querySelector('[data-mask="phone"]'), {
      mask: '+{7}(000)000-00-00'
    });
}

export function setTopPaddingMain() {
  const main = document.querySelector('.main')
  const header = document.querySelector('.header')
  main.style.paddingTop = header.scrollHeight + 'px'
}
