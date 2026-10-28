// 

const OTRO = document.getElementById("otraCiudad");
const addCiudad = document.getElementById("inputCity");

addCiudad.addEventListener("change", () => {
    if (addCiudad.value === "otro") {
        OTRO.hidden = false;
        }   else {
            OTRO.hidden = true;
        }
});