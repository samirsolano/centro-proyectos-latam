let fotos = [];

window.onload = function () {

    // DATOS DEL USUARIO

    document.getElementById("nombre").textContent =
        localStorage.getItem("nombre") || "-";

    document.getElementById("puesto").textContent =
        localStorage.getItem("puesto") || "-";

    document.getElementById("jd").textContent =
        localStorage.getItem("jd") || "-";

    // DATOS DEL REPORTE

    document.getElementById("tipo").textContent =
        localStorage.getItem("tipoDesviacion") || "-";

    document.getElementById("zona").textContent =
        localStorage.getItem("zona") || "-";

    document.getElementById("ubicacion").textContent =
        localStorage.getItem("ubicacion") || "-";

    document.getElementById("descripcion").textContent =
        localStorage.getItem("descripcion") || "-";

    // FOTOS

    const btnAgregar =
        document.querySelector(".btnAgregar");

    const inputFotos =
        document.getElementById("evidencias");

    btnAgregar.addEventListener("click", () => {

        inputFotos.click();

    });

    inputFotos.addEventListener("change", function (e) {

        const archivos =
            Array.from(e.target.files);

        if (fotos.length + archivos.length > 5) {

            alert("Máximo 5 evidencias");

            return;
        }

        archivos.forEach(archivo => {

            fotos.push(archivo);

        });

        renderFotos();

    });

};

// =========================
// MOSTRAR FOTOS
// =========================

function renderFotos() {

    const contenedor =
        document.getElementById("contenedorFotos");

    const titulo =
        document.getElementById("tituloFotos");

    contenedor.innerHTML = "";

    titulo.textContent =
        `EVIDENCIAS (${fotos.length}/5)`;

    fotos.forEach((foto, index) => {

        const reader = new FileReader();

        reader.onload = function (e) {

            const div =
                document.createElement("div");

            div.className = "miniatura";

            div.innerHTML = `
                <img src="${e.target.result}">
                <button
                    class="eliminar"
                    onclick="eliminarFoto(${index})">
                    ✕
                </button>
            `;

            contenedor.appendChild(div);

        };

        reader.readAsDataURL(foto);

    });

}

// =========================
// ELIMINAR FOTO
// =========================

function eliminarFoto(index) {

    fotos.splice(index, 1);

    renderFotos();

}

// =========================
// VOLVER
// =========================

function volver() {

    window.location.href =
        "../desviaciones3/desviaciones3.html";

}

// =========================
// ENVIAR
// =========================

async function enviarReporte() {

    const btnEnviar =
        document.querySelector(".btnEnviar");

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

        tipo:
            localStorage.getItem("tipoDesviacion") || "",

        zona:
            localStorage.getItem("zona") || "",

        ubicacion:
            localStorage.getItem("ubicacion") || "",

        descripcion:
            localStorage.getItem("descripcion") || "",

        fotos: []

    };

    try {

        // CONVERTIR FOTOS A BASE64

        for(const foto of fotos){

            const base64 =
                await convertirABase64(
                    foto
                );

            datos.fotos.push(
                base64
            );

        }

        await fetch(
            "https://script.google.com/macros/s/AKfycbzHu5hoVNiEAtyuCpOWv3Y8Fs-u15H3e4t6LqV-K7rpwvxpDkdF39OQ_vkTk_MMZANN/exec",
            {
                method:"POST",
                mode:"no-cors",
                body:
                    JSON.stringify(
                        datos
                    )
            }
        );

        window.location.href =
            "../exito/exito.html";

    } catch (error) {

        console.error(error);

        alert(
            "Error al enviar reporte"
        );

    }

    btnEnviar.disabled = false;

    btnEnviar.textContent =
        "Enviar reporte";

}

function convertirABase64(
    archivo
){

    return new Promise(
        (resolve,reject)=>{

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
