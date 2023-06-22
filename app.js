class App {
  constructor() {
    // variable

    // dom elements
    this.$sideNav = document.querySelector(".js-side-nav-container");
    this.$menuBtn = document.querySelector(".js-menu-btn");

    // functions here
    this.handleEventListeners();
  }

  handleEventListeners() {
    document.addEventListener("click", (e) => {
      // handle side nav toggle
      this.toggleSideNav(e);
    });
    this.$sideNav.addEventListener("transitionend", function () {
      this.classList.remove("side-nav--animatable");
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
}

new App();
