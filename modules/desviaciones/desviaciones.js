document.addEventListener("DOMContentLoaded", () => {

    const nombre =
        localStorage.getItem("nombre") ||
        "Samuel Solano";

    const puesto =
        localStorage.getItem("puesto") ||
        "Operador Logístico";

    const nombreElemento =
        document.getElementById("nombreBienvenida");

    const puestoElemento =
        document.getElementById("puestoBienvenida");

    if(nombreElemento){
        nombreElemento.textContent =
            `Hola, ${nombre}`;
    }

    if(puestoElemento){
        puestoElemento.textContent =
            `Puesto: ${puesto}`;
    }

});

function abrirAnomalia(){

    window.location.href =
        "./desviaciones2/desviaciones2.html";

}

function abrirMejora() {
    window.location.href = "sugerencia1/sugerencia1.html";
}
