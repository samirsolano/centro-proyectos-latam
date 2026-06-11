const API_URL =
"https://script.google.com/macros/s/AKfycbzHu5hoVNiEAtyuCpOWv3Y8Fs-u15H3e4t6LqV-K7rpwvxpDkdF39OQ_vkTk_MMZANN/exec";

document.addEventListener(
    "DOMContentLoaded",
    function(){

        cargarCabecera();

        cargarPreguntas();

    }
);

// =====================================
// CABECERA
// =====================================

function cargarCabecera(){

    document.getElementById(
        "lblZona"
    ).textContent =

        sessionStorage.getItem(
            "zona"
        ) || "";

    document.getElementById(
        "lblPasillo"
    ).textContent =

        sessionStorage.getItem(
            "pasillo"
        ) || "";

    document.getElementById(
        "lblAuditor"
    ).textContent =

        sessionStorage.getItem(
            "auditor"
        ) || "";

    const ahora =
        new Date();

    document.getElementById(
        "lblFecha"
    ).textContent =

        ahora.toLocaleDateString(
            "es-PE"
        );

    document.getElementById(
        "lblHora"
    ).textContent =

        ahora.toLocaleTimeString(
            "es-PE",
            {
                hour:"2-digit",
                minute:"2-digit"
            }
        );

}

// =====================================
// CARGAR PREGUNTAS
// =====================================

async function cargarPreguntas(){

    try{

        const zona =
            sessionStorage.getItem(
                "zona"
            );

        const respuesta =
            await fetch(

                API_URL +
                "?preguntas=1&zona=" +
                encodeURIComponent(
                    zona
                )

            );

        const datos =
            await respuesta.json();

        construirPreguntas(
            datos
        );

    }catch(error){

        console.error(
            error
        );

        mostrarMensaje(
            "ERROR",
            "No se pudieron cargar las preguntas"
        );

    }

}

function construirPreguntas(datos){

    let html = "";

    let sActual = "";

    let contador = 0;

    datos.forEach(function(item){

        if(
            item.s != sActual
        ){

            sActual =
                item.s;

            contador = 0;

            let titulo = "";

            if(item.s == "1S")
                titulo = "SEPARAR";

            if(item.s == "2S")
                titulo = "SITUAR";

            if(item.s == "3S")
                titulo = "SANITIZAR";

            if(item.s == "4S")
                titulo = "ESTANDARIZAR";

            if(item.s == "5S")
                titulo = "SOSTENER";

            html += `

            <div class="bloque">

                <div class="s${item.s.replace("S","")}">

                    <div class="cabeceraS">

                        <div class="etiquetaS">

                            ${item.s}

                        </div>

                        <div class="tituloS">

                            ${titulo}

                        </div>

                    </div>

                </div>

            `;

        }

        contador++;

        html += `

        <div
            class="pregunta"
            data-s="${item.s}"
            data-pregunta="${item.pregunta}"
            data-foto="${item.foto}"
            data-ok="${item.respuestaOk}">

            <div class="filaPregunta">

                <div class="ladoIzquierdo">

                    <div class="numero">

                        ${contador}

                    </div>

                    <div class="texto">

                        ${item.pregunta}

                    </div>

                </div>

                <div class="ladoBotones">

                    <button
                        class="si"
                        onclick="seleccionar(this)">

                        ○ Sí

                    </button>

                    <button
                        class="no"
                        onclick="seleccionar(this)">

                        ○ No

                    </button>

                </div>

            </div>

            <div
                class="contenedorFoto">
            </div>

        </div>

        `;

    });

    document.getElementById(
        "contenedorPreguntas"
    ).innerHTML = html;

}

// =====================================
// RESPUESTAS
// =====================================

function seleccionar(boton){

    const grupo =
        boton.parentElement;

    const pregunta =
        boton.closest(
            ".pregunta"
        );

    const reglaFoto =
        String(
            pregunta.dataset.foto
        ).trim();

    const respuesta =
        boton.innerText
        .replace("○","")
        .trim();

    const contenedor =
        pregunta.querySelector(
            ".contenedorFoto"
        );

    if(
        respuesta != reglaFoto
    ){

        grupo
        .querySelectorAll(
            "button"
        )
        .forEach(btn=>{

            btn.classList.remove(
                "seleccionado"
            );

        });

        boton.classList.add(
            "seleccionado"
        );

        contenedor.innerHTML = "";

        return;

    }

    const input =
        document.createElement(
            "input"
        );

    input.type = "file";

    input.accept =
        "image/*";

    input.capture =
        "environment";

    input.click();

    input.addEventListener(
        "change",
        function(){

            if(
                input.files &&
                input.files.length > 0
            ){

                const archivo =
                    input.files[0];

                const lector =
                    new FileReader();

                lector.onload =
                function(e){

                    pregunta.dataset.base64 =
                        e.target.result;

                    pregunta.dataset.nombreFoto =
                        archivo.name;

                    grupo
                    .querySelectorAll(
                        "button"
                    )
                    .forEach(btn=>{

                        btn.classList.remove(
                            "seleccionado"
                        );

                    });

                    boton.classList.add(
                        "seleccionado"
                    );

                    contenedor.innerHTML =

                    `
                    <div class="evidenciaOK">

                        📸 Evidencia registrada

                    </div>
                    `;

                };

                lector.readAsDataURL(
                    archivo
                );

            }

        }

    );

}

