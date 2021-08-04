import {gsap} from "gsap";

let tl_day;
let tl_night;

const animations_init = (day_el, night_el) => {
    console.log("init des anim de bg")
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
const animation_day = () => {
    tl_night.pause();
    swap_bg_div(true)

    if (tl_day.time() !== 0 && tl_day.time() < tl_day.totalDuration()) {
        tl_day.resume()
    } else {
        tl_day.restart()
    }
}

const animation_night = () => {
    tl_day.pause();
    swap_bg_div(false)

    if (tl_night.time() !== 0 && tl_night.time() < tl_night.totalDuration() ) {
        tl_night.resume()
    } else {
        tl_night.restart()
    }
}

const swap_bg_div = (day_bg_on_foreground = false) => {
    const day_bg_el = tl_day.getChildren()[0].targets()[0];
    const night_bg_el = tl_night.getChildren()[0].targets()[0];
    if(day_bg_on_foreground){
        console.log("Je swap pour mettre le bg day en premier plan");
        gsap.set(day_bg_el, {zIndex: 2, autoAlpha: 0,})
        gsap.set(night_bg_el, {zIndex: 1})
    }else{
        console.log("Je swap pour mettre le bg night en premier plan");
        gsap.set(night_bg_el, {zIndex: 2, autoAlpha: 0,})
        gsap.set(day_bg_el, {zIndex: 1})
    }
}

export {animation_day, animation_night, animations_init}
