! function() {
    "use strict";
    const e = (e, t = !1) => (e = e.trim(), t ? [...document.querySelectorAll(e)] : document.querySelector(e)),
        t = (t, i, s, o = !1) => {
            let a = e(i, o);
            a && (o ? a.forEach((e => e.addEventListener(t, s))) : a.addEventListener(t, s))
        },
        i = e => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        };
    t("click", ".mobile-nav-toggle", (function(t) {
        e("#navbar").classList.toggle("navbar-mobile"), this.classList.toggle("bi-list"), this.classList.toggle("bi-x")
    })), t("click", "#navbar .nav-link", (function(t) {
        let s = e(this.hash);
        if (s) {
            t.preventDefault();
            let o = e("#navbar"),
                a = e("#header"),
                l = e("section", !0);
            if (e("#navbar .nav-link", !0).forEach((e => {
                    e.classList.remove("active")
                })), this.classList.add("active"), o.classList.contains("navbar-mobile")) {
                o.classList.remove("navbar-mobile");
                let t = e(".mobile-nav-toggle");
                t.classList.toggle("bi-list"), t.classList.toggle("bi-x")
            }
            if ("#header" == this.hash) return a.classList.remove("header-top"), void l.forEach((e => {
                e.classList.remove("section-show")
            }));
            a.classList.contains("header-top") ? (l.forEach((e => {
                e.classList.remove("section-show")
            })), s.classList.add("section-show")) : (a.classList.add("header-top"), setTimeout((function() {
                l.forEach((e => {
                    e.classList.remove("section-show")
                })), s.classList.add("section-show")
            }), 350)), i(this.hash)
        }
    }), !0), window.addEventListener("load", (() => {
        if (window.location.hash) {
            let t = e(window.location.hash);
            if (t) {
                let s = e("#header"),
                    o = e("#navbar .nav-link", !0);
                s.classList.add("header-top"), o.forEach((e => {
                    e.getAttribute("href") == window.location.hash ? e.classList.add("active") : e.classList.remove("active")
                })), setTimeout((function() {
                    t.classList.add("section-show")
                }), 350), i(window.location.hash)
            }
        }
    }));
    let s = e(".skills-content");
    s && new Waypoint({
        element: s,
        offset: "80%",
        handler: function(t) {
            e(".progress .progress-bar", !0).forEach((e => {
                e.style.width = e.getAttribute("aria-valuenow") + "%"
            }))
        }
    }), new Swiper(".testimonials-slider", {
        speed: 600,
        loop: !0,
        autoplay: {
            delay: 5e3,
            disableOnInteraction: !1
        },
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: !0
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    }), window.addEventListener("load", (() => {
        let i = e(".portfolio-container");
        if (i) {
            let s = new Isotope(i, {
                    itemSelector: ".portfolio-item",
                    layoutMode: "fitRows"
                }),
                o = e("#portfolio-flters li", !0);
            t("click", "#portfolio-flters li", (function(e) {
                e.preventDefault(), o.forEach((function(e) {
                    e.classList.remove("filter-active")
                })), this.classList.add("filter-active"), s.arrange({
                    filter: this.getAttribute("data-filter")
                })
            }), !0)
        }
    })), GLightbox({
        selector: ".portfolio-lightbox"
    }), GLightbox({
        selector: ".portfolio-details-lightbox",
        width: "90%",
        height: "90vh"
    }), new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: !0,
        autoplay: {
            delay: 5e3,
            disableOnInteraction: !1
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: !0
        }
    }), new PureCounter
}();


const updateProperties = (elem, state) => {
    elem.style.setProperty('--x', `${state.x}px`)
    elem.style.setProperty('--y', `${state.y}px`)
    elem.style.setProperty('--width', `${state.width}px`)
    elem.style.setProperty('--height', `${state.height}px`)
    elem.style.setProperty('--radius', state.radius)
    elem.style.setProperty('--scale', state.scale)
  }
  
  document.querySelectorAll('.cursor').forEach(cursor => {
    let onElement
  
    const createState = e => {
      const defaultState = {
        x: e.clientX,
        y: e.clientY,
        width: 40,
        height: 40,
        radius: '50%'
      }
  
      const computedState = {}
  
      if (onElement != null) {
        const { top, left, width, height } = onElement.getBoundingClientRect()
        const radius = window.getComputedStyle(onElement).borderTopLeftRadius
  
        computedState.x = left + width / 2
        computedState.y = top + height / 2
        computedState.width = width
        computedState.height = height
        computedState.radius = radius
      }
  
      return {
        ...defaultState,
        ...computedState
      }
    }
  
    document.addEventListener('mousemove', e => {
      const state = createState(e)
      updateProperties(cursor, state)
    })
  
    document.querySelectorAll('a, button').forEach(elem => {
      elem.addEventListener('mouseenter', () => (onElement = elem))
      elem.addEventListener('mouseleave', () => (onElement = undefined))
    })
  })
  


