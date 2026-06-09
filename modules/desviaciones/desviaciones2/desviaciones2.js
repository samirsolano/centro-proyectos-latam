let tipoSeleccionado = "";

function seleccionar(card, tipo) {

    document
        .querySelectorAll(".opcion")
        .forEach(x => {
            x.classList.remove(
                "opcionSeleccionada"
            );
        });

    card.classList.add(
        "opcionSeleccionada"
    );

    tipoSeleccionado = tipo;
}

function continuar() {

    if (!tipoSeleccionado) {

        alert(
            "Selecciona una opción"
        );

        return;
    }

    localStorage.setItem(
        "tipoDesviacion",
        tipoSeleccionado
    );

    window.location.href =
        "../desviaciones3/desviaciones3.html";
}

function volver() {
    window.location.href = "../desviaciones.html";
}
