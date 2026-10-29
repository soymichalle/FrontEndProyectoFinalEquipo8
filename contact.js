// Algunas funcionalidades básicas en inputs

// -- Alternativa para "otro" en ciudad --

const OTRO = document.getElementById("otraCiudad");
const addCiudad = document.getElementById("inputCity");

addCiudad.addEventListener("change", () => {
    if (addCiudad.value === "otro") {
        OTRO.hidden = false;
        }   else {
            OTRO.hidden = true;
        }
});

// -- Para indicativo de país --

const indicativoPais = document.getElementById("inputPhone");

window.intlTelInput(indicativoPais, {
    initialCountry: "co", separateDialCode: true
});
