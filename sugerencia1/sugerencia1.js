function mostrarAreaOtra(){

    const valor =
        document.querySelector(
            'input[name="area"]:checked'
        )?.value;

    const campo =
        document.getElementById(
            "otraArea"
        );

    if(valor === "OTRA"){

        campo.classList.add(
            "mostrar"
        );

    }else{

        campo.classList.remove(
            "mostrar"
        );

        campo.value = "";

    }

}

function mostrarTipoOtro(){

    const valor =
        document.querySelector(
            'input[name="tipo"]:checked'
        )?.value;

    const campo =
        document.getElementById(
            "otroTipo"
        );

    if(valor === "OTRA"){

        campo.classList.add(
            "mostrar"
        );

    }else{

        campo.classList.remove(
            "mostrar"
        );

        campo.value = "";

    }

}

document.addEventListener(
    "change",
    function(e){

        if(e.target.name === "area"){
            mostrarAreaOtra();
        }

        if(e.target.name === "tipo"){
            mostrarTipoOtro();
        }

    }
);

function continuar(){

    let area =
        document.querySelector(
            'input[name="area"]:checked'
        )?.value;

    let tipo =
        document.querySelector(
            'input[name="tipo"]:checked'
        )?.value;

    if(!area || !tipo){

        document.getElementById(
            "modalValidacion"
        ).style.display = "flex";

        return;

    }

    if(area === "OTRA"){

        area =
            document.getElementById(
                "otraArea"
            ).value.trim();

        if(!area){

            document.getElementById(
                "modalValidacion"
            ).style.display = "flex";

            return;

        }

    }

    if(tipo === "OTRA"){

        tipo =
            document.getElementById(
                "otroTipo"
            ).value.trim();

        if(!tipo){

            document.getElementById(
                "modalValidacion"
            ).style.display = "flex";

            return;

        }

    }

    localStorage.setItem(
        "areaMejora",
        area
    );

    localStorage.setItem(
        "tipoMejora",
        tipo
    );

    window.location.href =
        "../sugerencia2/sugerencia2.html";

}

function volver(){

    window.location.href =
        "../desviaciones.html";

}

function cerrarModal(){

    document.getElementById(
        "modalValidacion"
    ).style.display = "none";

}