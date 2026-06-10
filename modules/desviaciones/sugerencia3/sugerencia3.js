let fotos = [];

window.onload = function () {

    // DATOS USUARIO

    document.getElementById("nombre").textContent =
        localStorage.getItem("nombre") || "-";

    document.getElementById("puesto").textContent =
        localStorage.getItem("puesto") || "-";

    document.getElementById("jd").textContent =
        localStorage.getItem("jd") || "-";

    // DATOS SUGERENCIA

    document.getElementById("area").textContent =
        localStorage.getItem("areaMejora") || "-";

    document.getElementById("tipoMejora").textContent =
        localStorage.getItem("tipoMejora") || "-";

    document.getElementById("situacionActual").textContent =
        localStorage.getItem("situacionActual") || "-";

    document.getElementById("propuestaMejora").textContent =
        localStorage.getItem("propuestaMejora") || "-";

    cargarBeneficios();

    configurarFotos();

};

// =========================
// BENEFICIOS
// =========================

function cargarBeneficios() {

    const contenedor =
        document.getElementById(
            "beneficiosContainer"
        );

    contenedor.innerHTML = "";

    const beneficios =
        JSON.parse(
            localStorage.getItem(
                "beneficiosMejora"
            ) || "[]"
        );

    beneficios.forEach(
        beneficio => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "beneficioItem";

            item.textContent =
                "✓ " + beneficio;

            contenedor.appendChild(
                item
            );

        }
    );

}

// =========================
// FOTOS
// =========================

function configurarFotos() {

    const btnAgregar =
        document.querySelector(
            ".btnAgregar"
        );

    const inputFotos =
        document.getElementById(
            "evidencias"
        );

    btnAgregar.addEventListener(
        "click",
        () => {

            inputFotos.click();

        }
    );

    inputFotos.addEventListener(
        "change",
        function (e) {

            const archivos =
                Array.from(
                    e.target.files
                );

            if (
                fotos.length +
                archivos.length > 5
            ) {

                alert(
                    "Máximo 5 evidencias"
                );

                return;

            }

            archivos.forEach(
                archivo => {

                    fotos.push(
                        archivo
                    );

                }
            );

            renderFotos();

        }
    );

}

// =========================
// MOSTRAR FOTOS
// =========================

function renderFotos() {

    const contenedor =
        document.getElementById(
            "contenedorFotos"
        );

    contenedor.innerHTML = "";

    document.getElementById(
        "tituloFotos"
    ).textContent =

        `EVIDENCIAS (${fotos.length}/5)`;

    fotos.forEach(
        (foto, index) => {

            const reader =
                new FileReader();

            reader.onload =
                function (e) {

                    const div =
                        document.createElement(
                            "div"
                        );

                    div.className =
                        "miniatura";

                    div.innerHTML = `
                        <img src="${e.target.result}">
                        <button
                            class="eliminar"
                            onclick="eliminarFoto(${index})">
                            ✕
                        </button>
                    `;

                    contenedor.appendChild(
                        div
                    );

                };

            reader.readAsDataURL(
                foto
            );

        }
    );

}

// =========================
// ELIMINAR FOTO
// =========================

function eliminarFoto(index) {

    fotos.splice(
        index,
        1
    );

    renderFotos();

}

// =========================
// VOLVER
// =========================

function volver() {

    window.location.href =
        "../sugerencia2/sugerencia2.html";

}

// =========================
// ENVIAR
// =========================

async function enviarSugerencia() {

    
    const btnEnviar =
        document.querySelector(
            ".btnEnviar"
        );

    btnEnviar.disabled = true;

    btnEnviar.textContent =
        "Enviando...";

    const datos = {

        dni:
            localStorage.getItem("dni") || "",

        nombre:
            localStorage.getItem("nombre") || "",

        puesto:
            localStorage.getItem("puesto") || "",

        jd:
            localStorage.getItem("jd") || "",

        area:
            localStorage.getItem("areaMejora") || "",

        tipoMejora:
            localStorage.getItem("tipoMejora") || "",

        situacionActual:
            localStorage.getItem("situacionActual") || "",

        propuestaMejora:
            localStorage.getItem("propuestaMejora") || "",

        beneficios:
            localStorage.getItem("beneficiosTexto") || "",

        fotos: []

    };

    try {

        for (const foto of fotos) {

            const base64 =
                await convertirABase64(
                    foto
                );

            datos.fotos.push(
                base64
            );

        }

        await fetch(
            "TU_URL_APPS_SCRIPT",
            {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(
                    datos
                )
            }
        );

        document.getElementById(
            "modalExito"
        ).style.display =
            "flex";

    } catch (error) {

        console.error(error);

        alert(
            "Error al enviar sugerencia"
        );

    }

    btnEnviar.disabled = false;

    btnEnviar.textContent =
        "Enviar sugerencia";

}

// =========================
// BASE64
// =========================

function convertirABase64(
    archivo
) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();

            reader.onload =
                () => resolve(
                    reader.result
                );

            reader.onerror =
                error => reject(
                    error
                );

            reader.readAsDataURL(
                archivo
            );

        }
    );

}

// =========================
// MODALES
// =========================

function cerrarModal() {

    document.getElementById(
        "modalValidacion"
    ).style.display =
        "none";

}

function limpiarRegistro() {

    localStorage.removeItem(
        "areaMejora"
    );

    localStorage.removeItem(
        "tipoMejora"
    );

    localStorage.removeItem(
        "situacionActual"
    );

    localStorage.removeItem(
        "propuestaMejora"
    );

    localStorage.removeItem(
        "beneficiosMejora"
    );

    localStorage.removeItem(
        "beneficiosTexto"
    );

    fotos = [];

}

function irCentroProyectos() {

    limpiarRegistro();

    window.location.href =
        "../../inicio/home.html";

}

function nuevaSugerencia() {

    limpiarRegistro();

    window.location.href =
        "../desviaciones.html";

}
