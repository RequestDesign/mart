
import $ from 'jquery'
import Inputmask from 'inputmask'
import { Navigation, Pagination, Grid, Autoplay, Mousewheel, EffectFade, EffectCreative } from 'swiper/modules';
import Swiper from 'swiper';
import Form from './utils/Form';
import { rem } from './utils/constants'


const HTML = $('html'),
    SWIPE_SIZE = 100,
    IS_MOBILE = window.innerWidth < 768
$(function () {
    document.querySelectorAll('[data-anime-delay],[data-anime-speed]')
        .forEach((el) => {
            if (el.dataset.animeDelay) {
                el.style.animationDelay = el.dataset.animeDelay
            }

            if (el.dataset.animeSpeed) {
                el.style.animationDuration = el.dataset.animeSpeed

            }

        })

    dropDowns()
    iniSwipers()
    mainPageCore()
    initForms()
    modalsHandler()


})
function mainPageCore() {

    const main = document.querySelector('.main-swiper.swiper')
    if (!main) return
    const wrapper = main.querySelector('.swiper-wrapper')

    wrapper.querySelectorAll('section')
        .forEach((e) => {
            e.classList.add('page-slide')
        })

    let touchStart = 0

    function sectionState(swiper, slide) {
        /**
         * @param {swiper} Swiper 
         * @param {slide} domElement 
         */

        slide.addEventListener('touchstart', (ev) => {
            touchStart = ev.touches[0].clientY
        })

        slide.addEventListener('touchend', (ev) => {
            const end = ev.changedTouches[0].pageY
            if (end > touchStart + SWIPE_SIZE) {
                if (slide.dataset.animeState <= 1) {
                    swiper.mousewheel.enable()
                    swiper.allowTouchMove = true
                    swiper.slidePrev()

                } else {
                    slide.dataset.animeState--

                }
            } else if (end + SWIPE_SIZE < touchStart) {
                if (slide.dataset.animeState >= slide.dataset.animeStates) {

                    if (swiper.slides[swiper.activeIndex + 1]) {
                        swiper.mousewheel.enable()
                        swiper.allowTouchMove = true
                        swiper.slideNext()
                    }


                } else {
                    slide.dataset.animeState++

                }

            }
            touchStart = 0


        })

        if (slide.dataset.animeDesktops) {

            let wheelIsReady = true
            slide.addEventListener('wheel', (ev) => {

                const slide = ev.currentTarget

                if (!wheelIsReady) return
                wheelIsReady = false
                setTimeout(() => {
                    wheelIsReady = true
                }, 1000);




                if (ev.deltaY > 0) {
                    /*  console.log("Прокрутка вниз"); */
                    if (slide.dataset.animeDesktop >= slide.dataset.animeDesktops) {
                        if (swiper.slides[swiper.activeIndex + 1]) {

                            swiper.slideNext()
                            swiper.mousewheel.enable()
                            swiper.allowTouchMove = true
                            slide.dataset.animeDesktop = '0'
                            slide.dataset.animeState = '0'

                        }


                    } else {
                        slide.dataset.animeDesktop++

                    }

                } else if (ev.deltaY < 0) {
                    /* console.log("Прокрутка вверх"); */
                    if (slide.dataset.animeDesktop <= 1) {
                        if (swiper.slides[swiper.activeIndex - 1]) {
                            swiper.slidePrev()
                            swiper.mousewheel.enable()
                            swiper.allowTouchMove = true
                        }


                    } else {
                        slide.dataset.animeDesktop--

                    }

                }

                if (slide.dataset.isvideo) {
                    const v = slide.querySelector('video')
                    if (slide.dataset.animeDesktop == 2 || slide.dataset.animeState == 2) {
                        console.log('play');
                        v.play()
                    } else {
                        console.log('stop');
                        v.pause()
                    }
                }

            })
        }

    }
    function sectionSlider(swiperCore, swiperSlider, slide) {
        /**
         * коровый страничный слайдер
         * @param {swiperCore} Swiper 
         * слайдер секции
         * @param {swiperSlider} Swiper 
         * @param {slide} domElement 
         */
        slide.addEventListener('touchstart', (ev) => {
            touchStart = ev.touches[0].clientY
        })
        slide.addEventListener('touchend', (ev) => {
            const end = ev.changedTouches[0].pageY
            if (end > touchStart + SWIPE_SIZE && swiperSlider.activeIndex <= 0) {
                swiperCore.mousewheel.enable()
                swiperCore.allowTouchMove = true
                swiperCore.slidePrev()
            } else if (end + SWIPE_SIZE < touchStart && swiperSlider.activeIndex >= swiperSlider.slides.length - 1) {
                swiperCore.mousewheel.enable()
                swiperCore.allowTouchMove = true
                swiperCore.slideNext()
            }
        })
        let wheelIsReady = true
        slide.addEventListener('wheel', (ev) => {

            if (!wheelIsReady) return
            wheelIsReady = false
            setTimeout(() => {
                wheelIsReady = true
            }, 500);

            if (ev.deltaY > 0) {
                /*  console.log("Прокрутка вниз"); */
                if (swiperSlider.activeIndex >= swiperSlider.slides.length - 1) {
                    swiperCore.mousewheel.enable()
                    swiperCore.allowTouchMove = true
                    swiperCore.slideNext()
                } else {
                    swiperSlider.slideNext()
                }

            } else if (ev.deltaY < 0) {
                /* console.log("Прокрутка вверх"); */
                if (swiperSlider.activeIndex <= 0) {

                    swiperCore.mousewheel.enable()
                    swiperCore.allowTouchMove = true
                    swiperCore.slidePrev()
                } else {
                    swiperSlider.slidePrev()
                }

            }

        })
    }

    const swiper = new Swiper(main, {
        modules: [Mousewheel, EffectCreative],
        direction: 'vertical',
        effect: 'creative',
        creativeEffect: {},
        initialSlide: localStorage.getItem('coreSwiper') ? localStorage.getItem('coreSwiper') : 0 ,
        followFinger: false,
        slidesPerView: 1,
        mousewheel: true,
        simulateTouch: false,
        slideClass: 'page-slide',
        noSwipingClass: 'page-slide-stop',
        speed: 1000,
        slideActiveClass: 'core-slide-active',
        /* shortSwipes: false, */
        threshold: SWIPE_SIZE,
        preventInteractionOnTransition: true,
        on: {
            init: (swiper) => {
                swiper.slides[swiper.activeIndex].classList.add('anime-start')
                swiper.slides.forEach((el) => {

                    if (el.dataset.animeStates) {
                        el.dataset.animeState = '1'
                        if (el.dataset.animeDesktops) {
                            el.dataset.animeDesktop = '1'

                        }

                        sectionState(swiper, el)
                    }

                    if (el.dataset.animeSlider) {
                        const cfg = {
                            default: {
                                modules: [Mousewheel],
                                direction: 'vertical',
                                spaceBetween: rem(3),
                                slidesPerView: 'auto',
                                mousewheel: false,
                                simulateTouch: false
                            },
                            gallery: {
                                modules: [Mousewheel, Grid],
                                slidesPerGroup: 2,
                                slidesPerView: 'auto',
                                direction: 'vertical',
                                grid: {
                                    fill: 'row',
                                },
                                spaceBetween: rem(3),
                                mousewheel: false,
                                simulateTouch: false
                            }
                        }
                        const slider = new Swiper(el.querySelector('.swiper'), cfg.default)
                        sectionSlider(swiper, slider, el)
                    }

                    if (el.classList.contains('section-with-topper')) {
                        sectionTopper(el)
                    }
                })


                if (IS_MOBILE) {

                    if (swiper.slides[swiper.activeIndex].dataset.animeStates) {
                        swiper.mousewheel.disable()
                        swiper.allowTouchMove = false
                    }
                } else {
                    if (swiper.slides[swiper.activeIndex].dataset.animeSlider
                        ||
                        swiper.slides[swiper.activeIndex].dataset.animeDesktops) {
                        swiper.mousewheel.disable()
                        swiper.allowTouchMove = false
                    }
                }
            },

            slidePrevTransitionStart: (swiper) => {

                swiper.slides[swiper.activeIndex + 1].classList.add('anime-over')


            },
            slideNextTransitionStart: (swiper) => {

                if (swiper.activeIndex - 1 >= 0) {
                    swiper.slides[swiper.activeIndex - 1].classList.add('anime-over')
                } else {
                    swiper.slides[swiper.slides.length - 1].classList.add('anime-over')
                }
                swiper.slides[swiper.activeIndex - 1].classList.remove('anime-start')
            },
            slideChangeTransitionStart: (swiper) => {
                console.log('start', swiper.activeIndex)
                if (swiper.slides[swiper.activeIndex].dataset.animeStates) {
                    swiper.slides[swiper.activeIndex].dataset.animeState = 1
                }
                if (swiper.slides[swiper.activeIndex].dataset.animeDesktops) {
                    swiper.slides[swiper.activeIndex].dataset.animeDesktop = 1
                }
            },
            slideChangeTransitionEnd: (swiper) => {
                console.log('end', swiper.activeIndex);
                swiper.slides[swiper.activeIndex].classList.remove('anime-over')
                swiper.slides[swiper.activeIndex].classList.add('anime-start')
                const activeSlide = swiper.slides[swiper.activeIndex]


                if (swiper.slides[swiper.activeIndex - 1] && swiper.slides[swiper.activeIndex - 1].dataset.animeStates) {
                    swiper.slides[swiper.activeIndex - 1].dataset.animeState = 1
                }
                if (swiper.slides[swiper.activeIndex + 1] && swiper.slides[swiper.activeIndex + 1].dataset.animeStates) {
                    swiper.slides[swiper.activeIndex + 1].dataset.animeState = 1
                }


                if (activeSlide.dataset.animeStates && window.innerWidth < 769) {
                    swiper.mousewheel.disable()
                    swiper.allowTouchMove = false
                    activeSlide.dataset.animeState = 1
                }
                if (activeSlide.dataset.animeDesktops && window.innerWidth > 769) {
                    swiper.mousewheel.disable()
                    swiper.allowTouchMove = false
                    activeSlide.dataset.animeDesktop = 1
                }

                if (activeSlide.dataset.animeSlider) {
                    swiper.mousewheel.disable()
                    swiper.allowTouchMove = false
                }




            }
        }

    })

}


