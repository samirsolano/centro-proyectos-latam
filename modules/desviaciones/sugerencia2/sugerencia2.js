let beneficiosSeleccionados = [];

window.onload = function(){

    const situacion =
        localStorage.getItem(
            "situacionActual"
        );

    const propuesta =
        localStorage.getItem(
            "propuestaMejora"
        );

    if(situacion){

        document.getElementById(
            "situacionActual"
        ).value = situacion;

        actualizarContador(
            document.getElementById(
                "situacionActual"
            ),
            "contador1"
        );

    }

    if(propuesta){

        document.getElementById(
            "propuestaMejora"
        ).value = propuesta;

        actualizarContador(
            document.getElementById(
                "propuestaMejora"
            ),
            "contador2"
        );

    }

};

function actualizarContador(
    textarea,
    idContador
){

    document.getElementById(
        idContador
    ).textContent =
        textarea.value.length +
        "/600";

}

function toggleBeneficio(
    card,
    beneficio
){

    card.classList.toggle(
        "seleccionado"
    );

    if(
        beneficiosSeleccionados.includes(
            beneficio
        )
    ){

        beneficiosSeleccionados =
            beneficiosSeleccionados.filter(
                item => item !== beneficio
            );

    }else{

        beneficiosSeleccionados.push(
            beneficio
        );

    }

}

function continuar(){

    const situacion =
        document
            .getElementById(
                "situacionActual"
            )
            .value
            .trim();

    const propuesta =
        document
            .getElementById(
                "propuestaMejora"
            )
            .value
            .trim();

    if(
        !situacion ||
        !propuesta ||
        beneficiosSeleccionados.length === 0
    ){

        document.getElementById(
            "modalValidacion"
        ).style.display =
            "flex";

        return;

    }

    localStorage.setItem(
        "situacionActual",
        situacion
    );

    localStorage.setItem(
        "propuestaMejora",
        propuesta
    );

    localStorage.setItem(
        "beneficiosMejora",
        JSON.stringify(
            beneficiosSeleccionados
        )
    );

    localStorage.setItem(
        "beneficiosTexto",
        beneficiosSeleccionados.join(
            ", "
        )
    );

    window.location.href =
        "../sugerencia3/sugerencia3.html";

}

function volver(){

    window.location.href =
        "../sugerencia1/sugerencia1.html";

}

function cerrarModal(){

    document.getElementById(
        "modalValidacion"
    ).style.display =
        "none";

}