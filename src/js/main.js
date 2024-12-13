
import $ from 'jquery'
import Inputmask from 'inputmask'
import { Navigation, Pagination, Grid, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import Form from './utils/Form'

const HTML = $('html')
$(function () {
    dropDowns()
    iniSwipers()

})


function iniSwipers() {
    const ourProjects = document.querySelector('.our-projects');

    if (ourProjects) {
        new Swiper(ourProjects.querySelector('.swiper'), {
            modules: [Navigation],
            slidesPerView: 1,
            simulateTouch: false,
            navigation: {
                prevEl: ourProjects.querySelector('.swiper-btn-prev'),
                nextEl: ourProjects.querySelector('.swiper-btn-next')
            }

        })
    }

    const ourSpecialists = document.querySelector('.our-specialists')
    if (ourSpecialists) {
        const smallImg = new Swiper(ourSpecialists.querySelector('.our-specialists__small.swiper'), {
            modules: [Navigation],
            slidesPerView: 1,
            simulateTouch: false,
            navigation: {
                prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
                nextEl: ourSpecialists.querySelector('.swiper-btn-next'),

            }
        })
        const userInfo = new Swiper(ourSpecialists.querySelector('.our-specialists__info-data.swiper'), {
            modules: [Navigation],
            slidesPerView: 1,
            simulateTouch: false,
            allowTouchMove: false,
            navigation: {
                prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
                nextEl: ourSpecialists.querySelector('.swiper-btn-next'),

            }
        })
        const bigImg = new Swiper(ourSpecialists.querySelector('.our-specialists__big.swiper'), {
            modules: [Navigation],
            slidesPerView: 1,
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
            modules: [Navigation],
            navigation: {
                prevEl: results.querySelector('.swiper-btn-prev'),
                nextEl: results.querySelector('.swiper-btn-next')
            },
            slidesPerView: 1,
            simulateTouch: false
        })
        const two = new Swiper(results.querySelector('.results__c-sliders-two.swiper'), {
            modules: [Navigation],
            navigation: {
                prevEl: results.querySelector('.swiper-btn-prev'),
                nextEl: results.querySelector('.swiper-btn-next')
            },
            slidesPerView: 1,
            simulateTouch: false
        })
        one.on('slideChange', (swiper) => {
            two.slideTo(swiper.activeIndex)

        })
        two.on('slideChange', (swiper) => {
            one.slideTo(swiper.activeIndex)

        })
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