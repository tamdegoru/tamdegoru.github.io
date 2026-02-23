let isSiteInitialized = false;
let modulesPromise;

const MOBILE_MAX_WIDTH = 767;
const MOBILE_VISIBLE_IMAGES = 5;
const SLIDER_AUTOPLAY_MS = 5000;

let galerySliderIntervalId;

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

    if (!galleryGrid || !showAllButton) {
        return;
    }

    const cards = Array.from(galleryGrid.querySelectorAll(".galery-card"));
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;

    cards.forEach((card, index) => {
        const shouldHideCard = isMobile && index >= MOBILE_VISIBLE_IMAGES;
        card.classList.toggle("is-hidden-mobile", shouldHideCard);
    });

    showAllButton.hidden = !isMobile;

    showAllButton.onclick = () => {
        cards.forEach((card) => {
            card.classList.remove("is-hidden-mobile");
        });

        showAllButton.hidden = true;
    };
}

function initGalerySlider() {
    const slidesTrack = document.querySelector("#galery-slides");

    if (!slidesTrack) {
        return;
    }

    const slides = Array.from(slidesTrack.querySelectorAll("img"));

    if (slides.length === 0) {
        return;
    }

    const totalSlides = slides.length;
    let currentSlideIndex = 0;

    const updateSlidePosition = () => {
        slidesTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    };

    const goToNextSlide = () => {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateSlidePosition();
    };

    const goToPreviousSlide = () => {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    };

    const resetAutoplay = () => {
        window.clearInterval(galerySliderIntervalId);
        galerySliderIntervalId = window.setInterval(goToNextSlide, SLIDER_AUTOPLAY_MS);
    };

    window.galeryNext = () => {
        goToNextSlide();
        resetAutoplay();
    };

    window.galeryPrev = () => {
        goToPreviousSlide();
        resetAutoplay();
    };

    updateSlidePosition();
    resetAutoplay();
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
    if (!isSiteInitialized) {
        return;
    }

    initGalleryVisibility();
});
