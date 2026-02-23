let isSiteInitialized = false;
let modulesPromise;

const MOBILE_MAX_WIDTH = 767;
const MOBILE_VISIBLE_IMAGES = 5;

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

export async function initSite() {
    const [{ initHeader }, { initFooter }] = await loadModules();

    const isHeaderReady = initHeader();
    const isFooterReady = initFooter();

    initGalleryVisibility();

    isSiteInitialized = isHeaderReady && isFooterReady;
}

window.initSite = initSite;

window.addEventListener("resize", () => {
    if (!isSiteInitialized) {
        return;
    }

    initGalleryVisibility();
});
