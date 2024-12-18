
import $ from 'jquery'
import Inputmask from 'inputmask'
import { Navigation, Pagination, Grid, Autoplay, Mousewheel, EffectFade } from 'swiper/modules';
import Swiper from 'swiper';
import Form from './utils/Form'


const HTML = $('html')
$(function () {
    document.querySelectorAll('[data-anime-delay],[data-anime-speed]')
        .forEach((el) => {
            if (el.dataset.animeDelay) {
                el.style.transitionDelay = el.dataset.animeDelay
            }

            if (el.dataset.animeSpeed) {
                el.style.transitionDuration = el.dataset.animeSpeed

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


    let canSlide = true
    const swiper = new Swiper(main, {
        modules: [Mousewheel],
        direction: 'vertical',
        followFinger: false,
        slidesPerView: 1,
        mousewheel: true,
        simulateTouch: false,
        slideClass: 'page-slide',
        noSwipingClass: 'page-slide-stop',
        speed: 100,
        slideActiveClass: 'core-slide-active',


        on: {

           /*  slidePrevTransitionStart: (s) => {
                if (canSlide) {
                    canSlide = false
                    setTimeout(() => {
                        canSlide = true
                        s.slidePrev()
                    }, 2000);
                }
               return false
            },
            slideNextTransitionStart: (s) => {
                if (canSlide) {
                    canSlide = false
                    setTimeout(() => {
                        canSlide = true
                        s.slideNext()
                    }, 2000);
                }
               swiper.update()
            }, */
            slideChangeTransitionEnd: (swiper) => {
                console.log('end');
                const activeSlide = swiper.slides[swiper.activeIndex],
                    container = activeSlide.querySelector('.page-slide-scroll');

                activeSlide.classList.remove('_opened')
                activeSlide.querySelectorAll("._opened")
                    .forEach((e) => {
                        e.classList.remove('_opened')
                    })

                if (!container) return

                if (container.scrollHeight > (container.clientHeight + 3)) {

                    const scrollDifferenceTop = container.scrollHeight - container.clientHeight;

                    container.scrollTo(0, 0)

                    activeSlide.classList.add('page-slide-stop')
                    swiper.mousewheel.disable();
                    swiper.allowTouchMove = false;


                    activeSlide.addEventListener('click', (e) => {
                        console.log(container.scrollHeight, container.clientHeight);
                    })
                    console.log('qwe');
                    container.addEventListener('scroll', () => {

                        if (container.scrollTop <= 0 || scrollDifferenceTop - container.scrollTop <= 1) {
                            swiper.mousewheel.enable();
                            swiper.allowTouchMove = true;
                            activeSlide.classList.remove('page-slide-stop')
                        }
                    });

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
        const smallImg = new Swiper(ourSpecialists.querySelector('.our-specialists__small.swiper'), {
            modules: [Navigation, EffectFade],
            slidesPerView: 1,
            effect: 'fade',
            speed: 100,
            fadeEffect: {
                crossFade: false
            },
            simulateTouch: false,
            navigation: {
                prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
                nextEl: ourSpecialists.querySelector('.swiper-btn-next'),

            }
        })
        const userInfo = new Swiper(ourSpecialists.querySelector('.our-specialists__info-data.swiper'), {
            modules: [Navigation, EffectFade],
            slidesPerView: 1,
            effect: 'fade',
            speed: 100,
            fadeEffect: {
                crossFade: false
            },
            simulateTouch: false,
            allowTouchMove: false,
            navigation: {
                prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
                nextEl: ourSpecialists.querySelector('.swiper-btn-next'),

            }
        })
        const bigImg = new Swiper(ourSpecialists.querySelector('.our-specialists__big.swiper'), {
            modules: [Navigation, EffectFade],
            slidesPerView: 1,
            effect: 'fade',
            speed: 100,
            fadeEffect: {
                crossFade: false
            },
            navigation: {
                prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
                nextEl: ourSpecialists.querySelector('.swiper-btn-next'),

            }
        })

        bigImg.on('slideChange', (swiper) => {
            smallImg.slideTo(swiper.activeIndex)
            userInfo.slideTo(swiper.activeIndex)

        })
    }

    const results = document.querySelector('.results')
    if (results) {
        const one = new Swiper(results.querySelector('.results__c-sliders-one.swiper'), {
            modules: [Navigation, EffectFade],
            effect: 'fade',
            speed: 100,
            fadeEffect: {
                crossFade: false
            },
            navigation: {
                prevEl: results.querySelector('.swiper-btn-prev'),
                nextEl: results.querySelector('.swiper-btn-next')
            },
            slidesPerView: 1,
            simulateTouch: false
        })
        const two = new Swiper(results.querySelector('.results__c-sliders-two.swiper'), {
            modules: [Navigation, EffectFade],
            effect: 'fade',
            speed: 100,
            fadeEffect: {
                crossFade: false
            },
            navigation: {
                prevEl: results.querySelector('.swiper-btn-prev'),
                nextEl: results.querySelector('.swiper-btn-next')
            },
            slidesPerView: 1,
            simulateTouch: false
        })
        /*  one.on('slideChange', (swiper) => {
             two.slideTo(swiper.activeIndex)
 
         })
         two.on('slideChange', (swiper) => {
             one.slideTo(swiper.activeIndex)
 
         }) */
    }
}

function initForms() {
    function formSubmit(inputData) {
        console.log(inputData);
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
    const modalOpeners = $('.modal-opener'),
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