function iniSwipers() {
    const ourProjects = document.querySelector('.our-projects');

    if (ourProjects) {
        new Swiper(ourProjects.querySelector('.swiper'), {
            modules: [Navigation, EffectFade],
            slidesPerView: 1,
            simulateTouch: false,
            effect: 'fade',
            speed: 100,
            followFinger: false,
            touchMoveStopPropagation: true,
            fadeEffect: {
                crossFade: false
            },
            navigation: {
                prevEl: ourProjects.querySelector('.swiper-btn-prev'),
                nextEl: ourProjects.querySelector('.swiper-btn-next')
            }

        })
    }

    const ourSpecialists = document.querySelector('.our-specialists')
    if (ourSpecialists) {
        new Swiper(ourSpecialists.querySelector('.swiper'), {
            modules: [Navigation, EffectFade],
            slidesPerView: 1,
            effect: 'fade',
            speed: 100,

            followFinger: false,
            fadeEffect: {
                crossFade: false
            },
            simulateTouch: false,
            navigation: {
                prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
                nextEl: ourSpecialists.querySelector('.swiper-btn-next'),

            }
        })



    }

    const results = document.querySelector('.results')
    if (results) {
        const one = new Swiper(results.querySelector('.swiper'), {
            modules: [Navigation, EffectFade],
            effect: 'fade',
            speed: 100,
            followFinger: false,

            fadeEffect: {
                crossFade: false
            },
            navigation: {
                prevEl: results.querySelector('.swiper-btn-prev'),
                nextEl: results.querySelector('.swiper-btn-next')
            },
            slidesPerView: 1,

        })

    }


    const twoSlider = document.querySelector('.two-slider')
    if (twoSlider) {
        if (window.innerWidth < 768) {
            new Swiper(twoSlider.querySelector('.swiper'), {
                modules: [Navigation, EffectFade,],
                effect: window.innerWidth < 768 ? 'fade' : 'slide',
                followFinger: false,
                speed: 100,
                preventInteractionOnTransition: true,
                fadeEffect: {
                    crossFade: false
                },
                navigation: {
                    prevEl: twoSlider.querySelector('.swiper-btn-prev'),
                    nextEl: twoSlider.querySelector('.swiper-btn-next'),
                },
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: rem(8),
                on: {
                    init: (swiper) => {
                        swiper.slides.forEach((e, i) => {

                            e.querySelector('.two-slider__slide-body-count')
                                .textContent = (i + 1).toString().padStart(2, '0')
                        })
                    },
                }
                /*   breakpoints:{
                      768:{
                          slidesPerGroup: 2
                      }
                  } */

            })
        } else {
            const next = twoSlider.querySelector('.swiper-btn-next'),
                prev = twoSlider.querySelector('.swiper-btn-prev')
            prev.setAttribute('disabled', true)

            next.addEventListener('click', (ev) => {
                if (twoSlider.dataset.twoslideState < 2) {
                    twoSlider.dataset.twoslideState++
                    ev.currentTarget.setAttribute('disabled', true)
                    prev.removeAttribute('disabled')
                }

            })
            prev.addEventListener('click', (ev) => {
                if (twoSlider.dataset.twoslideState > 1) {
                    twoSlider.dataset.twoslideState--
                    ev.currentTarget.setAttribute('disabled', true)
                    next.removeAttribute('disabled')
                }
            })


        }
    }

    const care = document.querySelector('.arch-care')
    if (care) {
        new Swiper(care.querySelector('.swiper'), {
            navigation: [Navigation],
            simulateTouch: false,
            followFinger: false,
            spaceBetween: rem(4.4),
            slidesPerView: 1.4,
            breakpoints: {
                768: {
                    slidesPerView: 4
                }
            },
            navigation: {
                prevEl: care.querySelector('.swiper-btn-prev'),
                nextEl: care.querySelector('.swiper-btn-next'),
            }
        })
    }

    const superAdv = document.querySelector('.supervisor-adv')
    if (superAdv) {

        const right = new Swiper(superAdv.querySelectorAll('.swiper')[1], {
            modules: [EffectFade],
            slidesPerView: 1,
            effect: 'fade',
            speed: 100,
            initialSlide: 1,
            followFinger: false,
            fadeEffect: {
                crossFade: false
            },
            simulateTouch: false,
            allowTouchMove: false,
            on: {
                init: (s) => {
                    s.slides.forEach((el, i) => {
                        el.querySelector('.supervisor-adv__sliders-el-text-count')
                            .textContent = (i + 1).toString().padStart(2, '0')
                    })
                }
            }



        })
        const left = new Swiper(superAdv.querySelectorAll('.swiper')[0], {
            modules: [Navigation, EffectFade],
            slidesPerView: 1,
            effect: 'fade',
            speed: 100,
            initialSlide: 0,
            followFinger: false,
            fadeEffect: {
                crossFade: false
            },
            simulateTouch: false,
            navigation: {
                prevEl: superAdv.querySelector('.swiper-btn-prev'),
                nextEl: superAdv.querySelector('.swiper-btn-next'),

            },
            on: {
                slideChange: (s) => {
                    right.slideTo(s.activeIndex + 1)
                    if (window.innerWidth > 768 && s.activeIndex >= s.slides.length - 2) {
                        s.allowSlideNext = false
                    } else {
                        s.allowSlideNext = true

                    }
                },
                init: (s) => {
                    s.slides.forEach((el, i) => {
                        el.querySelector('.supervisor-adv__sliders-el-text-count')
                            .textContent = (i + 1).toString().padStart(2, '0')
                    })
                }
            }
        })
    }


}

