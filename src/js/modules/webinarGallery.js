import {arrayToChunks, getElement} from "./helpers.js";

import modalsEvents from "./modalsEvents.js";
import {header, modal, modalBody} from "./elements.js";
import Modal from "./modal.js";


export default function renderSpeakers(speakers) {


    let index = 1;
    if (!getElement('[data-webinar-gallery]')) return;
    const parent = getElement('[data-webinar-gallery]');
    if (!parent) return;

    const showBtn = getElement('[data-webinar-gallery="show"]');
    const hideBtn = getElement('[data-webinar-gallery="hide"]');


    if (showBtn) {
        showBtn.addEventListener('click', () => {

            index++;
            if (index == 2) {
                hideBtn.classList.remove('hide')
                hideBtn.classList.add('show')
            }

            if (index === speakersArr.length) {
                showBtn.classList.add('hide');
            }
        })

    }
    if (hideBtn) {
        hideBtn.classList.add('hide')
        hideBtn.addEventListener('click', () => {
            if (index > 1) {

                index = 1;
                window.scrollTo({
                    top: parent.offsetParent.offsetTop - header.offsetHeight, behavior: "smooth",
                });
                showBtn.classList.remove('hide');
                hideBtn.classList.remove('show');
                hideBtn.classList.add('hide')
            }
        })
    }



}

