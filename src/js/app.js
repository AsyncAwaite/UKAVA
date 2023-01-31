"use strict";
import * as flsFunctions from "./modules/functions.js";
import Form from "./modules/Form.js";
// import AOS from "aos";
import {header, footer} from "./modules/elements.js";
import burger from "./modules/burger.js";
import {scrollToAnchor} from "./modules/scrollToAnchor.js";
import sliders from "./modules/sliders.js";
import renderSpeakers from "./modules/speakers.js";
import handleMarquee from "./modules/handleMarquee.js";
import pages from "./modules/pages.js";
import {getElement} from "./modules/helpers.js";
import reviews from "./modules/reviews.js";

flsFunctions.isWebp();
document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
window.addEventListener('resize', function () {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
});
window.addEventListener('scroll', function () {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
});
window.addEventListener("DOMContentLoaded", () => {
    try {

        burger();
        headerFixed();


    } catch (e) {
        console.log(e);
    }
});


//
function headerFixed() {
    if (header) {
        window.addEventListener("scroll", () => {
            try {
                if (scrollY >= header.clientHeight ) {
                    header.classList.add("--fixed");
                } else {
                    header.classList.remove("--fixed");
                }
            } catch (e) {
                console.log(e);
            }
        });

    }
}

//
// function scrollBar() {
//     let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//     let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     let scrolled = (winScroll / height) * 100;
//     document.getElementById("progress-bar").style.width = scrolled + "%";
// }
