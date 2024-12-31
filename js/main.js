/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 576:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(755);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./node_modules/inputmask/dist/inputmask.js
var inputmask = __webpack_require__(382);
// EXTERNAL MODULE: ./node_modules/swiper/modules/index.mjs + 26 modules
var modules = __webpack_require__(11);
// EXTERNAL MODULE: ./node_modules/swiper/swiper.mjs + 1 modules
var swiper_swiper = __webpack_require__(652);
;// CONCATENATED MODULE: ./src/js/main.js





const HTML = jquery_default()('html'),
  SWIPE_SIZE = 100;
jquery_default()(function () {
  document.querySelectorAll('[data-anime-delay],[data-anime-speed]').forEach(el => {
    if (el.dataset.animeDelay) {
      el.style.animationDelay = el.dataset.animeDelay;
    }
    if (el.dataset.animeSpeed) {
      el.style.animationDuration = el.dataset.animeSpeed;
    }
  });
  dropDowns();
  iniSwipers();
  mainPageCore();
  sectionTopper();
});
function mainPageCore() {
  const main = document.querySelector('.main-swiper.swiper');
  if (!main) return;
  const wrapper = main.querySelector('.swiper-wrapper');
  wrapper.querySelectorAll('section').forEach(e => {
    e.classList.add('page-slide');
  });
  let touchStart = 0;
  function sectionState(swiper, slide) {
    /**
     * 
     * @param {swiper} Swiper 
     * @param {slide} domElement 
     * 
     */

    slide.addEventListener('touchstart', ev => {
      touchStart = ev.touches[0].clientY;
    });
    slide.addEventListener('touchend', ev => {
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
          swiper.mousewheel.enable();
          swiper.allowTouchMove = true;
          swiper.slideNext();
        } else {
          slide.dataset.animeState++;
        }
      }
      touchStart = 0;
    });
  }
  const swiper = new swiper_swiper/* default */.Z(main, {
    modules: [modules/* Mousewheel */.Gk, modules/* EffectCreative */.gI],
    direction: 'vertical',
    effect: 'creative',
    creativeEffect: {},
    initialSlide: 4,
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
      init: swiper => {
        swiper.slides[swiper.activeIndex].classList.add('anime-start');
        swiper.wrapperEl.querySelectorAll('[data-anime-states]').forEach(el => {
          sectionState(swiper, el);
        });
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
        console.log('start', swiper.activeIndex);
        console.log(swiper.activeIndex - 1);
      },
      slideChangeTransitionEnd: swiper => {
        console.log('end', swiper.activeIndex);
        swiper.slides[swiper.activeIndex].classList.remove('anime-over');
        swiper.slides[swiper.activeIndex].classList.add('anime-start');
        const activeSlide = swiper.slides[swiper.activeIndex];
        swiper.slides[swiper.activeIndex - 1] ? swiper.slides[swiper.activeIndex - 1].dataset.animeState = 1 : '';
        swiper.slides[swiper.activeIndex + 1] ? swiper.slides[swiper.activeIndex + 1].dataset.animeState = 1 : '';
        activeSlide.classList.remove('_opened');
        activeSlide.querySelectorAll("._opened").forEach(e => {
          e.classList.remove('_opened');
        });

        /* 
             swiper.mousewheel.disable();
             swiper.allowTouchMove = false;
              */

        if (activeSlide.dataset.animeStates && window.innerWidth < 769) {
          swiper.mousewheel.disable();
          swiper.allowTouchMove = false;
          activeSlide.dataset.animeState = 1;
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
    const smallImg = new swiper_swiper/* default */.Z(ourSpecialists.querySelector('.our-specialists__small.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* EffectFade */.xW],
      slidesPerView: 1,
      effect: 'fade',
      speed: 100,
      fadeEffect: {
        crossFade: false
      },
      simulateTouch: false,
      navigation: {
        prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
        nextEl: ourSpecialists.querySelector('.swiper-btn-next')
      }
    });
    const userInfo = new swiper_swiper/* default */.Z(ourSpecialists.querySelector('.our-specialists__info-data.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* EffectFade */.xW],
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
        nextEl: ourSpecialists.querySelector('.swiper-btn-next')
      }
    });
    const bigImg = new swiper_swiper/* default */.Z(ourSpecialists.querySelector('.our-specialists__big.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* EffectFade */.xW],
      slidesPerView: 1,
      effect: 'fade',
      speed: 100,
      fadeEffect: {
        crossFade: false
      },
      navigation: {
        prevEl: ourSpecialists.querySelector('.swiper-btn-prev'),
        nextEl: ourSpecialists.querySelector('.swiper-btn-next')
      }
    });
    bigImg.on('slideChange', swiper => {
      smallImg.slideTo(swiper.activeIndex);
      userInfo.slideTo(swiper.activeIndex);
    });
  }
  const results = document.querySelector('.results');
  if (results) {
    const one = new swiper_swiper/* default */.Z(results.querySelector('.results__c-sliders-one.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* EffectFade */.xW],
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
    });
    const two = new swiper_swiper/* default */.Z(results.querySelector('.results__c-sliders-two.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* EffectFade */.xW],
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
    });
    /*  one.on('slideChange', (swiper) => {
         two.slideTo(swiper.activeIndex)
        })
     two.on('slideChange', (swiper) => {
         one.slideTo(swiper.activeIndex)
        }) */
  }
}

function initForms() {
  function formSubmit(inputData) {}
  const forms = document.querySelectorAll('.form');
  if (forms) {
    forms.forEach(e => {
      new Form(e, formSubmit);
      const phone = $(e).find('input[name="phone"]');
      if (phone) {
        new Inputmask('+7 (999) 999-99-99').mask(phone);
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
function sectionTopper() {
  const t = document.querySelectorAll('.section-with-topper');
  if (!t) return;
  function click(e) {
    e.target.closest('.section-with-topper').classList.toggle('_opened');
  }
  t.forEach(e => {
    e.querySelector('.section-with-topper__main').addEventListener('click', click, {
      once: true
    });
  });
}
function modalsHandler() {
  const modalOpeners = $('.modal-opener'),
    modalClosers = $('.modal-closer'),
    html = $('html');
  if (!modalOpeners || !modalClosers) return;
  modalOpeners.on('click', ev => {
    const {
      modal
    } = ev.currentTarget.dataset;
    $(`.modal-${modal}`).fadeIn().addClass('_opened');
    html.addClass('_lock');
  });
  modalClosers.on('click', ev => {
    const {
      classList
    } = ev.target;
    if (!classList.contains('modal-closer')) return;
    if (classList.contains('modal')) {
      $(ev.target).fadeOut().removeClass('_opened');
    } else {
      $(ev.target.closest('.modal')).fadeOut().removeClass('_opened');
    }
    html.removeClass('_lock');
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [390,729,522], function() { return __webpack_require__(576); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;