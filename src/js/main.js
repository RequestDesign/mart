
import $ from 'jquery'
import Inputmask from 'inputmask'
import { Navigation, Pagination, Grid, Autoplay, Mousewheel, EffectFade, EffectCreative, Manipulation } from 'swiper/modules';
import Swiper from 'swiper';
import Form from './utils/Form';
import { rem } from './utils/constants'


const HTML = $('html'),
    SWIPE_SIZE = 100,
    IS_MOBILE = window.innerWidth < 768
$(function () {
    HTML.addClass('_page-ready')
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
    initForms()
    modalsHandler()
    initFaq()

    if (document.querySelector('.heading-main')) {

        document.querySelector('.header')
            .classList.add('_animation')
        setTimeout(() => {
            mainPageCore()
            iniSwipers()
            setTimeout(() => {
                document.querySelector('.header')
                    .classList.remove('_animation')
            }, 500);
        }, 3000);
    } else {
        mainPageCore()
        iniSwipers()
    }




})
function mainPageCore() {

    const main = document.querySelector('.main-swiper.swiper')
    if (!main) return
    const wrapper = main.querySelector('.swiper-wrapper')
    const header = document.querySelector('.header')
    function whiteHeader(boolean) {
        if (boolean) {
            header.classList.add('_white')
        } else {
            header.classList.remove('_white')

        }
    }
    const coreSlideStateEvent = new CustomEvent('stateChange')

    wrapper.querySelectorAll('section')
        .forEach((e) => {
            e.classList.add('page-slide')
            e.addEventListener('stateChange', () => {
                const activeSlide = e
                console.log(activeSlide.dataset.animeHeader);
                /* хэндлер на покраску хэдера */
                if (!activeSlide.dataset.animeHeader) {
                    whiteHeader(false)
                } else {
                    const { animeHeader } = activeSlide.dataset
                    if (animeHeader == 0) {
                        whiteHeader(true)
                    } else if (window.innerWidth < 769) {
                        if (activeSlide.dataset.animeState >= animeHeader) {
                            whiteHeader(true)
                        } else {
                            whiteHeader(false)
                        }
                    } else if (window.innerWidth > 769) {

                        if (activeSlide.dataset.animeDesktop >= animeHeader) {
                            whiteHeader(true)
                        } else {
                            whiteHeader(false)
                        }
                    }

                }
                /* хардкор контактов */
                if (activeSlide.classList.contains('contacts') && window.innerWidth < 769) {
                    switch (activeSlide.dataset.animeState) {
                        case '1':
                            whiteHeader(true)
                            break;
                        case '2':
                            whiteHeader(false)
                            break;
                        case '3':
                            whiteHeader(false)

                            break;

                        default:
                            break;
                    }

                }
                /* хэндлер на видос */
                if (activeSlide.dataset.isvideo) {
                    const v = activeSlide.querySelector('video')
                    if (activeSlide.dataset.animeDesktop == 2 || activeSlide.dataset.animeState == 2) {

                        v.play()
                    } else {

                        v.pause()
                    }
                }

            })
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
            const slide = ev.currentTarget
            const end = ev.changedTouches[0].pageY
            if (end > touchStart + SWIPE_SIZE) {
                if (slide.dataset.animeState <= 1) {
                    swiper.mousewheel.enable()
                    swiper.allowTouchMove = true
                    swiper.slidePrev()


                } else {
                    slide.dataset.animeState--
                    ev.currentTarget.dispatchEvent(coreSlideStateEvent)
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
                    ev.currentTarget.dispatchEvent(coreSlideStateEvent)
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
                        ev.currentTarget.dispatchEvent(coreSlideStateEvent)
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
                        ev.currentTarget.dispatchEvent(coreSlideStateEvent)
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

            if (end > touchStart + SWIPE_SIZE) {
                if (swiperSlider.activeIndex <= 0) {
                    swiperCore.mousewheel.enable()
                    swiperCore.allowTouchMove = true
                    swiperCore.slidePrev()
                } else {
                    swiperSlider.slidePrev()
                }
            } else if (end + SWIPE_SIZE < touchStart) {

                if (swiperSlider.activeIndex >= swiperSlider.slides.length - 1) {

                    swiperCore.mousewheel.enable()
                    swiperCore.allowTouchMove = true
                    swiperCore.slideNext()
                } else {

                    swiperSlider.slideNext()
                }
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
        initialSlide:
            localStorage.getItem('coreSwiper')
                ?
                localStorage.getItem('coreSwiper')
                :
                0,
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
                        const t = el.querySelector('.swiper')

                        const slider = new Swiper(t, {
                            modules: [Mousewheel, Manipulation],
                            direction: 'vertical',
                            spaceBetween: rem(3),
                            speed: 1000,
                            slidesPerView: 'auto',
                            mousewheel: false,
                            simulateTouch: false,
                            followFinger: false,
                            on: {
                                init: (s) => {
                                    if (el.dataset.animeSlider == 'services') {
                                        if (window.innerWidth > 768) {
                                            const slideTwo = s.slides[2].querySelector('.services__c-el-item').cloneNode(true)
                                            const slideFour = s.slides[4].querySelector('.services__c-el-item').cloneNode(true)

                                            s.slides[1].append(slideTwo)
                                            s.slides[3].append(slideFour)

                                            s.removeSlide(2)
                                            s.removeSlide(3)

                                            s.update()
                                        }
                                    }
                                },
                                slideChangeTransitionStart: (s) => {
                                    if (s.activeIndex == s.slides.length - 1) {
                                        t.classList.add('_last')
                                    } else {
                                        t.classList.remove('_last')
                                    }
                                }
                            }

                        })
                        sectionSlider(swiper, slider, el)

                    }

                    if (el.classList.contains('section-with-topper')) {
                        sectionTopper(el)
                    }
                })
                const activeSlide = swiper.slides[swiper.activeIndex]

                if (IS_MOBILE) {

                    if (swiper.slides[swiper.activeIndex].dataset.animeSlider
                        || swiper.slides[swiper.activeIndex].dataset.animeStates) {
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


                if (!activeSlide.dataset.animeHeader) {
                    whiteHeader(false)
                } else {
                    const { animeHeader } = activeSlide.dataset

                    if (animeHeader == 0) {
                        whiteHeader(true)
                    } else if (window.innerWidth > 769) {
                        if (activeSlide.dataset.animeState >= animeHeader) {
                            whiteHeader(true)
                        } else {
                            whiteHeader(false)
                        }
                    } else if (window.innerWidth < 769) {
                        if (activeSlide.dataset.animeDesktop >= animeHeader) {
                            whiteHeader(true)
                        } else {
                            whiteHeader(false)
                        }
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
                const activeSlide = swiper.slides[swiper.activeIndex]
                if (activeSlide.dataset.animeStates) {
                    activeSlide.dataset.animeState = 1
                }
                if (activeSlide.dataset.animeDesktops) {
                    activeSlide.dataset.animeDesktop = 1
                }

                swiper.slides[swiper.activeIndex].style.zIndex = 50
                activeSlide.dispatchEvent(coreSlideStateEvent)
            },

            slideChangeTransitionEnd: (swiper) => {
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
        const filters = ourProjects.querySelectorAll('input[name="projectsFilter"]'),
            allSlides = ourProjects.querySelectorAll('.swiper-slide')
        function applyFilter(sw, category) {

            let slides = [];
            console.log(slides);
            if (category == 'on') {
                slides = allSlides
            } else {
                slides = Array.from(allSlides).filter((e)=>{
                    return e.hasAttribute('data-' + category)
                })
               
            }
          
            console.log(slides);
            sw.wrapperEl.innerHTML = ''
            slides.forEach((slide) => {
                sw.wrapperEl.appendChild(slide);
            });

            sw.update();
            sw.slideTo(0);

        }

        new Swiper(ourProjects.querySelector('.swiper'), {
            modules: [Navigation, EffectCreative],
            slidesPerView: 1,
            simulateTouch: false,
            /* effect: 'fade', */
            effect: 'creative',
            creativeEffect: {},
            speed: 1000,
            followFinger: false,
            touchMoveStopPropagation: true,
            
            fadeEffect: {
                crossFade: false
            },
            navigation: {
                prevEl: ourProjects.querySelector('.swiper-btn-prev'),
                nextEl: ourProjects.querySelector('.swiper-btn-next')
            },
            on: {
                init: (sw) => {

                    if (!filters.length || filters.length < 1) return
                    filters.forEach(filter => {
                        filter.addEventListener('change', () => {
                                applyFilter(sw, filter.value);
                           
                        });
                    });

                },
                slideChange: (s) => {
                    console.log(s.activeIndex);
                }
            }

        })
    }

    const ourSpecialists = document.querySelector('.our-specialists')
    if (ourSpecialists) {
        new Swiper(ourSpecialists.querySelector('.swiper'), {
            modules: [Navigation, EffectCreative],
            slidesPerView: 1,
            effect: 'creative',
            speed: 100,

            followFinger: false,
            fadeEffect: {
                crossFade: false
            },
            simulateTouch: false,
            navigation: {
                prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
                nextEl: ourSpecialists.querySelector('.swiper-btn-next'),

            },
            on: {
                //пока работает, лучше не трогать
                slidePrevTransitionStart: (s) => {
                    s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                    s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                    s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled')
                    s.slides[s.activeIndex + 1].style.zIndex = 50
                },
                slidePrevTransitionEnd: (s) => {

                    s.slides[s.activeIndex + 1].classList.remove('swiper-clip-disabled')
                    s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1

                },
                slideNextTransitionStart: (s) => {
                    s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                    s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                    s.slides[s.activeIndex].classList.add('swiper-clip-active')

                }
            }
        })



    }

    const results = document.querySelector('.results')
    if (results) {
        const one = new Swiper(results.querySelector('.swiper'), {
            modules: [Navigation, EffectCreative],
            slidesPerView: 1,
            effect: 'creative',
            speed: 100,

            followFinger: false,
            fadeEffect: {
                crossFade: false
            },
            simulateTouch: false,
            navigation: {
                prevEl: results.querySelector('.swiper-btn-prev'),
                nextEl: results.querySelector('.swiper-btn-next'),

            },
            on: {
                //пока работает, лучше не трогать
                slidePrevTransitionStart: (s) => {
                    s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                    s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                    s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled')
                    s.slides[s.activeIndex + 1].style.zIndex = 50
                },
                slidePrevTransitionEnd: (s) => {

                    s.slides[s.activeIndex + 1].classList.remove('swiper-clip-disabled')
                    s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1

                },
                slideNextTransitionStart: (s) => {
                    s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                    s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                    s.slides[s.activeIndex].classList.add('swiper-clip-active')

                }
            }

        })

    }


    const twoSlider = document.querySelector('.two-slider')
    if (twoSlider) {
        if (window.innerWidth < 768) {
            new Swiper(twoSlider.querySelector('.swiper'), {
                modules: [Navigation, EffectCreative,],
                effect: window.innerWidth < 768 ? 'creative' : 'slide',
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
                    slidePrevTransitionStart: (s) => {
                        if (window.innerWidth < 769) {
                            s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                            s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                            s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled')
                            s.slides[s.activeIndex + 1].style.zIndex = 50
                        }
                    },
                    slidePrevTransitionEnd: (s) => {
                        if (window.innerWidth < 769) {
                            s.slides[s.activeIndex + 1].classList.remove('swiper-clip-disabled')
                            s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1
                        }
                    },
                    slideNextTransitionStart: (s) => {
                        if (window.innerWidth < 769) {
                            s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                            s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                            s.slides[s.activeIndex].classList.add('swiper-clip-active')
                        }
                    }
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
            spaceBetween: rem(2),
            slidesPerView: 1.4,
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: rem(4.4),
                }
            },
            navigation: {
                prevEl: care.querySelector('.swiper-btn-prev'),
                nextEl: care.querySelector('.swiper-btn-next'),
            },
            on: {
                slideChange: (s) => {
                    if (s.activeIndex == s.slides.length - 1) {
                        care.querySelector('.swiper').style.transform = 'translate(-22rem, 0)'
                    }
                    else {
                        care.querySelector('.swiper').style.transform = 'translate(-0, 0)'
                    }
                }
            }
        })
    }

    const superAdv = document.querySelector('.supervisor-adv')
    if (superAdv) {

        const right = new Swiper(superAdv.querySelectorAll('.swiper')[1], {
            modules: [EffectCreative],
            effect: 'creative',
            slidesPerView: 1,
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
                },
                slidePrevTransitionStart: (s) => {
                    if (window.innerWidth > 768) {
                        s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                        s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                        s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled')
                        s.slides[s.activeIndex + 1].style.zIndex = 50
                    }
                },
                slidePrevTransitionEnd: (s) => {
                    if (window.innerWidth > 768) {
                        s.slides[s.activeIndex + 1].classList.remove('swiper-clip-disabled')
                        s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1
                    }

                },
                slideNextTransitionStart: (s) => {
                    if (window.innerWidth > 768) {
                        s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                        s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                        s.slides[s.activeIndex].classList.add('swiper-clip-active')
                    }

                }
            }



        })
        const left = new Swiper(superAdv.querySelectorAll('.swiper')[0], {
            modules: [Navigation, EffectCreative],
            slidesPerView: 1,
            effect: 'creative',
            speed: 1000,
            initialSlide: 0,
            followFinger: false,
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
                },
                slidePrevTransitionStart: (s) => {
                    s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                    s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                    s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled')
                    s.slides[s.activeIndex + 1].style.zIndex = 50
                    console.log(s.activeIndex + 1, 'f');
                },
                slidePrevTransitionEnd: (s) => {
                    s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1
                    s.slides[s.activeIndex + 1].style.zIndex = '-1'

                },
                slideNextTransitionStart: (s) => {
                    s.slides[s.activeIndex].classList.remove('swiper-clip-disabled')
                    s.slides[s.activeIndex].classList.remove('swiper-clip-active')
                    s.slides[s.activeIndex].classList.add('swiper-clip-active')

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
                    e.currentTarget.closest('.drop-down-container')
                        .classList.remove('swiper-slide-active')

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
function initFaq() {

    const c = document.querySelector('.faq')
    if (!c || window.innerWidth > 767) return

    const targets = c.querySelectorAll('.faq__c-body-el-target')
    if (!targets) return

    let activeT = null

    targets.forEach((el) => {
        el.addEventListener('click', (ev) => {
            if (activeT) {
                activeT.classList.remove('_opened')
            }
            ev.target.closest('.faq__c-body-el').classList.add('_opened')
            activeT = ev.target.closest('.faq__c-body-el')
        })
    })

}

function initSwichers() {
    /*   const basketDelivery = document.querySelector('.switcher-delivery')
      if (basketDelivery) {
          new Switcher(basketDelivery, 0)
      } */
}