class App {
  constructor() {
    // variable
    this.lightboxIsOpened = false;
    this.cartIsVisible = false;
    this.cartItems = [
      {
        name: "Fall Limited Edition Sneakers",
        price: "125.00",
        amount: "1",
        imgUrl: "./images/image-product-1.jpg",
        totalPrice: "125.00",
      },
    ];
    // dom elements
    this.$sideNav = document.querySelector(".js-side-nav");
    this.$header = document.querySelector(".js-header");
    this.$cart = document.querySelector(".cart");
    this.$lightbox = document.querySelector(".js-lightbox");
    this.$numberBtn = document.querySelector(".button[data-type='number']");
    // change the img if user click on the
    this.$largeImgs = document.querySelectorAll(".img-section__large-img");

    // functions here
    this.handleEventListeners();
  }

  handleEventListeners() {
    document.addEventListener("click", (e) => {
      // handle side nav toggle
      this.toggleSideNav(e);
      this.toggleCart(e);
      this.toggleLightbox(e);
      this.switchImg(e);
      this.switchImg2(e);
      this.toggleNumberInput(e);
      this.togglePurchaseButton(e);
    });

    this.$sideNav.addEventListener("transitionend", function () {
      this.classList.remove("side-nav--animatable");
    });
  }

  toggleSideNav(e) {
    if (e.target.closest(".js-menu-button")) {
      this.$sideNav.classList.add("side-nav--visible", "side-nav--animatable");
    }

    if (
      e.target.closest(".js-overlay") ||
      e.target.matches(".icon-btn[data-type='close']")
    ) {
      this.$sideNav.classList.add("side-nav--animatable");
      this.$sideNav.classList.remove("side-nav--visible");
    }
  }

  toggleCart(e) {
    const rightTargets =
      !e.target.closest(".cart-icon") &&
      !e.target.closest(".cart") &&
      !e.target.closest(".purchase-button");

    if (
      !this.cartIsVisible &&
      (e.target.closest(".cart-icon") || e.target.closest(".purchase-button"))
    ) {
      this.$cart.classList.remove("remove");
      this.cartIsVisible = true;
    }

    if (this.cartIsVisible && rightTargets) {
      this.$cart.classList.add("remove");
      this.cartIsVisible = false;
    }
  }

  toggleLightbox(e) {
    if (e.target.closest(".img-section__large-img")) {
      if (this.cartIsVisible === true) {
        this.cartIsVisible = false;
        return;
      }
      this.$lightbox.classList.remove("remove");
    }

    if (
      e.target.closest(".lightbox-gallery__icon-btn[data-type='close']") ||
      e.target.closest(".lightbox__overlay")
    ) {
      this.$lightbox.classList.add("remove");
    }
  }

  switchImg(e) {
    if (!e.target.closest(".thumbnails > *")) return;

    const target = e.target.parentElement;
    const targetId = +target.dataset.number;
    this.setImgActive(targetId - 1);
    this.setImgSrc(targetId);
  }

  switchImg2(e) {
    const leftBtnIsHit = e.target.closest(".icon-btn[data-type='left-arrow']");
    const rightBtnIsHit = e.target.closest(
      ".icon-btn[data-type='right-arrow']"
    );
    let value;

    if (!(leftBtnIsHit || rightBtnIsHit)) return;

    value = leftBtnIsHit ? -1 : rightBtnIsHit ? 1 : 0;

    const thumbnailAmount =
      document.querySelector(".thumbnails").children.length;
    const currentImgId = +this.$largeImgs[0].dataset.number;
    let newImgId = currentImgId + value;

    newImgId = this.setNumberInRange(newImgId, 0, thumbnailAmount);
    this.setImgActive(newImgId - 1);
    this.setImgSrc(newImgId);
  }

  setImgActive(targetId) {
    const thumbnails = document.querySelectorAll(".thumbnails > *");

    thumbnails.forEach((thumbnail, id) => {
      thumbnail.dataset.type = id % 4 === targetId ? "active" : "inactive";
    });
  }

  setImgSrc(newId) {
    const regex = /\d/;

    if (this.$largeImgs.length === 0) return;

    let srcValue = this.$largeImgs[0].attributes.src.value;
    let list = srcValue.split(regex);
    let newString = this.insertAndJoin(list, -1, newId);

    this.$largeImgs.forEach((img) => {
      img.src = newString;
      img.dataset.number = newId;
    });
  }

  setNumberInRange(val, min, max) {
    return val === min ? max : val > max ? 1 : val;
  }

  insertAndJoin(array, index, newValue) {
    return [...array.slice(0, index), newValue, ...array.slice(index)].join("");
  }

  toggleNumberInput(e) {
    if (!e.target.closest(".button[data-type='number']")) return;

    const min = +this.$numberBtn.dataset.min;
    const max = +this.$numberBtn.dataset.max;
    let number = +this.$numberBtn.dataset.number;

    if (e.target.matches("[data-type='minus'")) {
      number -= 1;
    } else if (e.target.matches("[data-type='plus'")) {
      number += 1;
    }

    number = number < min ? min : number > max ? max : number;

    this.$numberBtn.dataset.number = number;
    this.$numberBtn.querySelector("span").textContent = number;
  }

  togglePurchaseButton(e) {
    if (!e.target.closest(".purchase-button")) return;

    this.toggleCart(e);
    const cartContent = this.$cart.querySelector(".cart__content");
    this.populateCartItems(cartContent);
  }

  populateCartItems(cartContent) {
    // get the current item
    // update the list
    // add new, update existing (add, delete)
    // populate the list
    const result = this.cartItems
      .map(
        (item, index) => `
    <li class="cart__item grid-flow" style="--gap: 0.9375rem;">
    <img class="item__thumbnail br-1" src="${item.imgUrl}" alt="item 1">
    <div class="item__detail">
      <p class="item__name capitalize">${item.name}</p>
      <div>
        <span>$${item.price}</span> x <span>${item.amount}</span>
        <span class="item__total-price font-bold text-neutral-700">$${item.totalPrice}</span>
      </div>
    </div>
    <button class="icon-btn" data-type="delete" type="button" aria-label="Delete" data-id="${index}"></button>
  </li>
    `
      )
      .join("");

    console.log(result);
  }
}

new App();
