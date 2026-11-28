//! Esta partecita está muy suavicremas, no funciona ya me sacó la piedra >:c
const cards = document.querySelectorAll(".flip-card");

// Recorremos cada tarjeta
cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("show");
    });
});