/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 906:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(755);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./node_modules/inputmask/dist/inputmask.js
var inputmask = __webpack_require__(382);
var inputmask_default = /*#__PURE__*/__webpack_require__.n(inputmask);
// EXTERNAL MODULE: ./node_modules/swiper/modules/index.mjs + 27 modules
var modules = __webpack_require__(59);
// EXTERNAL MODULE: ./node_modules/swiper/swiper.mjs + 1 modules
var swiper_swiper = __webpack_require__(652);
;// CONCATENATED MODULE: ./src/js/utils/Form.js
class Form {
  /**
   * 
   * @param {Element} formDomEl 
   * @param {Function} submitFoo 
   * 
   */
  constructor(formDomEl, submitFoo) {
    this._form = formDomEl;
    this._form.setAttribute('novalidate', true);
    this._inputContainerSelector = 'input-text';
    this._inputErrorMsgSelector = 'input-text-error';
    this._inputErrorSelector = '_error';
    this.submitForm = submitFoo;
    this._inputs = this._form.querySelectorAll('input, textarea');
    this._inputsData = this._createInputData(this._inputs);
    this._passwordInput = Array.from(this._inputs).find(e => e.name == 'password');
    this._passwordRepeatInput = Array.from(this._inputs).find(e => e.name == 'passwordRepeat');
    this._submitBtn = this._form.querySelector('.form-submit');
    /**
     * _inputsData: {[key: input.name] :{
     *                  value: any,
     *                  isValid: bool,
     *                  isRequired: bool
     *                  }
     *              }
     *  */

    /*  this._btnSubmit = this._form.querySelector('button[type="submit"]')
        this._btnSubmit.setAttribute('disabled', true) */

    this.initForm();
  }
  _inputHandler(inputTarget) {
    this._inputsData[inputTarget.name].value = inputTarget.value;
    this._validation(inputTarget);
  }
  _validation(input) {
    //валидация инпутов

    switch (input.name) {
      case 'name':
        this._checkInputValid(input, /^[A-Za-zА-Яа-яЁё ]+$/, 'Допустим ввод только букв');
        break;
      case 'email':
        this._checkInputValid(input, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Поле должно быть в формате email@domain.com');
        break;
      case 'phone':
        this._checkInputValid(input, /^\+(7|375) \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Формат номера телефона +7 (888) 888-88-88');
        break;
      case 'password':
        this._checkInputValid(input, /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Не корректный пароль');
        break;
      default:
        this._checkInputValid(input);
        break;
    }
  }
  _checkInputValid(target) {
    let regex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let regexMsg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'че то не так написал, исправляй';
    if (!this._inputsData[target.name].isRequired) return;
    const inputContainer = target.closest('.' + this._inputContainerSelector);
    const errorMsg = inputContainer.querySelector('.' + this._inputErrorMsgSelector);
    if (this._inputsData[target.name].isRequired && !this._inputsData[target.name].value) {
      //check requred
      inputContainer.classList.add(this._inputErrorSelector);
      errorMsg.textContent = 'Это поле обязательно.';
      this._inputsData[target.name].isValid = false;
    } else if (target.name == 'passwordRepeat') {
      this._validation(this._passwordInput);
      if (target.value !== this._inputsData.password.value) {
        inputContainer.classList.add(this._inputErrorSelector);
        errorMsg.textContent = 'Пароли не совпадают';
        this._inputsData[target.name].isValid = false;
      } else {
        this._inputsData[target.name].isValid = true;
        inputContainer.classList.remove(this._inputErrorSelector);
        errorMsg.textContent = ' ';
      }
    } else if (target.getAttribute('type') == 'checkbox' || target.getAttribute('type') == 'radio') {
      //check for checkbox and radio
      this._inputsData[target.name].isValid = !this._inputsData[target.name].isRequired ? true : target.checked;
      if (!target.checked) {
        inputContainer.classList.add(this._inputErrorSelector);
      } else {
        inputContainer.classList.remove(this._inputErrorSelector);
      }
    } else if (regex && !regex.test(target.value)) {
      //check regex
      inputContainer.classList.add(this._inputErrorSelector);
      errorMsg.textContent = regexMsg;
      this._inputsData[target.name].isValid = false;
    } else {
      //validation successfull

      this._inputsData[target.name].isValid = true;
      inputContainer.classList.remove(this._inputErrorSelector);
      errorMsg.textContent = ' ';
    }
  }
  _onSubmit() {
    let whatsUp = true;
    for (const inp of this._inputs) {
      this._inputHandler(inp);
      if (!this._inputsData[inp.name].isValid) {
        whatsUp = false;
      }
    }
    if (!whatsUp) return;
    //сабмит
    this._form.dispatchEvent(new Event('submit'));
  }
  _createInputData(inputs) {
    let echo = {};
    for (const input of inputs) {
      input.setAttribute('autocomplete', 'off');
      if (input.name == 'password') {
        const passbtn = input.closest('.' + this._inputContainerSelector).querySelector('.input-text-password');
        if (passbtn) {
          passbtn.addEventListener('click', e => {
            e.preventDefault();
            this._passowrHide();
          });
        }
      }
      if (input.type == 'file') {
        input.addEventListener('change', e => {
          this._fileHandler(e);
        });
      }
      if (!echo[input.name]) {
        const isValid = input.dataset.required ? false : true,
          isRequired = input.dataset.required ? true : false;
        let value = input.dataset.defaultv || input.checked || input.value || '';
        if (input.type == 'checkbox' || input.type == 'radio') {
          value = input.checked;
        }
        echo[input.name];
        echo[input.name] = {
          value,
          isValid,
          isRequired
        };
      }
    }
    return echo;
  }
  _fileHandler(evt) {
    const inputContainer = evt.target.closest('.' + this._inputContainerSelector);
    if (evt.target.value) {
      inputContainer.classList.add('_active');
      inputContainer.querySelector('.input-file-got').querySelector('.input-file-text').textContent = evt.target.value.split('\\').slice(-1);
    } else {
      inputContainer.classList.remove('_active');
    }
  }
  _passowrHide() {
    if (this._passwordInput.type == 'text') {
      this._passwordInput.setAttribute('type', 'password');
      this._passwordRepeatInput.setAttribute('type', 'password');
    } else {
      this._passwordInput.setAttribute('type', 'text');
      this._passwordRepeatInput.setAttribute('type', 'text');
    }
  }
  initForm() {
    this._form.noValidate = true;
    this._submitBtn.setAttribute('type', 'button');
    this._submitBtn.addEventListener('click', e => {
      this._onSubmit(e);
    });
    this._inputs.forEach(el => {
      el.addEventListener('input', e => this._inputHandler(e.target));
      el.addEventListener('blur', e => this._inputHandler(e.target));
      el.addEventListener('change', e => this._inputHandler(e.target));
    });
  }
}
;// CONCATENATED MODULE: ./src/js/utils/constants.js
const rem = function (rem) {
  if (window.innerWidth > 768) {
    return 0.005208335 * window.innerWidth * rem;
  } else {
    // где 375 это ширина мобильной версии макета
    return 100 / 375 * (0.05 * window.innerWidth) * rem;
  }
};
let bodyLockStatus = true;
let bodyUnlock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  let body = document.querySelector('body');
  if (bodyLockStatus) {
    setTimeout(() => {
      body.style.paddingRight = '0px';
      // document.querySelector('header').style.paddingRight = '0px';
      document.documentElement.classList.remove('lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
let bodyLock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  let body = document.querySelector('body');
  if (bodyLockStatus) {
    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
    let scrollWith = getScrollbarWidth();
    body.style.paddingRight = `${scrollWith}px`;
    // document.querySelector('header').style.paddingRight = `${scrollWith}px`
    document.documentElement.classList.add('lock');
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};

// smooth behavior ============================================================
const _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideUpDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};
const _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideDownDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};
const _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
;// CONCATENATED MODULE: ./src/js/main.js






const HTML = jquery_default()('html'),
  SWIPE_SIZE = 100,
  IS_MOBILE = window.innerWidth < 768;
jquery_default()(function () {
  HTML.addClass('_page-ready');
  document.querySelectorAll('[data-anime-delay],[data-anime-speed]').forEach(el => {
    if (el.dataset.animeDelay) {
      el.style.animationDelay = el.dataset.animeDelay;
    }
    if (el.dataset.animeSpeed) {
      el.style.animationDuration = el.dataset.animeSpeed;
    }
  });
  dropDowns();
  initForms();
  modalsHandler();
  initFaq();
  if (document.querySelector('.heading-main')) {
    document.querySelector('header').classList.add('_animation');
    setTimeout(() => {
      mainPageCore();
      iniSwipers();
    }, 3000);
  } else {
    mainPageCore();
    iniSwipers();
  }
});
function mainPageCore() {
  const main = document.querySelector('.main-swiper.swiper');
  if (!main) return;
  const wrapper = main.querySelector('.swiper-wrapper');
  const header = document.querySelector('.header');
  function whiteHeader(boolean) {
    if (boolean) {
      header.classList.add('_white');
    } else {
      header.classList.remove('_white');
    }
  }
  const coreSlideStateEvent = new CustomEvent('stateChange');
  wrapper.querySelectorAll('section').forEach(e => {
    e.classList.add('page-slide');
    e.addEventListener('stateChange', () => {
      const activeSlide = e;

      /* хэндлер на покраску хэдера */
      if (!activeSlide.dataset.animeHeader) {
        whiteHeader(false);
      } else {
        const {
          animeHeader
        } = activeSlide.dataset;
        if (animeHeader == 0) {
          whiteHeader(true);
        } else if (window.innerWidth < 769) {
          if (activeSlide.dataset.animeState >= animeHeader) {
            whiteHeader(true);
          } else {
            whiteHeader(false);
          }
        } else if (window.innerWidth > 769) {
          if (activeSlide.dataset.animeDesktop >= animeHeader) {
            whiteHeader(true);
          } else {
            whiteHeader(false);
          }
        }
      }
      /* хардкор контактов */
      if (activeSlide.classList.contains('contacts') && window.innerWidth < 769) {
        switch (activeSlide.dataset.animeState) {
          case '1':
            whiteHeader(true);
            break;
          case '2':
            whiteHeader(false);
            break;
          case '3':
            whiteHeader(false);
            break;
          default:
            break;
        }
      }
      /* хэндлер на видос */
      if (activeSlide.dataset.isvideo) {
        const v = activeSlide.querySelector('video');
        if (activeSlide.dataset.animeDesktop == 2 || activeSlide.dataset.animeState == 2) {
          v.play();
        } else {
          v.pause();
        }
      }
    });
  });
  let touchStart = 0;
  function sectionState(swiper, slide) {
    /**
     * @param {swiper} Swiper 
     * @param {slide} domElement 
     */

    slide.addEventListener('touchstart', ev => {
      touchStart = ev.touches[0].clientY;
    });
    slide.addEventListener('touchend', ev => {
      const slide = ev.currentTarget;
      const end = ev.changedTouches[0].pageY;
      if (end > touchStart + SWIPE_SIZE) {
        if (slide.dataset.animeState <= 1) {
          swiper.mousewheel.enable();
          swiper.allowTouchMove = true;
          swiper.slidePrev();
        } else {
          slide.dataset.animeState--;
        }
      } else if (end + SWIPE_SIZE < touchStart) {
        if (slide.dataset.animeState >= slide.dataset.animeStates) {
          if (swiper.slides[swiper.activeIndex + 1]) {
            swiper.mousewheel.enable();
            swiper.allowTouchMove = true;
            swiper.slideNext();
          }
        } else {
          slide.dataset.animeState++;
        }
      }
      touchStart = 0;
      ev.currentTarget.dispatchEvent(coreSlideStateEvent);
    });
    if (slide.dataset.animeDesktops) {
      let wheelIsReady = true;
      slide.addEventListener('wheel', ev => {
        const slide = ev.currentTarget;
        if (!wheelIsReady) return;
        wheelIsReady = false;
        setTimeout(() => {
          wheelIsReady = true;
        }, 1000);
        if (ev.deltaY > 0) {
          /*  console.log("Прокрутка вниз"); */
          if (slide.dataset.animeDesktop >= slide.dataset.animeDesktops) {
            if (swiper.slides[swiper.activeIndex + 1]) {
              swiper.slideNext();
              swiper.mousewheel.enable();
              swiper.allowTouchMove = true;
              slide.dataset.animeDesktop = '0';
              slide.dataset.animeState = '0';
            }
          } else {
            slide.dataset.animeDesktop++;
          }
        } else if (ev.deltaY < 0) {
          /* console.log("Прокрутка вверх"); */
          if (slide.dataset.animeDesktop <= 1) {
            if (swiper.slides[swiper.activeIndex - 1]) {
              swiper.slidePrev();
              swiper.mousewheel.enable();
              swiper.allowTouchMove = true;
            }
          } else {
            slide.dataset.animeDesktop--;
          }
        }
        ev.currentTarget.dispatchEvent(coreSlideStateEvent);
      });
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
    slide.addEventListener('touchstart', ev => {
      touchStart = ev.touches[0].clientY;
    });
    slide.addEventListener('touchend', ev => {
      const end = ev.changedTouches[0].pageY;
      if (end > touchStart + SWIPE_SIZE) {
        if (swiperSlider.activeIndex <= 0) {
          swiperCore.mousewheel.enable();
          swiperCore.allowTouchMove = true;
          swiperCore.slidePrev();
        } else {
          swiperSlider.slidePrev();
        }
      } else if (end + SWIPE_SIZE < touchStart) {
        if (swiperSlider.activeIndex >= swiperSlider.slides.length - 1) {
          swiperCore.mousewheel.enable();
          swiperCore.allowTouchMove = true;
          swiperCore.slideNext();
        } else {
          swiperSlider.slideNext();
        }
      }
    });
    let wheelIsReady = true;
    slide.addEventListener('wheel', ev => {
      if (!wheelIsReady) return;
      wheelIsReady = false;
      setTimeout(() => {
        wheelIsReady = true;
      }, 500);
      if (ev.deltaY > 0) {
        /*  console.log("Прокрутка вниз"); */
        if (swiperSlider.activeIndex >= swiperSlider.slides.length - 1) {
          swiperCore.mousewheel.enable();
          swiperCore.allowTouchMove = true;
          swiperCore.slideNext();
        } else {
          swiperSlider.slideNext();
        }
      } else if (ev.deltaY < 0) {
        /* console.log("Прокрутка вверх"); */
        if (swiperSlider.activeIndex <= 0) {
          swiperCore.mousewheel.enable();
          swiperCore.allowTouchMove = true;
          swiperCore.slidePrev();
        } else {
          swiperSlider.slidePrev();
        }
      }
    });
  }
  const swiper = new swiper_swiper/* default */.Z(main, {
    modules: [modules/* Mousewheel */.Gk, modules/* EffectCreative */.gI],
    direction: 'vertical',
    effect: 'creative',
    creativeEffect: {},
    initialSlide: localStorage.getItem('coreSwiper') ? localStorage.getItem('coreSwiper') : 0,
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
      init: swiper => {
        swiper.slides[swiper.activeIndex].classList.add('anime-start');
        swiper.slides.forEach(el => {
          if (el.dataset.animeStates) {
            el.dataset.animeState = '1';
            if (el.dataset.animeDesktops) {
              el.dataset.animeDesktop = '1';
            }
            sectionState(swiper, el);
          }
          if (el.dataset.animeSlider) {
            const t = el.querySelector('.swiper');
            const slider = new swiper_swiper/* default */.Z(t, {
              modules: [modules/* Mousewheel */.Gk, modules/* Manipulation */.bi],
              direction: 'vertical',
              spaceBetween: rem(3),
              speed: 1000,
              slidesPerView: 'auto',
              mousewheel: false,
              simulateTouch: false,
              followFinger: false,
              on: {
                init: s => {
                  if (el.dataset.animeSlider == 'services') {
                    if (window.innerWidth > 768) {
                      const slideTwo = s.slides[2].querySelector('.services__c-el-item').cloneNode(true);
                      const slideFour = s.slides[4].querySelector('.services__c-el-item').cloneNode(true);
                      s.slides[1].append(slideTwo);
                      s.slides[3].append(slideFour);
                      s.removeSlide(2);
                      s.removeSlide(3);
                      s.update();
                    }
                  }
                },
                slideChangeTransitionStart: s => {
                  if (s.activeIndex == s.slides.length - 1) {
                    t.classList.add('_last');
                  } else {
                    t.classList.remove('_last');
                  }
                }
              }
            });
            sectionSlider(swiper, slider, el);
          }
          if (el.classList.contains('section-with-topper')) {
            sectionTopper(el);
          }
        });
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (IS_MOBILE) {
          if (swiper.slides[swiper.activeIndex].dataset.animeSlider || swiper.slides[swiper.activeIndex].dataset.animeStates) {
            swiper.mousewheel.disable();
            swiper.allowTouchMove = false;
          }
        } else {
          if (swiper.slides[swiper.activeIndex].dataset.animeSlider || swiper.slides[swiper.activeIndex].dataset.animeDesktops) {
            swiper.mousewheel.disable();
            swiper.allowTouchMove = false;
          }
        }
        if (!activeSlide.dataset.animeHeader) {
          whiteHeader(false);
        } else {
          const {
            animeHeader
          } = activeSlide.dataset;
          if (animeHeader == 0) {
            whiteHeader(true);
          } else if (window.innerWidth > 769) {
            if (activeSlide.dataset.animeState >= animeHeader) {
              whiteHeader(true);
            } else {
              whiteHeader(false);
            }
          } else if (window.innerWidth < 769) {
            if (activeSlide.dataset.animeDesktop >= animeHeader) {
              whiteHeader(true);
            } else {
              whiteHeader(false);
            }
          }
        }
      },
      slidePrevTransitionStart: swiper => {
        swiper.slides[swiper.activeIndex + 1].classList.add('anime-over');
      },
      slideNextTransitionStart: swiper => {
        if (swiper.activeIndex - 1 >= 0) {
          swiper.slides[swiper.activeIndex - 1].classList.add('anime-over');
        } else {
          swiper.slides[swiper.slides.length - 1].classList.add('anime-over');
        }
        swiper.slides[swiper.activeIndex - 1].classList.remove('anime-start');
      },
      slideChangeTransitionStart: swiper => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide.dataset.animeStates) {
          activeSlide.dataset.animeState = 1;
        }
        if (activeSlide.dataset.animeDesktops) {
          activeSlide.dataset.animeDesktop = 1;
        }
        swiper.slides[swiper.activeIndex].style.zIndex = 50;
        activeSlide.dispatchEvent(coreSlideStateEvent);
      },
      slideChangeTransitionEnd: swiper => {
        swiper.slides[swiper.activeIndex].classList.remove('anime-over');
        swiper.slides[swiper.activeIndex].classList.add('anime-start');
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (swiper.slides[swiper.activeIndex - 1] && swiper.slides[swiper.activeIndex - 1].dataset.animeStates) {
          swiper.slides[swiper.activeIndex - 1].dataset.animeState = 1;
        }
        if (swiper.slides[swiper.activeIndex + 1] && swiper.slides[swiper.activeIndex + 1].dataset.animeStates) {
          swiper.slides[swiper.activeIndex + 1].dataset.animeState = 1;
        }
        if (activeSlide.dataset.animeStates && window.innerWidth < 769) {
          swiper.mousewheel.disable();
          swiper.allowTouchMove = false;
          activeSlide.dataset.animeState = 1;
        }
        if (activeSlide.dataset.animeDesktops && window.innerWidth > 769) {
          swiper.mousewheel.disable();
          swiper.allowTouchMove = false;
          activeSlide.dataset.animeDesktop = 1;
        }
        if (activeSlide.dataset.animeSlider) {
          swiper.mousewheel.disable();
          swiper.allowTouchMove = false;
        }
      }
    }
  });
}
function iniSwipers() {
  const ourProjects = document.querySelector('.our-projects');
  if (ourProjects) {
    new swiper_swiper/* default */.Z(ourProjects.querySelector('.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* EffectFade */.xW],
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
    });
  }
  const ourSpecialists = document.querySelector('.our-specialists');
  if (ourSpecialists) {
    new swiper_swiper/* default */.Z(ourSpecialists.querySelector('.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* EffectCreative */.gI],
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
        nextEl: ourSpecialists.querySelector('.swiper-btn-next')
      },
      on: {
        //пока работает, лучше не трогать
        slidePrevTransitionStart: s => {
          s.slides[s.activeIndex].classList.remove('swiper-clip-active');
          s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
          s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled');
          s.slides[s.activeIndex + 1].style.zIndex = 50;
        },
        slidePrevTransitionEnd: s => {
          s.slides[s.activeIndex + 1].classList.remove('swiper-clip-disabled');
          s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1;
        },
        slideNextTransitionStart: s => {
          s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
          s.slides[s.activeIndex].classList.remove('swiper-clip-active');
          s.slides[s.activeIndex].classList.add('swiper-clip-active');
        }
      }
    });
  }
  const results = document.querySelector('.results');
  if (results) {
    const one = new swiper_swiper/* default */.Z(results.querySelector('.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* EffectCreative */.gI],
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
        nextEl: results.querySelector('.swiper-btn-next')
      },
      on: {
        //пока работает, лучше не трогать
        slidePrevTransitionStart: s => {
          s.slides[s.activeIndex].classList.remove('swiper-clip-active');
          s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
          s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled');
          s.slides[s.activeIndex + 1].style.zIndex = 50;
        },
        slidePrevTransitionEnd: s => {
          s.slides[s.activeIndex + 1].classList.remove('swiper-clip-disabled');
          s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1;
        },
        slideNextTransitionStart: s => {
          s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
          s.slides[s.activeIndex].classList.remove('swiper-clip-active');
          s.slides[s.activeIndex].classList.add('swiper-clip-active');
        }
      }
    });
  }
  const twoSlider = document.querySelector('.two-slider');
  if (twoSlider) {
    if (window.innerWidth < 768) {
      new swiper_swiper/* default */.Z(twoSlider.querySelector('.swiper'), {
        modules: [modules/* Navigation */.W_, modules/* EffectCreative */.gI],
        effect: window.innerWidth < 768 ? 'creative' : 'slide',
        followFinger: false,
        speed: 100,
        preventInteractionOnTransition: true,
        fadeEffect: {
          crossFade: false
        },
        navigation: {
          prevEl: twoSlider.querySelector('.swiper-btn-prev'),
          nextEl: twoSlider.querySelector('.swiper-btn-next')
        },
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: rem(8),
        on: {
          init: swiper => {
            swiper.slides.forEach((e, i) => {
              e.querySelector('.two-slider__slide-body-count').textContent = (i + 1).toString().padStart(2, '0');
            });
          },
          slidePrevTransitionStart: s => {
            if (window.innerWidth < 769) {
              s.slides[s.activeIndex].classList.remove('swiper-clip-active');
              s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
              s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled');
              s.slides[s.activeIndex + 1].style.zIndex = 50;
            }
          },
          slidePrevTransitionEnd: s => {
            if (window.innerWidth < 769) {
              s.slides[s.activeIndex + 1].classList.remove('swiper-clip-disabled');
              s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1;
            }
          },
          slideNextTransitionStart: s => {
            if (window.innerWidth < 769) {
              s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
              s.slides[s.activeIndex].classList.remove('swiper-clip-active');
              s.slides[s.activeIndex].classList.add('swiper-clip-active');
            }
          }
        }
        /*   breakpoints:{
              768:{
                  slidesPerGroup: 2
              }
          } */
      });
    } else {
      const next = twoSlider.querySelector('.swiper-btn-next'),
        prev = twoSlider.querySelector('.swiper-btn-prev');
      prev.setAttribute('disabled', true);
      next.addEventListener('click', ev => {
        if (twoSlider.dataset.twoslideState < 2) {
          twoSlider.dataset.twoslideState++;
          ev.currentTarget.setAttribute('disabled', true);
          prev.removeAttribute('disabled');
        }
      });
      prev.addEventListener('click', ev => {
        if (twoSlider.dataset.twoslideState > 1) {
          twoSlider.dataset.twoslideState--;
          ev.currentTarget.setAttribute('disabled', true);
          next.removeAttribute('disabled');
        }
      });
    }
  }
  const care = document.querySelector('.arch-care');
  if (care) {
    new swiper_swiper/* default */.Z(care.querySelector('.swiper'), {
      navigation: [modules/* Navigation */.W_],
      simulateTouch: false,
      followFinger: false,
      spaceBetween: rem(2),
      slidesPerView: 1.4,
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: rem(4.4)
        }
      },
      navigation: {
        prevEl: care.querySelector('.swiper-btn-prev'),
        nextEl: care.querySelector('.swiper-btn-next')
      },
      on: {
        slideChange: s => {
          if (s.activeIndex == s.slides.length - 1) {
            care.querySelector('.swiper').style.transform = 'translate(-22rem, 0)';
          } else {
            care.querySelector('.swiper').style.transform = 'translate(-0, 0)';
          }
        }
      }
    });
  }
  const superAdv = document.querySelector('.supervisor-adv');
  if (superAdv) {
    const right = new swiper_swiper/* default */.Z(superAdv.querySelectorAll('.swiper')[1], {
      modules: [modules/* EffectCreative */.gI],
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
        init: s => {
          s.slides.forEach((el, i) => {
            el.querySelector('.supervisor-adv__sliders-el-text-count').textContent = (i + 1).toString().padStart(2, '0');
          });
        },
        slidePrevTransitionStart: s => {
          if (window.innerWidth > 768) {
            s.slides[s.activeIndex].classList.remove('swiper-clip-active');
            s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
            s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled');
            s.slides[s.activeIndex + 1].style.zIndex = 50;
          }
        },
        slidePrevTransitionEnd: s => {
          if (window.innerWidth > 768) {
            s.slides[s.activeIndex + 1].classList.remove('swiper-clip-disabled');
            s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1;
          }
        },
        slideNextTransitionStart: s => {
          if (window.innerWidth > 768) {
            s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
            s.slides[s.activeIndex].classList.remove('swiper-clip-active');
            s.slides[s.activeIndex].classList.add('swiper-clip-active');
          }
        }
      }
    });
    const left = new swiper_swiper/* default */.Z(superAdv.querySelectorAll('.swiper')[0], {
      modules: [modules/* Navigation */.W_, modules/* EffectCreative */.gI],
      slidesPerView: 1,
      effect: 'creative',
      speed: 1000,
      initialSlide: 0,
      followFinger: false,
      simulateTouch: false,
      navigation: {
        prevEl: superAdv.querySelector('.swiper-btn-prev'),
        nextEl: superAdv.querySelector('.swiper-btn-next')
      },
      on: {
        slideChange: s => {
          right.slideTo(s.activeIndex + 1);
          if (window.innerWidth > 768 && s.activeIndex >= s.slides.length - 2) {
            s.allowSlideNext = false;
          } else {
            s.allowSlideNext = true;
          }
        },
        init: s => {
          s.slides.forEach((el, i) => {
            el.querySelector('.supervisor-adv__sliders-el-text-count').textContent = (i + 1).toString().padStart(2, '0');
          });
        },
        slidePrevTransitionStart: s => {
          s.slides[s.activeIndex].classList.remove('swiper-clip-active');
          s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
          s.slides[s.activeIndex + 1].classList.add('swiper-clip-disabled');
          s.slides[s.activeIndex + 1].style.zIndex = 50;
          console.log(s.activeIndex + 1, 'f');
        },
        slidePrevTransitionEnd: s => {
          s.slides[s.activeIndex + 1].style.zIndex = s.activeIndex + 1;
          s.slides[s.activeIndex + 1].style.zIndex = '-1';
        },
        slideNextTransitionStart: s => {
          s.slides[s.activeIndex].classList.remove('swiper-clip-disabled');
          s.slides[s.activeIndex].classList.remove('swiper-clip-active');
          s.slides[s.activeIndex].classList.add('swiper-clip-active');
        }
      }
    });
  }
}
function initForms() {
  function formSubmit(inputData) {}
  const forms = document.querySelectorAll('.form');
  if (forms) {
    forms.forEach(e => {
      new Form(e, formSubmit);
      const phone = jquery_default()(e).find('input[name="phone"]');
      if (phone) {
        new (inputmask_default())('+7 (999) 999-99-99').mask(phone);
      }
    });
  }
}
function dropDowns() {
  const ddBtn = jquery_default()('.drop-down-target').toArray();
  if (!ddBtn) return;
  ddBtn.forEach(el => {
    el = jquery_default()(el);
    if (el.hasClass('drop-down-fs')) {
      el.on('click', e => {
        e.preventDefault();
        if (!e.currentTarget.classList.contains('_opened')) {
          e.currentTarget.classList.add('_opened');
          e.currentTarget.closest('.drop-down-container').classList.add('_opened');
          HTML.addClass('_lock');
        } else {
          e.currentTarget.classList.remove('_opened');
          e.currentTarget.closest('.drop-down-container').classList.remove('_opened');
          e.currentTarget.closest('.drop-down-container').classList.remove('swiper-slide-active');
          HTML.removeClass('_lock');
        }
      });
    } else {
      el.on('click', e => {
        e.preventDefault();
        e.currentTarget.classList.toggle('_opened');
        e.currentTarget.closest('.drop-down-container').classList.toggle('_opened');
      });
    }
  });
}
function sectionTopper(target) {
  if (!target) return;
  target.querySelector('.section-with-topper__main').addEventListener('click', e => {
    const parent = e.currentTarget.closest('.section-with-topper'),
      slide = target;
    if (window.innerWidth > 768) {
      if (parent.dataset.animeDesktop = 1) {
        parent.dataset.animeDesktop = 2;
      } else {
        return;
      }
    } else {
      if (parent.dataset.animeState = 1) {
        parent.dataset.animeState = 2;
      } else {
        return;
      }
    }
    if (slide.dataset.isvideo) {
      const v = slide.querySelector('video');
      if (slide.dataset.animeDesktop == 2 || slide.dataset.animeState == 2) {
        v.play();
      } else {
        v.pause();
      }
    }
  });
}
function modalsHandler() {
  const modalOpeners = jquery_default()('[data-modal]'),
    modalClosers = jquery_default()('.modal-closer'),
    html = jquery_default()('html');
  if (!modalOpeners || !modalClosers) return;
  modalOpeners.on('click', ev => {
    const {
      modal
    } = ev.currentTarget.dataset;
    jquery_default()(`.modal-${modal}`).removeClass('anime-over').addClass('_opened anime-start');
    html.addClass('_lock');
  });
  modalClosers.on('click', ev => {
    const {
      classList
    } = ev.target;
    if (!classList.contains('modal-closer')) return;
    const t = classList.contains('modal') ? jquery_default()(ev.target) : jquery_default()(ev.target.closest('.modal'));
    t.removeClass('_opened').addClass('anime-over').removeClass('anime-start');
    html.removeClass('_lock');
  });
}
function initFaq() {
  const c = document.querySelector('.faq');
  if (!c || window.innerWidth > 767) return;
  const targets = c.querySelectorAll('.faq__c-body-el-target');
  if (!targets) return;
  let activeT = null;
  targets.forEach(el => {
    el.addEventListener('click', ev => {
      if (activeT) {
        activeT.classList.remove('_opened');
      }
      ev.target.closest('.faq__c-body-el').classList.add('_opened');
      activeT = ev.target.closest('.faq__c-body-el');
    });
  });
}
function initSwichers() {
  /*   const basketDelivery = document.querySelector('.switcher-delivery')
    if (basketDelivery) {
        new Switcher(basketDelivery, 0)
    } */
}
;// CONCATENATED MODULE: ./src/index.js



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_example"] = self["webpackChunkwebpack_example"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [390,729,522], function() { return __webpack_require__(906); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;