function initForms() {
    function formSubmit(inputData) {

    }
    const forms = document.querySelectorAll('.form')
    if (forms) {
        forms.forEach((e) => {
            new Form(e, formSubmit)
            const phone = $(e).find('input[name="phone"]')
            if (phone) {
                new Inputmask('+7 (999) 999-99-99').mask(phone);
            }

        })
    }
}
function dropDowns() {
    const ddBtn = $('.drop-down-target').toArray()
    if (!ddBtn) return
    ddBtn.forEach((el) => {
        el = $(el)
        if (el.hasClass('drop-down-fs')) {
            el.on('click', (e) => {
                e.preventDefault()
                if (!e.currentTarget.classList.contains('_opened')) {
                    e.currentTarget.classList.add('_opened')
                    e.currentTarget.closest('.drop-down-container')
                        .classList.add('_opened')
                    HTML.addClass('_lock')
                } else {
                    e.currentTarget.classList.remove('_opened')
                    e.currentTarget.closest('.drop-down-container')
                        .classList.remove('_opened')
                    HTML.removeClass('_lock')
                }

            })
        } else {
            el.on('click', (e) => {
                e.preventDefault()
                e.currentTarget.classList.toggle('_opened')
                e.currentTarget.closest('.drop-down-container')
                    .classList.toggle('_opened')
            })
        }

    })


}

