import {getElement, removeActive} from "./helpers.js";

export default function willGet() {
    const nav = getElement('[data-will-get="nav"]');
    if (!nav) return;
    const image = getElement('[data-will-get="image"]');
    const navBtns = nav.querySelectorAll('button');
    const counter = nav.querySelector('.counter__current')
    let index = 1;
    image.querySelector('img').style.width = image.clientWidth * 2 + 'px';
    console.log( image.querySelector('img'))
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('next')) {
                if (index !== 3) {
                    index++;
                    if (btn.classList.contains('swiper-button-disabled')) btn.classList.remove('swiper-button-disabled')
                }
                if (index == 3) btn.classList.add('swiper-button-disabled')
            } else {
                if (index !== 1) {
                    index--;
                    if (btn.classList.contains('swiper-button-disabled')) btn.classList.remove('swiper-button-disabled')
                }
                if (index == 1) btn.classList.add('swiper-button-disabled')
            }
            if (index > 1 && index !== 3) {
                removeActive(navBtns, 'swiper-button-disabled')
            }
            switch (index){
                case 1:
                    image.querySelector('img').style.transform = 'translateX(0)'
                    break;
                case 2:
                    image.querySelector('img').style.transform = `translateX(-${image.clientWidth / 2}px)`
                    break;
                case 3:
                    image.querySelector('img').style.transform = `translateX(-${image.clientWidth}px)`
                    break;
            }
            counter.innerText = index;
        })

    })
}