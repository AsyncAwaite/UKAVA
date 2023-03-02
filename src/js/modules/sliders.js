import Swiper from "swiper";
import SwiperCore, {
    Navigation,
    Autoplay,
    Pagination,
    Lazy
} from "swiper/core";

SwiperCore.use([Navigation, Autoplay, Pagination, Lazy]);
import {getElement} from "./helpers.js";

export default function sliders() {

    reviewsSwiper()

    function reviewsSwiper() {
        if (!getElement('.reviews-swiper')) return;
        let currentSlide = getElement('.reviews').querySelector(
            ".counter__current");

        let reviewsSlider = new Swiper(
            getElement('.reviews-swiper'),
            {
                slidesPerView: 3,

                spaceBetween: 50,
                preloadImages: false,
                loopFillGroupWithBlank: true,
                runCallbacksOnInit: true,
                lazy: true,
                navigation: {
                    nextEl: ".reviews-button-next",
                    prevEl: ".reviews-button-prev",
                },
                // loop: true,
                breakpoints: {
                    1600: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    // 992: {
                    //     slidesPerView: 2,
                    //     spaceBetween: 0,
                    // },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },

                    // 320: {
                    //     slidesPerView: 1,
                    // },
                },
                on: {
                    init: function () {
                        currentSlide.innerHTML = this.realIndex / 1 + 1


                    },
                    slideChange: function () {
                        currentSlide.innerHTML = this.realIndex / 1 + 1

                    },

                    beforeInit: function () {

                        let numOfSlides =
                            this.wrapperEl.querySelectorAll(".swiper-slide").length;
                        getElement('.reviews').querySelector(".counter__total").innerHTML = `${numOfSlides}`;
                    },
                },

            }
        );

    }
}

