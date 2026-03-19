let headerInitialized = false;

export function initHeader() {
    const header = document.querySelector(".header");
    const burger = document.querySelector("#burger-btn");
    const nav = document.querySelector("#nav-menu");

    if (!header) {
        return false;
    }

    if (burger && nav) {
        if (!burger.dataset.bound) {
            burger.addEventListener("click", () => {
                nav.classList.toggle("active");
                const isOpen = nav.classList.contains("active");
                burger.textContent = isOpen ? "✕" : "☰";
                burger.setAttribute("aria-expanded", String(isOpen));
            });

            const navLinks = nav.querySelectorAll("a");
            navLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    nav.classList.remove("active");
                    burger.textContent = "☰";
                    burger.setAttribute("aria-expanded", "false");
                });
            });

            burger.dataset.bound = "true";
        }
    }

    if (headerInitialized) {
        return true;
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
