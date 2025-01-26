class WOW {
  constructor(options = {}) {
    this.defaults = {
      boxClass: 'wow', // Elements with animation
      animateClass: 'animated', // Animation class
      offset: 100, // Distance from the viewport to trigger animation
      mobile: true, // Enable animations on mobile
      live: true, // Detect new elements in the DOM
      callback: null, // Callback when an animation is triggered
      resetAnimation: true, // Reset animations after they finish
    };

    this.config = { ...this.defaults, ...options };
    this.boxes = [];
    this.intersectionObserver = null;

    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.observeBox = this.observeBox.bind(this);
    this.onIntersect = this.onIntersect.bind(this);
  }

  init() {
    if (['interactive', 'complete'].includes(document.readyState)) {
      this.start();
    } else {
      document.addEventListener('DOMContentLoaded', this.start);
    }
  }

  start() {
    this.boxes = Array.from(document.querySelectorAll(`.${this.config.boxClass}`));

    if (this.boxes.length > 0) {
      if (this.disabled()) {
        this.resetStyles();
      } else {
        this.createObserver();
        this.boxes.forEach(this.observeBox);
      }
    }

    if (this.config.live) {
      this.observeMutations();
    }
  }

  createObserver() {
    this.intersectionObserver = new IntersectionObserver(this.onIntersect, {
      root: null,
      rootMargin: `${this.config.offset}px`,
      threshold: 0.1, // Trigger when 10% of the element is visible
    });
  }

  observeBox(box) {
    box.style.visibility = 'hidden'; // Initially hide elements
    this.intersectionObserver.observe(box);
  }

  onIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.show(entry.target);
      }
    });
  }

  show(box) {
    box.style.visibility = 'visible';
    box.classList.add(this.config.animateClass);

    if (this.config.callback) {
      this.config.callback(box);
    }

    if (this.config.resetAnimation) {
      box.addEventListener('animationend', () => {
        box.classList.remove(this.config.animateClass);
      });
    }

  }

  observeMutations() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.classList.contains(this.config.boxClass)) {
            this.observeBox(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  resetStyles() {
    this.boxes.forEach((box) => {
      box.style.visibility = 'visible';
    });
  }


}

// Initialize WOW.js
document.addEventListener('DOMContentLoaded', () => {
  const wow = new WOW({
    offset: 150,
    mobile: true,
    live: true,
  });
  wow.init();
});
