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
                burger.textContent = nav.classList.contains("active") ? "✕" : "☰";
            });

            const navLinks = nav.querySelectorAll("a");
            navLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    nav.classList.remove("active");
                    burger.textContent = "☰";
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
