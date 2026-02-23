/**
 * Логіка для футера та загальних елементів інтерфейсу
 */

export function initFooter() {
    console.log("Footer script initialized");

    const scrollBtn = document.getElementById("scrollTopBtn");
    const yearSpan = document.getElementById("year");

    // 1. Оновлення поточного року
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Логіка кнопки "Вгору"
    if (scrollBtn) {
        // Функція для показу/приховування кнопки
        const toggleScrollButton = () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        };

        // Слухаємо скрол
        window.addEventListener("scroll", toggleScrollButton);

        // Плавний скрол вгору при натисканні
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        // Викликаємо один раз одразу, якщо користувач вже посередині сторінки при завантаженні
        toggleScrollButton();
    }
}

// Автоматичний запуск при імпорті
initFooter();
