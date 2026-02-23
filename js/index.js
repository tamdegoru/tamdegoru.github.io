let isSiteInitialized = false;
let modulesPromise;

const MOBILE_MAX_WIDTH = 767;
const MOBILE_VISIBLE_IMAGES = 5;
const SLIDER_AUTOPLAY_MS = 5000;

let galerySliderIntervalId = null;

async function loadModules() {
    if (!modulesPromise) {
        modulesPromise = Promise.all([
            import("./global.header.js"),
            import("./global.footer.js")
        ]);
    }
    return modulesPromise;
}

function initGalleryVisibility() {
    const galleryGrid = document.querySelector("#galery-grid");
    const showAllButton = document.querySelector("#show-all-gallery-btn");

    if (!galleryGrid || !showAllButton) return;

    const cards = Array.from(galleryGrid.querySelectorAll(".galery-card"));
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;

    cards.forEach((card, index) => {
        const shouldHideCard = isMobile && index >= MOBILE_VISIBLE_IMAGES;
        card.classList.toggle("is-hidden-mobile", shouldHideCard);
    });

    showAllButton.hidden = !isMobile;

    showAllButton.onclick = () => {
        cards.forEach((card) => card.classList.remove("is-hidden-mobile"));
        showAllButton.hidden = true;
    };
}

function initGalerySlider() {
    const slidesTrack = document.querySelector("#galery-slides");
    if (!slidesTrack) return;

    const slides = Array.from(slidesTrack.querySelectorAll("img"));
    if (!slides.length) return;

    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    function updateSlidePosition() {
        slidesTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }

    function goToNextSlide() {
        currentSlideIndex++;
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = 0;
        }
        updateSlidePosition();
    }

    function goToPreviousSlide() {
        currentSlideIndex--;
        if (currentSlideIndex < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        updateSlidePosition();
    }

    function startAutoplay() {
        if (galerySliderIntervalId) {
            clearInterval(galerySliderIntervalId);
        }
        galerySliderIntervalId = setInterval(goToNextSlide, SLIDER_AUTOPLAY_MS);
    }

    window.galeryNext = () => {
        goToNextSlide();
        startAutoplay();
    };

    window.galeryPrev = () => {
        goToPreviousSlide();
        startAutoplay();
    };

    updateSlidePosition();
    startAutoplay();
}

export async function initSite() {
    const [{ initHeader }, { initFooter }] = await loadModules();

    const isHeaderReady = initHeader();
    const isFooterReady = initFooter();

    initGalleryVisibility();
    initGalerySlider();

    isSiteInitialized = isHeaderReady && isFooterReady;
}

window.initSite = initSite;

window.addEventListener("resize", () => {
    if (!isSiteInitialized) return;
    initGalleryVisibility();
});
