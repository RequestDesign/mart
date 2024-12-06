
import $ from 'jquery'
import Inputmask from 'inputmask'
import { Navigation, Pagination, Grid, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import Form from './utils/Form'

const HTML = $('html')
$(function () {
    dropDowns()

})




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
        }else{
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