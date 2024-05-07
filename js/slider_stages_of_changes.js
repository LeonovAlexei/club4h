if (screen.width<768) {
	document.addEventListener("DOMContentLoaded", initSlider)

	function initSlider() {
		let activeSlideIndex = 0,
			slides = document.querySelectorAll(".stage_for_mobile_slider"),
			slidesQuantity = slides.length,
			slidersLine = document.querySelector('.stages'),
			btnPrev = document.querySelector('.button_left_2'),
			btnNext = document.querySelector('.button_right_2'),
			slideWidth = slidersLine.firstElementChild.clientWidth,
			gap = parseInt(getComputedStyle(slidersLine).columnGap),
			widthTransform = slideWidth + gap;
			btnNext.addEventListener("click", shiftSlides.bind(null, 1));
			btnPrev.addEventListener("click", shiftSlides.bind(null, 0));
		function movingSlides(slideIndex) {
			[...slides].forEach((s, i) => {
				s.style.transform = `translate3d(${widthTransform * (i - slideIndex)}px,0,0)`
			})
		}

		movingSlides(activeSlideIndex);
		initSliderClick();
		initSliderPagination(slidesQuantity)
		switchButtons();
		function initSliderClick() {
			document.addEventListener('click', (ev) => {
				let target;

				if (target = ev.target.closest(".pagination-item")) {
					let neededIndex = target.dataset.index;
					activeSlideIndex = +neededIndex;
					movingSlides(activeSlideIndex);
					switchPagination();
					switchButtons();
				}
			})
		}

		function shiftSlides(direction) {
			direction ? activeSlideIndex++ : activeSlideIndex--
			movingSlides(activeSlideIndex);
			switchPagination();
			switchButtons();

		}

		function switchPagination(){
			document.querySelector(".pagination-item.active").classList.remove("active")
			document.querySelectorAll(".pagination-item")[activeSlideIndex].classList.add("active")
		}

		function switchButtons(){
			activeSlideIndex === 0 ? btnPrev.disabled = true : btnPrev.disabled = false;
			activeSlideIndex === (slidesQuantity-1) ? btnNext.disabled = true : btnNext.disabled = false;

		}

		function initSliderPagination(quantity){
			let paginationContainer = document.querySelector(".dots_block")
			for(let i = 0; i < quantity; i++){
				let spanElement = document.createElement("span")
				spanElement.classList.add("pagination-item")
				if(i === 0) spanElement.classList.add("active")
				spanElement.setAttribute("data-index",i)
				paginationContainer.appendChild(spanElement)
			}
		}
	}
}