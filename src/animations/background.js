import {gsap} from "gsap";

let tl_day;
let tl_night;

/**
 * Initialize gsap timelines for animation
 * @param day_el The dom element for the day background
 * @param night_el The dom element for the night background
 */
const animations_init = (day_el, night_el) => {
    const defaultTweenOptions = {duration: 1, ease:"power2.in"}
    // Day animation definition
    tl_day = gsap.timeline({
        paused: true,
        onComplete : () => gsap.set(night_el, {autoAlpha:0}),
        defaults: defaultTweenOptions
    });
    tl_day.to(day_el, {autoAlpha: 1})

    // Night animation definition
    tl_night = gsap.timeline({
        paused: true,
        onComplete : () => gsap.set(day_el, {autoAlpha:0}),
        defaults: defaultTweenOptions
    });
    tl_night.to(night_el, {autoAlpha: 1})
};

/**
 * Animation to display the daytime background
 */
const animation_day = () => {
    tl_night.pause();
    swap_bg_div(true)

    if (tl_day.time() !== 0 && tl_day.time() < tl_day.totalDuration()) {
        tl_day.resume()
    } else {
        tl_day.restart()
    }
}

/**
 * Animation to display the night background
 */
const animation_night = () => {
    tl_day.pause();
    swap_bg_div(false)

    if (tl_night.time() !== 0 && tl_night.time() < tl_night.totalDuration() ) {
        tl_night.resume()
    } else {
        tl_night.restart()
    }
}

/**
 * Swap the z-index of the div
 * @param day_bg_on_foreground id the day background at foreground
 */
const swap_bg_div = (day_bg_on_foreground = false) => {
    const day_bg_el = tl_day.getChildren()[0].targets()[0];
    const night_bg_el = tl_night.getChildren()[0].targets()[0];
    if(day_bg_on_foreground){
        gsap.set(day_bg_el, {zIndex: 2, autoAlpha: 0,})
        gsap.set(night_bg_el, {zIndex: 1})
    }else{
        gsap.set(night_bg_el, {zIndex: 2, autoAlpha: 0,})
        gsap.set(day_bg_el, {zIndex: 1})
    }
}

export {animation_day, animation_night, animations_init}
