import gsap from "gsap";

const width_app = 512;
const width_burger = 35;
const openMenu = (el) => {
    gsap.killTweensOf(el);
    gsap.to(el, {x: (width_burger * -1), ease: "expo.out"});
}
const closeMenu = (el) => {
    gsap.killTweensOf(el);
    gsap.to(el, {x: (width_app - width_burger) * -1, ease: "expo.out"});
}
export {openMenu, closeMenu}
