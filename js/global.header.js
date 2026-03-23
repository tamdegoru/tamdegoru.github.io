let headerInitialized = false;
let scrollHandlerBound = false;

export function initHeader() {
    const header = document.querySelector(".header");
    const burger = document.querySelector("#burger-btn");
    const nav = document.querySelector("#nav-menu");

    if (!header) {
        console.warn("Header not found: .header");
        return false;
    }

    // Бургер-меню
    if (burger && nav && !burger.dataset.bound) {
        burger.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("active");

            burger.textContent = isOpen ? "✕" : "☰";
            burger.setAttribute("aria-expanded", String(isOpen));
            header.classList.toggle("menu-open", isOpen);
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                header.classList.remove("menu-open");
                burger.textContent = "☰";
                burger.setAttribute("aria-expanded", "false");
            });
        });

        burger.dataset.bound = "true";
    }

    // Скрол-ефект для header
    if (!scrollHandlerBound) {
        const onScroll = () => {
            if (window.scrollY > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", onScroll);
        onScroll();
        scrollHandlerBound = true;
    }

    headerInitialized = true;
    return true;
}
