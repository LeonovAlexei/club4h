
const numberCurrentSlide = document.querySelector('.current_slide'); // номер текущего слайда
const totalSlide = document.querySelector('.total_slides'); //всего слайдов
const btnPrev = document.querySelector('.button_left');
const btnNext = document.querySelector('.button_right');
const slides = document.getElementsByClassName('slider_item');
let slideToShow;
(screen.width<768) ? slideToShow = 1 : slideToShow = 3;
let currentSlideIndex = 0;
let lastSlideIndex = slides.length-1;
let summSlide = slides.length;
let indexvive = '';
let timer = 0;

totalSlide.textContent = summSlide.toString();
let slidersLine = document.getElementById('sliders_line');
const slideWidth = slidersLine.firstElementChild.clientWidth;
const gap = parseInt(window.getComputedStyle(slidersLine).columnGap) ;
const widthTransform=slideWidth+gap;

function movingSlides (slideIndex) {
	[...slides].forEach((s, i) => {
		s.style.transform = `translate3d(${widthTransform * (i - slideIndex)}px,0,0)`
	})
	currentSlideIndex = slideIndex;
	getNumberCurentSlide();
}

movingSlides(currentSlideIndex);

function getNumberCurentSlide(){
let index = (slideToShow === 3 )? slideToShow: currentSlideIndex
	indexvive = parseInt(slides[index].className.match(/\d+/));
	numberCurrentSlide.textContent = indexvive.toString();
	}

function readyNextSlide() {

	if (currentSlideIndex === (lastSlideIndex - slideToShow)) {
		slides[lastSlideIndex].insertAdjacentElement("afterend", slides[0]);
		slides[lastSlideIndex].style.transform = `translate3d(${widthTransform}px, 0,0)`;
		currentSlideIndex--;
		getNumberCurentSlide();
	}

	if (currentSlideIndex === 0) {
		slides[0].insertAdjacentElement("beforebegin", slides[lastSlideIndex]);
		slides[0].style.transform = `translate3d(-${widthTransform}px ,0 ,0)`;
		currentSlideIndex++; //		это связано с тем, что текущий слайд теперь является вторым слайдом
		getNumberCurentSlide();
	}

}

if (currentSlideIndex === lastSlideIndex || currentSlideIndex === 0) readyNextSlide();

function shiftSlides(direction) {
	direction ? currentSlideIndex++ : currentSlideIndex--

	if (currentSlideIndex === (lastSlideIndex - slideToShow)|| currentSlideIndex === 0) readyNextSlide();

	movingSlides(currentSlideIndex);

}

btnNext.addEventListener("click", shiftSlides.bind(null, 1));
btnPrev.addEventListener("click", shiftSlides.bind(null, 0));

function makeTimer(){
	clearInterval(timer);
	timer = setInterval(shiftSlides.bind(null, 1),4000);
}
makeTimer();
