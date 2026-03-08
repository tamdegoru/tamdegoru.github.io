// Змінна для перевірки, чи вже запущено ініціалізацію
let footerInitialized = false;

export function initFooter() {
    if (footerInitialized) return true;

    // Отримання посилань на елементи DOM
    const footerLogo = document.getElementById("footerLogo");
    const yearSpan = document.getElementById("year");

    // Вставка поточного року в копірайт
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Обробка кліку на логотип для плавного скролу до початку сторінки
    if (footerLogo) {
        footerLogo.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    footerInitialized = true;
    return true;
}
