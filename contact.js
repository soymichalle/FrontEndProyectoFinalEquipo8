// Algunas funcionalidades básicas en inputs

// -- Alternativa para "otro" en ciudad --

const OTRO = document.getElementById("otraCiudad");
const addCiudad = document.getElementById("inputCity");

addCiudad.addEventListener("change", () => {
    if (addCiudad.value === "otro") {
        OTRO.hidden = false;
        OTRO.focus();
        }   else {
            OTRO.hidden = true;
        }
});

// -- Para indicativo de país --

const indicativoPais = document.getElementById("inputPhone");

window.intlTelInput(indicativoPais, {
    initialCountry: "co", separateDialCode: true
});

// -- Para que enter pase de campo a campo --

const FORMULARIO = document.querySelector("form");

FORMULARIO.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
        event.preventDefault();

        const campos = Array.from(
            FORMULARIO.querySelectorAll(
                "input:not([hidden]), select, textarea"
            )
        );

        const indice = campos.indexOf(event.target);

        if (indice >= 0 && indice < campos.length - 1) {
            campos[indice + 1].focus();
        }
    }
});