window.onload = function(){

    const nombre =
        localStorage.getItem("nombre") || "Usuario";

    const puesto =
        localStorage.getItem("puesto") || "-";

    document.getElementById(
        "nombreUsuario"
    ).textContent =
        "Hola, " + nombre;

    document.getElementById(
        "puestoUsuario"
    ).textContent =
        "Puesto: " + puesto;

};

function abrirChecklist(){

    alert("Abrir módulo Check List 5S");

}

function abrirDesviaciones(){

    window.location.href =
        "../desviaciones/desviaciones.html";

}
