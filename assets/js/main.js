import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
    interval: 1000,
    //containerID: '#carousel',
    slideID: '.item',
    isPlaying: true
});

carousel.init();