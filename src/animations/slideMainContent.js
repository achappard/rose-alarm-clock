import gsap from "gsap";

const width_app = 512;

/**
 * Animation for sliding content to the right
 * @param el The content dom element
 */
const slideToRight = (el) => {
    gsap.killTweensOf(el);
     gsap.to(el, {x: width_app / 2, autoAlpha:0, ease: "expo.out", delay:.1});
}

/**
 * Animation for sliding content to the left
 * @param el The content dom element
 */
const slideToLeft = (el) => {
    gsap.killTweensOf(el);
    gsap.to(el, {x: 0, autoAlpha:1, ease: "expo.out", delay:.3});
}
export {slideToRight, slideToLeft}
