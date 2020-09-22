import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

export const swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.slider__pagination',
    type: 'bullets',
  },
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 0,
    stretch: -40,
    depth: 100,
    modifier: 3.5,
    slideShadows: false,
  },
  width: 838,
  initialSlide: 1,
  breakpoints: {
    1366: {
      width: 838,
      spaceBetween: 20,
    },
    1024: {
      width: 760,
      spaceBetween: 20,
    },
    768: {
      width: 580,
      spaceBetween: -30,
    },
    320: {
      slidesPerView: 1,
      width: 291,
    },
  },
})
