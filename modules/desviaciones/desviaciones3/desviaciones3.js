let zonaInput;
let ubicacionInput;
let descripcionInput;
let contadorInput;

window.onload = function(){

    zonaInput =
        document.getElementById("zona");

    ubicacionInput =
        document.getElementById("ubicacion");

    descripcionInput =
        document.getElementById("descripcion");

    contadorInput =
        document.getElementById("contador");

    /* RECUPERAR DATOS SI EXISTEN */

    zonaInput.value =
        localStorage.getItem("zona") || "";

    ubicacionInput.value =
        localStorage.getItem("ubicacion") || "";

    descripcionInput.value =
        localStorage.getItem("descripcion") || "";

    contadorInput.innerHTML =
        descripcionInput.value.length;

    descripcionInput.addEventListener(
        "input",
        actualizarContador
    );

};

function actualizarContador(){

    contadorInput.innerHTML =
        descripcionInput.value.length;

}

function continuar(){

    const zona =
        zonaInput.value.trim();

    const ubicacion =
        ubicacionInput.value.trim();

    const descripcion =
        descripcionInput.value.trim();

    if(
        !zona ||
        !ubicacion ||
        !descripcion
    ){

        alert(
            "Completa todos los campos"
        );

        return;
    }

    /* GUARDAR DATOS */

    localStorage.setItem(
        "zona",
        zona
    );

    localStorage.setItem(
        "ubicacion",
        ubicacion
    );

    localStorage.setItem(
        "descripcion",
        descripcion
    );

    /* IR A PANTALLA 4 */

    window.location.href =
        "../desviaciones4/desviaciones4.html";

}

function volver(){

    window.location.href =
        "../desviaciones2/desviaciones2.html";

}

/* AJUSTE PARA CELULARES */

document.addEventListener(
    "focusin",
    function(e){

        if(
            e.target.tagName === "INPUT" ||
            e.target.tagName === "TEXTAREA" ||
            e.target.tagName === "SELECT"
        ){

            setTimeout(function(){

                e.target.scrollIntoView({

                    block:"center",

                    behavior:"smooth"

                });

            },300);

        }

    }
);