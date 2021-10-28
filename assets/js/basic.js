const container = document.querySelector('#carousel');
const slides = container.querySelectorAll('.slide');
const indicatorsContainer = container.querySelector('#indicators-container');
const indicators = indicatorsContainer.querySelectorAll('.indicator');
const controlsContainer = document.querySelector('#controls-container');
const pauseBtn = controlsContainer.querySelector('#pause-btn');
const prevBtn = controlsContainer.querySelector('#prev-btn');
const nextBtn = controlsContainer.querySelector('#next-btn');

const SLIDES_COUNT = slides.length;
const CODE_LEFT_ARROW = 'ArrowLeft';
const CODE_RIGHT_ARROW = 'ArrowRight';
const CODE_SPACE = 'Space';
const FA_PAUSE = '<i class="far fa-pause-circle"></i>'
const FA_PLAY = '<i class="far fa-play-circle"></i>'

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let swipeStartX = null;
let swipeEndX = null;
let interval = 1000;

function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    indicators[currentSlide].classList.toggle('active');
    slides[currentSlide].classList.toggle('active');
};

const gotoPrev = () => gotoNth(currentSlide - 1);

const gotoNext = () => gotoNth(currentSlide + 1);

function prev() {
    pause();
    gotoPrev();
};

function next() {
    pause();
    gotoNext();
};

function pause() {
    if (isPlaying) {
        clearInterval(timerID);
        pauseBtn.innerHTML = FA_PLAY;
        isPlaying = false;
    };
};

function play() {
    timerID = setInterval(gotoNext, interval);
    pauseBtn.innerHTML = FA_PAUSE;
    isPlaying = true;
};

const pausePlay = () => isPlaying ? pause() : play();

function indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
        pause();
        gotoNth(+target.dataset.slideTo);
    };
};

function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
}

function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX > 100) next();
    if (swipeStartX - swipeEndX < -100) prev();
}

function initListeners() {
    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
}

function init() {
    initListeners();
    timerID = setInterval(gotoNext, interval)
}

init();
