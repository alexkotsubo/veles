'use strict';
let activeFixedMenu = false;
let body = document.querySelector('body');
let nav = document.querySelector('#nav');
let fixedPadding = document.querySelectorAll('.fixed-padding');

/* IB */

function ib() {
	let ib = document.querySelectorAll(".ib");
	for (let i = 0; i < ib.length; i++) {
		if (ib[i].querySelector('.ib_use')) {
			ib[i].style.backgroundImage = 'url(' + ib[i].querySelector('.ib_use').getAttribute('src') + ')';
		}
	}
}

ib();

/* Header Slider */

const slidesOfHeaderSlider = document.querySelectorAll('.header__slider-slide');
const curSlideItem = document.querySelector('.header__slider-count span:first-child');
const slideAmountItem = document.querySelector('.header__slider-count span:last-child');

const headerSlider = new Swiper('.header__slider', {
	loop: true,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

  on: {
    init: function () {
  		curSlideItem.innerHTML = this.realIndex + 1;
  		slideAmountItem.innerHTML = slidesOfHeaderSlider.length;
    },
  },
});

headerSlider.on('slideChange', function () {
  curSlideItem.innerHTML = headerSlider.realIndex + 1;
  slideAmountItem.innerHTML = slidesOfHeaderSlider.length;
});

const parentOriginal = document.querySelector('.header__content');
const parent = document.querySelector('.header');
const item = document.querySelector('.header__slider');

function replaceItem() {
	const viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport <= 991) {
		if (!item.classList.contains('done')) {
			parent.prepend(item);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parentOriginal.append(item);
			item.classList.remove('done');
		}
	}
}

window.addEventListener('resize', replaceItem);
replaceItem();

/* Burger */

addBurger(document.querySelector('#nav-burger'));

function addBurger(elem, variation = 1) {
	let button = document.querySelector('#' + elem.id + ' .burger__btn');
	let links = document.querySelectorAll('#' + elem.id + ' .burger__link');
	let bgElem = document.querySelector('#' + elem.id + ' .burger__bg');
	let burgerClose;

	if (button && links && bgElem && elem) {
		if (variation === 1) {
			elem.classList.add('variation_1');
			burgerClose = document.querySelector('#' + elem.id + ' .burger__close-btn');
			burgerClose.addEventListener('click', function(e) {
				elem.classList.remove('active');
				burgBodyUnLock();
			});
		} else if (variation === 2) {
			elem.classList.add('variation_2');
		}

		elem.classList.remove('active');
		burgBodyUnLock();

		button.addEventListener('click', function(e) {
			let popupActive = document.querySelector('.popup.open');

			if (popupActive) {
				closePopup(popupActive, false);
			}

			if (elem.classList.contains('active') && variation === 2) {
				elem.classList.remove('active');
				burgBodyUnLock();
			} else {
				elem.classList.add('active');
				burgBodyLock();
			}
		});

		for(let i = 0, length = links.length; i < length; i++) {
			links[i].addEventListener('click', function(e) {
				elem.classList.remove('active');
				burgBodyUnLock();
			});
		}

		document.documentElement.addEventListener('click', function(e) {
			if ((!e.target.closest('.burger') && elem.classList.contains('active')) || (e.target.closest('.' + bgElem.classList) && elem.classList.contains('active'))) {
				elem.classList.remove('active');
				burgBodyUnLock();
			}
		});
	}
}

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixedPadding.length > 0) {
		for(let i = 0, length = fixedPadding.length; i < length; i++) {
			fixedPadding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	setTimeout(helpFunction, 300);
	function helpFunction() {
		if (fixedPadding.length > 0) {
			for(let i = 0, length = fixedPadding.length; i < length; i++) {
				fixedPadding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}
}