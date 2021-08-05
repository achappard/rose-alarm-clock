import gsap from "gsap";

const width_app = 512;
const width_burger = 35;

/**
 * Animation for open the menu
 * @param el The menu dom element
 */
const openMenu = (el) => {
    const sectionContentEl = el.querySelector("#settings-content");
    const title = sectionContentEl.querySelector("h1")
    const form = sectionContentEl.querySelector("form")
    gsap.killTweensOf(el);
    gsap.killTweensOf(title);
    gsap.killTweensOf(form);
    
    const tl = gsap.timeline();
    tl.to(el, {x: (width_burger * -1), ease: "expo.out"})
        .fromTo(title, {x:-20, autoAlpha:0},{x:0, autoAlpha:1}, '-=0.4')
        .fromTo(form, {x:-20, autoAlpha:0},{x:0, autoAlpha:1}, '-=0.4');
    
}

/**
 * Animation for close the menu
 * @param el The menu dom element
 */
const closeMenu = (el) => {
    const sectionContentEl = el.querySelector("#settings-content");
    const title = sectionContentEl.querySelector("h1")
    const form = sectionContentEl.querySelector("form")
    gsap.killTweensOf(el);
    gsap.killTweensOf(title);
    gsap.killTweensOf(form);
    
    const tl = gsap.timeline();
    tl.to(form, {x:0, autoAlpha:0})
        .to(title, {x:0, autoAlpha:0},'-=0.3')
        .to(el, {x: (width_app - width_burger) * -1, ease: "expo.out"},'-=0.3');
}

export {openMenu, closeMenu}
