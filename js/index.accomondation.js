let isSiteInitialized = false;
let modulesPromise;

async function loadModules() {
    if (!modulesPromise) {
        modulesPromise = Promise.all([
            import("./global.header.js"),
            import("./global.footer.js")
        ]);
    }
    return modulesPromise;
}

function initRoomCards() {
    const roomCards = document.querySelectorAll("[data-room-card]");

    roomCards.forEach((card) => {
        const button = card.querySelector("[data-room-button]");
        const moreText = card.querySelector("[data-room-more]");

        if (!button || !moreText) return;

        button.onclick = () => {
            const isHidden = moreText.hidden;
            moreText.hidden = !isHidden;
            button.textContent = isHidden ? "Сховати" : "Дізнатися більше";
        };
    });
}

export async function initSite() {
    const [{ initHeader }, { initFooter }] = await loadModules();

    const isHeaderReady = initHeader();
    const isFooterReady = initFooter();

    initRoomCards();

    isSiteInitialized = isHeaderReady && isFooterReady;
}

window.initSite = initSite;

window.addEventListener("resize", () => {
    if (!isSiteInitialized) return;
    initRoomCards();
});
