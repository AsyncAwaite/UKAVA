import {getElement, getElements} from "./helpers.js";
import modalsEvents from "./modalsEvents.js";
import Modal from "./modal.js";
import PerfectScrollbar from 'perfect-scrollbar';

export default function reviews() {
    getElements('[data-review]').forEach(reviewItem => {
        reviewItem.addEventListener('click', () => {
            modalsEvents(reviewItem);
            new Modal(".modal__review").openModal();
            let text = getElement(".modal__review").querySelector('.reviews-item__text');
            let scroll = getElement(".modal__review").querySelector('.scroll__item');
            const ps = new PerfectScrollbar(text, {maxScrollbarLength: 175});
            return
            scroll.parentElement.style.height = text.scrollHeight + 'px'
            text.addEventListener('scroll', (e) => {
                let distance = scroll.parentElement.clientY - text.offsetTop - scroll.offsetHeight / 2;
                // if (e.target.scrollHeight -  e.target.scrollTop > e.target.offsetTop){
                // if (scroll.parentElement.style.top <= e.target.scrollTop)
                console.log(scroll.parentElement.clientY,text.offsetTop, scroll.offsetHeight)
                scroll.style.transform = `translate(-50%, ${e.target.scrollTop}px)`;
                // }
                //
                // console.log(e.target.scrollHeight - e.target.scrollTop)
                // console.log(e.target.scrollTop)
            })
            console.dir(text)
        })
    })


}