// =====================================
// FINALIZAR
// =====================================

document.getElementById(
    "btnFinalizar"
).addEventListener(
    "click",
    finalizarAuditoria
);



async function finalizarAuditoria(){

    const preguntas =
        document.querySelectorAll(
            ".pregunta"
        );

    let total = 0;
    let correctas = 0;

    let faltanRespuestas = false;
    let faltanFotos = false;

    const detalle = [];

    preguntas.forEach(function(p){

        const marcado =
            p.querySelector(
                ".seleccionado"
            );

        if(!marcado){

            faltanRespuestas = true;
            return;

        }

        total++;

        const respuesta =
            marcado.innerText
            .replace("○","")
            .trim();

        if(
            respuesta ==
            p.dataset.ok
        ){

            correctas++;

        }

        if(
            respuesta ==
            p.dataset.foto
        ){

            const evidencia =
                p.querySelector(
                    ".evidenciaOK"
                );

            if(!evidencia){

                faltanFotos = true;

            }

        }

        detalle.push({

            s:
                p.dataset.s,

            pregunta:
                p.dataset.pregunta,

            respuesta:
                respuesta,

            respuestaOk:
                p.dataset.ok,

            cumple:
                (
                    respuesta ==
                    p.dataset.ok
                )
                ? "SI"
                : "NO",

            fotoRequerida:
                p.dataset.foto,

            fotoTomada:
                p.querySelector(
                    ".evidenciaOK"
                )
                ? "SI"
                : "NO",

            nombreFoto:
                p.dataset.nombreFoto || "",

            base64:
                p.dataset.base64 || ""

        });

    });

    if(faltanRespuestas){

        mostrarMensaje(
            "⚠ ATENCIÓN",
            "Faltan preguntas por responder"
        );

        return;

    }

    if(faltanFotos){

        mostrarMensaje(
            "📷 ATENCIÓN",
            "Faltan fotos obligatorias"
        );

        return;

    }

    const porcentaje =
        Math.round(
            (
                correctas /
                total
            ) * 100
        );

    const datos = {

        tipoRegistro:
            "AUDITORIA",

        horaInicio:
            sessionStorage.getItem(
                "horaInicio"
            ),

        horaFin:
            new Date()
            .toLocaleTimeString(
                "es-PE"
            ),

        zona:
            sessionStorage.getItem(
                "zona"
            ),

        turno:
            sessionStorage.getItem(
                "turno"
            ) || "",

        pasillo:
            sessionStorage.getItem(
                "pasillo"
            ),

        nombre:
            sessionStorage.getItem(
                "auditor"
            ),

        porcentaje:
            porcentaje,

        resultado:
            porcentaje >= 80
            ? "APROBADO"
            : "NO APROBADO",

        duracion:0,

        hallazgos:
            total - correctas,

        totalPreguntas:
            total,

        totalCorrectas:
            correctas,

        detalle:
            detalle

    };

    mostrarCarga();

    try{

        await fetch(
            API_URL,
            {
                method:"POST",
                mode:"no-cors",
                body:
                    JSON.stringify(
                        datos
                    )
            }
        );

        ocultarCarga();

        console.log(
            "AUDITORIA ENVIADA"
        );

        document.getElementById(
            "lblResultadoFinal"
        ).textContent =

            "Resultado: " +
            porcentaje +
            "%";

        document.getElementById(
            "modalResultado"
        ).style.display =
            "flex";

    }catch(error){

        ocultarCarga();

        console.error(
            error
        );

        alert(
            error.message
        );

        mostrarMensaje(
            "ERROR",
            error.message
        );

    }

}


// =====================================
// MODALES
// =====================================

function mostrarMensaje(
    titulo,
    mensaje
){

    document.getElementById(
        "tituloMensaje"
    ).textContent =
        titulo;

    document.getElementById(
        "textoMensaje"
    ).textContent =
        mensaje;

    document.getElementById(
        "modalMensaje"
    ).style.display =
        "flex";

}

document.getElementById(
    "btnCerrarMensaje"
).addEventListener(
    "click",
    function(){

        document.getElementById(
            "modalMensaje"
        ).style.display =
            "none";

    }
);

document.getElementById(
    "btnVolverInicio"
).addEventListener(
    "click",
    function(){

        window.location.href =
            "../inicio/home.html";

    }
);


function mostrarCarga(){

    document.getElementById(
        "modalCarga"
    ).style.display =
        "flex";

    document.getElementById(
        "textoCarga"
    ).textContent =
        "Preparando auditoría...";

    setTimeout(function(){

        document.getElementById(
            "textoCarga"
        ).textContent =
            "Guardando respuestas...";

    },1500);

    setTimeout(function(){

        document.getElementById(
            "textoCarga"
        ).textContent =
            "Subiendo evidencias...";

    },3500);

    setTimeout(function(){

        document.getElementById(
            "textoCarga"
        ).textContent =
            "Finalizando...";

    },5500);

}

function ocultarCarga(){

    document.getElementById(
        "modalCarga"
    ).style.display =
        "none";

}
