import {arrayToChunks, getElement} from "./helpers.js";

import modalsEvents from "./modalsEvents.js";
import {header, modal, modalBody} from "./elements.js";
import Modal from "./modal.js";



export default function renderSpeakers(speakers) {
    if (!speakers) return;
    const speakersArr = arrayToChunks(8, speakers);
    let index = 1;
    if (!getElement('[data-speakers]')) return;
    const parent = getElement('[data-speakers]');
    if (!parent) return;

    const showBtn = getElement('[data-speakers="show"]');
    const hideBtn = getElement('[data-speakers="hide"]');
    parent.innerHTML = renderArticles(speakersArr, 0);
    if (showBtn) {
        showBtn.addEventListener('click', () => {
            parent.innerHTML += renderArticles(speakersArr, index);
            index++;
            if (index == 2) {
                hideBtn.classList.remove('hide')
                hideBtn.classList.add('show')
            }
            createDescrModal();
            if (index === speakersArr.length) {
                showBtn.classList.add('hide');
            }
        })

    }
    if (hideBtn) {
        hideBtn.classList.add('hide')
        hideBtn.addEventListener('click', () => {
            if (index > 1) {
                parent.innerHTML = renderArticles(speakersArr, 0);
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
    if (matchMedia("(max-width: 767px)").matches) {
        parent.innerHTML = ``;
        speakers.forEach(({name, name_en, desr, desr_en, photo, fb, wiki}) => {
            parent.innerHTML += renderItem(name, name_en, desr, desr_en, photo, fb, wiki)
        });
    }
    window.addEventListener('orientationchange', () => {
        if (matchMedia("(max-width: 767px)").matches) {
            parent.innerHTML = ``;
            speakers.forEach(({name, name_en, desr, desr_en, photo, fb, wiki}) => {
                parent.innerHTML += renderItem(name, name_en, desr, desr_en, photo, fb, wiki)
            })
        } else {
            parent.innerHTML = ``;
            parent.innerHTML = renderArticles(speakersArr, 0);
        }
    })
    createDescrModal();

    function createDescrModal() {
        document.querySelectorAll('[data-speaker-descr]').forEach(item => {
            item.addEventListener('click', () => {
                modalsEvents(item);
                new Modal(".modal__speaker-descr").openModal();
            })
        })
    }

    function renderArticles(arr, i) {
        if (arr[i].length < 8 ) {
            showBtn.classList.add('hide');
        }
        if (i < arr.length) {

            let fragment = '';
            arr[i].forEach(({name, name_en, desr, desr_en, photo, fb, wiki}) => {
                fragment += renderItem(name, name_en, desr, desr_en, photo, fb, wiki)

            });

            return fragment;
        }
    }

    function renderItem(name, name_en, desr, desr_en, photo, fb, wiki) {
        let txt = !isEn ? 'вікіпедія' : 'wikipedia';
        return `<div class="speaker__item txt-primary flex --dir-col --just-between">
<div class="flex --dir-col speaker__descr">
                    <div class="image">
                        <img src="${photo}" alt="${!isEn ? name : name_en}" class='lazyload'>
                    </div>
                    <div class="name">
                    ${!isEn ? name : name_en}
                    </div>
                    <div class="role">
                    ${!isEn ? renderDescr(desr, name) : renderDescr(desr_en, name_en)}
                    </div>
</div>
                    <div class="speaker__social flex txt-upper">
         
                    ${renderSpeakerLink('facebook', fb)}
                    ${renderSpeakerLink(txt, wiki)}
                    </div>
                    </div>`
    }

    function renderSpeakerLink(value, link) {
        if (!link) return '';
        return `
         <a href="${link}">${value}</a>
        `;
    }

    function renderDescr(descr, name) {
        if (descr.length > 130) {
            let main = descr.substr(0, 120) + '...';
            return `${main} <span data-speaker-descr="${name}">${!isEn ? 'читати' : 'read more'}</span>`;
        } else {
            return descr;
        }


    }
}

