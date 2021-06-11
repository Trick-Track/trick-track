const slides = document.querySelectorAll('.slider-tracker');
const nextSlide = document.querySelector('.slider__arrow--next');
const previousSlide = document.querySelector('.slider__arrow--prew');

 let slideNumber = 1;

 
//  class slider {
      
//   constructor(selector) {  
//     this.loop = false;
//     this.autoplay = false;
//     this.slide = selector;
//     this.interval = 5000;

  showSlide(slideNumber)

   const showSlide = (n) => {
      let i;
      if (n > slides.length) {
        slideNumber = 1;
      }
      if (n < 1) {
        slideNumber = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("slide-current");
      }

      slides[slideNumber-1].classList.add("slide-current");
    }

    function nextSlides() {
      showSlide(slideNumber += 1);
    }
    function currentSlide (n) {
      showSlide(slideNumber = n);
    }