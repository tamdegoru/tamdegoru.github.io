/**
 * Логіка для футера та загальних елементів інтерфейсу
 */

let footerInitialized = false;

export function initFooter() {
    if (footerInitialized) {
        return true;
    }

    const scrollBtn = document.getElementById("scrollTopBtn");
    const yearSpan = document.getElementById("year");

    if (!scrollBtn || !yearSpan) {
        return false;
    }

    yearSpan.textContent = new Date().getFullYear();

    const toggleScrollButton = () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    };

    window.addEventListener("scroll", toggleScrollButton);

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    toggleScrollButton();

    footerInitialized = true;
    return true;
}
