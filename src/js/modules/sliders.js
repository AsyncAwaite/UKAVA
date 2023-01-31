import Swiper from "swiper";
import SwiperCore, {
    Navigation,
    Autoplay,
    Pagination,
    Lazy,
} from "swiper/core";

SwiperCore.use([Navigation, Autoplay, Pagination, Lazy]);
import {getElement} from "./helpers.js";
export default function  sliders (){
    let speakerSlider, webinarSlider;
    speakersSlider();
    webinarGallerySlider()
    reviewsSwiper()
    window.addEventListener('orientationchange', () => {
        speakersSlider();
        webinarGallerySlider()
    })
    if (getElement('.founder')){
        const swiperQuotes = new Swiper(".quotes__slider", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            runCallbacksOnInit: true,
            navigation: {
                nextEl: ".quotes__nav-next",
                prevEl: ".quotes__nav-prev",
            },

            on: {
                slideChange: function () {
                    var currentSlide = this.realIndex + 1;
                    document.querySelector(
                        ".counter__current"
                    ).innerHTML = `${currentSlide}`;
                },
                beforeInit: function () {
                    let numOfSlides =
                        this.wrapperEl.querySelectorAll(".swiper-slide").length;
                    document.querySelector(".counter__total").innerHTML = `${numOfSlides}`;
                },
            },
        });
    }



    function speakersSlider() {
        if (!getElement('#speakers-slider')) return;
        let currentSlide = getElement('#speakers-slider').querySelector(
            ".counter__current");
        if (matchMedia("(max-width: 767px)").matches) {
            speakerSlider = new Swiper(
                getElement('#speakers-slider'),
                {
                    slidesPerView: 1.35,
                    spaceBetween: 15,
                    slideClass: "speaker__item ",
                    preloadImages: false,
                    loopFillGroupWithBlank: true,
                    runCallbacksOnInit: true,
                    lazy: true,
                    // allowTouchMove: false,
                    navigation: {
                        nextEl: ".speakers-slider__next",
                        prevEl: ".speakers-slider__prev",
                    },
                    on: {
                        init: function(){
                            currentSlide.innerHTML = this.realIndex / 1 + 1
                        },
                        slideChange: function(){
                            currentSlide.innerHTML = this.realIndex /  1 + 1
                        },

                        beforeInit: function () {
                            let numOfSlides =
                                this.wrapperEl.querySelectorAll(".speaker__item").length;
                            getElement('#speakers-slider').querySelector(".counter__total").innerHTML = `${numOfSlides}`;
                        },
                    },
                }
            );
        } else {
            if (speakerSlider) {
                speakerSlider.destroy();
            }
        }
    }
    function webinarGallerySlider() {
        if (!getElement('#webinar-gallery__slider')) return;
        let currentSlide = getElement('#webinar-gallery__slider').querySelector(
            ".counter__current");
        if (matchMedia("(max-width: 767px)").matches) {
            webinarSlider = new Swiper(
                getElement('#webinar-gallery__slider'),
                {
                    slidesPerView: 1.35,
                    spaceBetween: 15,
                    slideClass: "webinar-gallery__item",
                    preloadImages: false,
                    loopFillGroupWithBlank: true,
                    runCallbacksOnInit: true,
                    lazy: true,
                    // allowTouchMove: false,
                    navigation: {
                        nextEl: ".webinar-gallery-slider__next",
                        prevEl: ".webinar-gallery-slider__prev",
                    },
                    on: {
                        init: function(){
                            currentSlide.innerHTML = this.realIndex / 1 + 1
                        },
                        slideChange: function(){
                            currentSlide.innerHTML = this.realIndex /  1 + 1
                        },

                        beforeInit: function () {
                            let numOfSlides =
                                this.wrapperEl.querySelectorAll(".webinar-gallery__item").length;
                            getElement('#webinar-gallery__slider').querySelector(".counter__total").innerHTML = `${numOfSlides}`;
                        },
                    },
                }
            );
        } else {
            if (webinarSlider) {
                webinarSlider.destroy();
            }
        }
    }
    function reviewsSwiper() {
        if (!getElement('[data-reviews]')) return;


          let  reviewsSlider = new Swiper(
                getElement('[data-reviews]'),
                {
                    slidesPerView: 2,

                    spaceBetween: 0,
                    preloadImages: false,
                    loopFillGroupWithBlank: true,
                    runCallbacksOnInit: true,
                    lazy: true,
                    // allowTouchMove: false,
                    navigation: {
                        nextEl: ".webinar-gallery-slider__next",
                        prevEl: ".webinar-gallery-slider__prev",
                    },
                    breakpoints: {
                        1440: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 1.75,
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

                }
            );

    }
}

