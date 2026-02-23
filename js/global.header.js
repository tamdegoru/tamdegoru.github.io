let headerInitialized = false;

export function initHeader() {
    if (headerInitialized) {
        return true;
    }

    const header = document.querySelector(".header");
    if (!header) {
        return false;
    }

    const onScroll = () => {
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    headerInitialized = true;
    return true;
}
