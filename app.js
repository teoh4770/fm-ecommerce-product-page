class App {
  constructor() {
    // variable
    this.cartList = [];

    // dom elements
    this.$sideNav = document.querySelector(".js-side-nav-container");
    this.$menuBtn = document.querySelector(".js-menu-btn");
    this.$headers = document.querySelectorAll(".header");

    this.$largeImg = document.querySelector(
      ".product-display-section__large-product-img"
    );
    this.$thumbnails = document.querySelectorAll(
      ".product-display-section__thumbnails > img"
    );

    // functions here
    this.handleEventListeners();
  }

  handleEventListeners() {
    document.addEventListener("click", (e) => {
      // handle side nav toggle
      this.toggleSideNav(e);
      this.toggleCart(e);
    });

    this.$sideNav.addEventListener("transitionend", function () {
      this.classList.remove("side-nav--animatable");
    });

    this.$thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", (e) => {
        const imgId = e.target.dataset.number;
        const number = /\d/;

        let srcValue = this.$largeImg.attributes.src.value;
        let splitted = srcValue.split(number);

        let newSrc = this.insertAndJoin(splitted, -1, imgId);

        this.$largeImg.src = newSrc;
      });
    });
  }

  toggleSideNav(e) {
    if (e.target.closest(".js-menu-btn")) {
      this.$sideNav.classList.add("side-nav--animatable", "side-nav--visible");
    }

    if (e.target.closest(".js-overlay") || e.target.matches(".js-close-btn")) {
      this.$sideNav.classList.add("side-nav--animatable");
      this.$sideNav.classList.remove("side-nav--visible");
    }
  }

  toggleCart(e) {
    const header = this.$headers[0];
    const cartIsVisible = header.classList.contains("cart--visible");
    const closeTargets =
      !e.target.closest(".nav__cart-icon-container") &&
      !e.target.closest(".cart");

    if (e.target.closest(".nav__cart-icon-container") && !cartIsVisible) {
      this.$headers.forEach((header) => {
        header.classList.add("cart--visible");
      });
    }

    if (cartIsVisible && closeTargets) {
      this.$headers.forEach((header) => {
        header.classList.remove("cart--visible");
      });
    }
  }

  insertAndJoin(array, index, newValue) {
    return [...array.slice(0, index), newValue, ...array.slice(index)].join("");
  }
}

new App();
