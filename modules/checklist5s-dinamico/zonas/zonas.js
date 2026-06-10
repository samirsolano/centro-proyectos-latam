const API_URL =
"https://script.google.com/macros/s/AKfycbzHu5hoVNiEAtyuCpOWv3Y8Fs-u15H3e4t6LqV-K7rpwvxpDkdF39OQ_vkTk_MMZANN/exec";

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarZonas();

    }
);

async function cargarZonas() {

    try {

        const respuesta =
            await fetch(
                API_URL + "?zonas=1"
            );

        const zonas =
            await respuesta.json();

        let html = "";

        zonas.forEach(z => {

            html += `

                <div
                    class="cardZona"
                    onclick="seleccionarZona('${z.zona}','${z.imagen}')">

                    <img
                        src="${z.imagen}"
                        alt="${z.zona}">

                    <div class="info">

                        <div class="titulo">
                            ${z.zona}
                        </div>

                        <div class="nombre">

                            <span>
                                ${z.nombre}
                            </span>

                            <div class="flecha">
                                ›
                            </div>

                        </div>

                    </div>

                </div>

            `;

        });

        document.getElementById(
            "contenedorZonas"
        ).innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById(
            "contenedorZonas"
        ).innerHTML =

        `<p>Error cargando zonas</p>`;

    }

}

function seleccionarZona(zona, imagen) {

    sessionStorage.setItem(
        "zonaSeleccionada",
        zona
    );

    sessionStorage.setItem(
        "imagenZona",
        imagen
    );

    window.location.href =
        "../auditoria/auditoria.html";

}

function volverInicio() {

    window.location.href =
        "../../inicio/home.html";

}
