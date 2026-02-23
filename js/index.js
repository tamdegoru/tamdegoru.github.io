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

export async function initSite() {
    if (isSiteInitialized) {
        return;
    }

    const [{ initHeader }, { initFooter }] = await loadModules();

    const isHeaderReady = initHeader();
    const isFooterReady = initFooter();

    isSiteInitialized = isHeaderReady && isFooterReady;
}

window.initSite = initSite;
