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
    gsap.killTweensOf(el);
    gsap.killTweensOf(title);
    
    const tl = gsap.timeline();
    tl.to(el, {x: (width_burger * -1), ease: "expo.out"})
        .fromTo(title, {x:-20, autoAlpha:0},{x:0, autoAlpha:1}, '-=0.4');
    
}

/**
 * Animation for close the menu
 * @param el The menu dom element
 */
const closeMenu = (el) => {
    const sectionContentEl = el.querySelector("#settings-content");
    const title = sectionContentEl.querySelector("h1")
    gsap.killTweensOf(el);
    gsap.killTweensOf(title);
    //gsap.to(el, {x: (width_app - width_burger) * -1, ease: "expo.out"});
    
    const tl = gsap.timeline();
    tl.to(title, {x:0, autoAlpha:0})
        .to(el, {x: (width_app - width_burger) * -1, ease: "expo.out"},'-=0.3');
}

export {openMenu, closeMenu}
