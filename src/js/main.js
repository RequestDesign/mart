
import $ from 'jquery'
import Inputmask from 'inputmask'
import { Navigation, Pagination, Grid, Autoplay, Mousewheel, EffectFade, EffectCreative } from 'swiper/modules';
import Swiper from 'swiper';
import Form from './utils/Form';
import { rem } from './utils/constants'


const HTML = $('html'),
    SWIPE_SIZE = 100
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
    sectionTopper()

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
         * 
         * @param {swiper} Swiper 
         * @param {slide} domElement 
         * 
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
                    swiper.mousewheel.enable()
                    swiper.allowTouchMove = true
                    swiper.slideNext()


                } else {
                    slide.dataset.animeState++

                }

            }
            touchStart = 0


        })

    }
    function sectionSlider(swiperCore, swiperSlider, slide) {
        /**
         * 
         * @param {swiperCore} Swiper 
         * @param {slide} domElement 
         * 
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
            console.log(ev.deltaY);
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
        creativeEffect: {

        },
        initialSlide: 9,
        followFinger: false,
        slidesPerView: 1,
        mousewheel: true,
        simulateTouch: false,
        slideClass: 'page-slide',
        noSwipingClass: 'page-slide-stop',
        speed: 1200,
        slideActiveClass: 'core-slide-active',
        /* shortSwipes: false, */
        threshold: SWIPE_SIZE,
        on: {
            init: (swiper) => {
                swiper.slides[swiper.activeIndex].classList.add('anime-start')
                swiper.wrapperEl.querySelectorAll('[data-anime-states]')
                    .forEach((el) => {
                        el.dataset.animeState = '1'
                        sectionState(swiper, el)
                    })
                swiper.wrapperEl.querySelectorAll('[data-anime-slider]')
                    .forEach((el) => {
                        const slider = new Swiper(el.querySelector('.swiper'), {
                            modules: [Mousewheel],
                            direction: 'vertical',
                            spaceBetween: rem(3),
                            slidesPerView: 'auto',
                            mousewheel: false,
                            simulateTouch: false

                        })
                        sectionSlider(swiper, slider, el)
                    })
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

                activeSlide.classList.remove('_opened')
                activeSlide.querySelectorAll("._opened")
                    .forEach((e) => {
                        e.classList.remove('_opened')
                    })

                /* 
                     swiper.mousewheel.disable();
                     swiper.allowTouchMove = false;
                      */


                if (activeSlide.dataset.animeStates && window.innerWidth < 769) {
                    swiper.mousewheel.disable()
                    swiper.allowTouchMove = false
                    activeSlide.dataset.animeState = 1
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

    /*  const gallery = document.querySelector('.gallery')
     if (gallery) {
         new Swiper(gallery.querySelector('.swiper'), {
             direction: 'vertical',
             spaceBetween: rem(3),
             slidesPerView: 'auto',
             mousewheel: true
         })
     }
  */
    const twoSlider = document.querySelector('.two-slider')
    if (twoSlider) {
        new Swiper(twoSlider.querySelector('.swiper'), {
            modules: [Navigation, EffectFade],
            effect: window.innerWidth < 768 ? 'fade' : 'slide',
            followFinger: false,
            speed: 100,
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

function sectionTopper() {
    const t = document.querySelectorAll('.section-with-topper')
    if (!t) return
    function click(e) {
        e.target.closest('.section-with-topper').classList.toggle('_opened')

    }
    t.forEach((e) => {
        e.querySelector('.section-with-topper__main')
            .addEventListener('click', click, { once: true })
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
            .fadeIn()
            .addClass('_opened')
        html.addClass('_lock')
    })


    modalClosers.on('click', (ev) => {
        const { classList } = ev.target
        if (!classList.contains('modal-closer')) return

        if (classList.contains('modal')) {
            $(ev.target).fadeOut().removeClass('_opened')

        } else {
            $(ev.target.closest('.modal')).fadeOut().removeClass('_opened')

        }
        html.removeClass('_lock')
    })
}

function initSwichers() {
    /*   const basketDelivery = document.querySelector('.switcher-delivery')
      if (basketDelivery) {
          new Switcher(basketDelivery, 0)
      } */
}