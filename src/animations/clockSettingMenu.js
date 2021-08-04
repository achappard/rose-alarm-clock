import gsap from "gsap";

const width_app = 512;
const width_burger = 35;

/**
 * Animation for open the menu
 * @param el The menu dom element
 */
const openMenu = (el) => {
    gsap.killTweensOf(el);
    gsap.to(el, {x: (width_burger * -1), ease: "expo.out"});
}

/**
 * Animation for close the menu
 * @param el The menu dom element
 */
const closeMenu = (el) => {
    gsap.killTweensOf(el);
    gsap.to(el, {x: (width_app - width_burger) * -1, ease: "expo.out"});
}

export {openMenu, closeMenu}
