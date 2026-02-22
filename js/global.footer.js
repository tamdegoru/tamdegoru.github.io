<script>
    // Автоматичний рік
    document.getElementById("year").textContent = new Date().getFullYear();

    // Кнопка вгору
    const scrollBtn = document.querySelector(".scroll-top");

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
</script>
