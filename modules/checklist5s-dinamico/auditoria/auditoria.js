const API_URL =
"https://script.google.com/macros/s/AKfycbzHu5hoVNiEAtyuCpOWv3Y8Fs-u15H3e4t6LqV-K7rpwvxpDkdF39OQ_vkTk_MMZANN/exec";

let colaboradores = [];

document.addEventListener(
    "DOMContentLoaded",
    function(){

        cargarAuditoria();

    }
);

async function cargarAuditoria(){

    const zona =
        sessionStorage.getItem(
            "zonaSeleccionada"
        );

    if(!zona){

        alert(
            "No se encontró zona seleccionada"
        );

        return;

    }

    document.getElementById(
        "tituloZona"
    ).textContent = zona;

    // IMAGEN DE LA ZONA

    const imagenZona =
        sessionStorage.getItem(
            "imagenZona"
        );

    if(imagenZona){

        const hero =
            document.querySelector(
                ".heroZona"
            );

        hero.style.backgroundImage =
            `url('${imagenZona}')`;

    }

    try{

        const respuesta =
            await fetch(

                API_URL +
                "?colaboradores=1&zona=" +
                encodeURIComponent(
                    zona
                )

            );

        colaboradores =
            await respuesta.json();

        if(
            colaboradores.length === 0
        ){

            alert(
                "No existen colaboradores para esta zona y turno"
            );

            return;

        }

        cargarPasillos();

        actualizarHora();

    }catch(error){

        console.error(
            error
        );

        alert(
            "Error cargando colaboradores"
        );

    }

}

function cargarPasillos(){

    const cmbPasillo =
        document.getElementById(
            "cmbPasillo"
        );

    cmbPasillo.innerHTML = "";

    colaboradores.forEach(
        (c,index)=>{

            cmbPasillo.innerHTML +=

            `<option value="${index}">
                ${c.pasillo}
            </option>`;

        }
    );

    if(
        colaboradores.length > 0
    ){

        mostrarColaborador(0);

    }

    cmbPasillo.addEventListener(
        "change",
        function(){

            mostrarColaborador(
                this.value
            );

        }
    );

}

function mostrarColaborador(index){

    const dato =
        colaboradores[index];

    document.getElementById(
        "nombreColaborador"
    ).textContent =
        dato.nombre;

    document.getElementById(
        "fotoColaborador"
    ).src =
        dato.foto;

    document.getElementById(
        "cmbColaborador"
    ).innerHTML =

    `<option>
        ${dato.nombre}
    </option>`;

}

function actualizarHora(){

    const ahora =
        new Date();

    const hora =
        ahora.toLocaleTimeString(
            "es-PE",
            {
                hour:"2-digit",
                minute:"2-digit"
            }
        );

    document.getElementById(
        "horaActual"
    ).textContent =
        hora;

    const h =
        ahora.getHours();

    document.getElementById(
        "turnoActual"
    ).textContent =

        (h >= 7 && h < 19)
        ? "DÍA"
        : "NOCHE";

}

document.getElementById(
    "btnIniciar"
).addEventListener(
    "click",
    function(){

        const indice =
            document.getElementById(
                "cmbPasillo"
            ).value;

        const dato =
            colaboradores[indice];

        sessionStorage.setItem(
            "pasillo",
            dato.pasillo
        );

        sessionStorage.setItem(
            "auditor",
            dato.nombre
        );

        sessionStorage.setItem(
            "foto",
            dato.foto
        );

        sessionStorage.setItem(
            "horaInicio",
            new Date().toISOString()
        );

        window.location.href =
            "../checklist/checklist.html";

    }
);


// =====================================
// CAMBIAR COLABORADOR
// =====================================

document
.getElementById(
    "btnCambiar"
)
.addEventListener(
    "click",
    function(){

        document
        .getElementById(
            "txtNuevoColaborador"
        ).style.display =
            "block";

        document
        .getElementById(
            "btnGuardarNombre"
        ).style.display =
            "block";

    }
);

document
.getElementById(
    "btnGuardarNombre"
)
.addEventListener(
    "click",
    function(){

        const nuevoNombre =
            document
            .getElementById(
                "txtNuevoColaborador"
            )
            .value
            .trim();

        if(
            nuevoNombre === ""
        ){
            return;
        }

        document
        .getElementById(
            "nombreColaborador"
        ).textContent =
            nuevoNombre;

        document
        .getElementById(
            "cmbColaborador"
        ).innerHTML =
            `<option>${nuevoNombre}</option>`;

        document
        .getElementById(
            "txtNuevoColaborador"
        ).style.display =
            "none";

        document
        .getElementById(
            "btnGuardarNombre"
        ).style.display =
            "none";

    }
);