function sectionTopper(target) {
    if (!target) return

    target.querySelector('.section-with-topper__main')
        .addEventListener('click', (e) => {
            const parent = e.currentTarget.closest('.section-with-topper'),
                slide = target

            if (window.innerWidth > 768) {
                if (parent.dataset.animeDesktop = 1) {
                    parent.dataset.animeDesktop = 2

                } else {
                    return
                }
            } else {
                if (parent.dataset.animeState = 1) {
                    parent.dataset.animeState = 2

                } else {
                    return
                }
            }
            if (slide.dataset.isvideo) {
                const v = slide.querySelector('video')
                if (slide.dataset.animeDesktop == 2 || slide.dataset.animeState == 2) {
                    v.play()
                } else {
                    v.pause()
                }
            }



        })
}
function modalsHandler() {
    const modalOpeners = $('[data-modal]'),
        modalClosers = $('.modal-closer'),
        html = $('html')


    if (!modalOpeners || !modalClosers) return

    modalOpeners.on('click', (ev) => {
        const { modal } = ev.currentTarget.dataset

        $(`.modal-${modal}`)
            .removeClass('anime-over')
            .addClass('_opened anime-start')
        html.addClass('_lock')
    })


    modalClosers.on('click', (ev) => {
        const { classList } = ev.target

        if (!classList.contains('modal-closer')) return

        const t = classList.contains('modal') ? $(ev.target) : $(ev.target.closest('.modal'))
        t.removeClass('_opened').addClass('anime-over').removeClass('anime-start')
        html.removeClass('_lock')
    })
}

function initSwichers() {
    /*   const basketDelivery = document.querySelector('.switcher-delivery')
      if (basketDelivery) {
          new Switcher(basketDelivery, 0)
      } */
}