// alert("Verificando que JS está leyéndose")

// Recurso útil para conocer métodos y demás cosas de JS: https://developer.mozilla.org/en-US/docs/Web/JavaScript

 // Con "document.getElementById" puedo entrar a leer etiquetas del archivo de HTML. Es como si conectara un órgano al cerebro. Dicha conexión la haré a través de variables "const" q usaré en diferentes funciones; son "const" pq serán constantes (su valor no cambiará)
const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById
("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaOponente = document.getElementById("mascota-oponente")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasOponente = document.getElementById("vidas-oponente")

const seccionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelOponente = document.getElementById("ataques-del-oponente")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

// Creo variables "globales", es decir q estén por fuera de una función, de tal manera que varias fxnes la puedan ver. Son "let" pues sus valores van a cambiar

// esta primer variable la voy a usar en el BACKEND
let jugadorId = null 
let oponenteId = null

let mokepones = []
// el anterior es un "array" al q le insertaré mokepones más adelante
let mokeponesOponentes = []
// La anterior lista la usaré para el Backend también
let ataqueJugador = []
let ataqueOponente = []
let resultadoCombate
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponOponente
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueOponente
let victoriasJugador = 0
let victoriasOponente = 0
// let vidasJugador = 3 
// let vidasOponente = 3
// ambos jugadores empezaban con 3 vidas en la primer parte del curso

// Preparo lienzo para dibujar en 2d
let lienzo = mapa.getContext("2d")
// Para q canvas se actualice constante/ con el fin de ver movimiento
let intervalo

// Para cargar imagen sobre canvas
let mapaBackground = new Image()
mapaBackground.src = "/04 Mokepones-optimizac/assets/cuadricula.jpg"

// Para hacer el mapa responsive, parametrizo ancho y alto en fxn del ancho de la pantalla
let alturaDeseada
// con "window.innerWidth" puedo hacer q el ancho del navegador sea un parámetro
let anchoDelMapa = window.innerWidth - 24
// Voy a fijar una medida máxima del mapa
const anchoMaximoMapa = 500
if(anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 24
}
// Con regla de tres, partiendo de unas medidas arbitrarias deseadas (800 de ancho y 600 de alto) puedo determinar la altura q necesito
alturaDeseada = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaDeseada





// Creo clase q usaré en el juego. Para diferenciarlas de las variables, su nombre inicia con mayúscula
class Mokepon {
    // aquí digo qué voy a construir
    // constructor(nombre, foto, vida) {
    constructor(nombre, foto, vida, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        // Dejaré array para cargar ataques posterior/
        this.ataques = []
        // this.x = 20
        // this.y = 30
        this.ancho = 60
        this.alto = 60
        // Fijar posición aleatoria de mokepon en c/juego, en algun número q esté entre 0 y....
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    // Esto es un método (fxn) de una clase
    pintarMokepon() {
        // Dibujar mascota
        lienzo.drawImage(
            this.mapaFoto,
            this.x, 
            this.y, 
            this.ancho/2, 
            this.alto/2
            // Disminuyo su tamaño pq quiero q se vean más pequeños cuando estén dentro del mapa
    )
    }
}

// Empiezo a construir Mokepones usando la clase creada previa/
let hipodoge = new Mokepon("Hipodoge", "./assets/png/hipodoge.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/png/capipepo2.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/png/ratigueya.png", 5)
let langostelvis = new Mokepon("Langostelvis", "./assets/png/langostelvis.png", 5)
let tucapalma = new Mokepon("Tucapalma", "./assets/png/tucapalma.png", 5)
let pydos = new Mokepon("Pydos", "./assets/png/pydos.png", 5)

// let hipodoge = new Mokepon("Hipodoge", "/05-Mokepones-backend/public/assets/png/hipodoge.png", 5)
// let capipepo = new Mokepon("Capipepo", "/05-Mokepones-backend/public/assets/png/capipepo2.png", 5)
// let ratigueya = new Mokepon("Ratigueya", "/05-Mokepones-backend/public/assets/png/ratigueya.png", 5)
// let langostelvis = new Mokepon("Langostelvis", "/05-Mokepones-backend/public/assets/png/langostelvis.png", 5)
// let tucapalma = new Mokepon("Tucapalma", "/05-Mokepones-backend/public/assets/png/tucapalma.png", 5)
// let pydos = new Mokepon("Pydos", "/05-Mokepones-backend/public/assets/png/pydos.png", 5)





// Agrupo ataques en listas dentro de una constante q más adelante la utilizaré
const HIPODOGE_ATAQUES = [
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Fuego", id: "boton-fuego"},
    { nombre: "Tierra", id: "boton-tierra"}
]

const CAPIPEPO_ATAQUES = [
    { nombre: "Tierra", id: "boton-tierra"},
    { nombre: "Tierra", id: "boton-tierra"},
    { nombre: "Tierra", id: "boton-tierra"},
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Fuego", id: "boton-fuego"}
]

const RATIGUEYA_ATAQUES = [
    { nombre: "Fuego", id: "boton-fuego"},
    { nombre: "Fuego", id: "boton-fuego"},
    { nombre: "Fuego", id: "boton-fuego"},
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Tierra", id: "boton-tierra"}
]

const LANGOSTELVIS_ATAQUES = [
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Fuego", id: "boton-fuego"},
    { nombre: "Agua", id: "boton-tierra"},
    { nombre: "Fuego", id: "boton-fuego"},
    { nombre: "Agua", id: "boton-agua" }
]

const TUCAPALMA_ATAQUES = [
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Tierra", id: "boton-tierra"},
    { nombre: "Agua", id: "boton-agua" },
    { nombre: "Tierra", id: "boton-tierra"},
    { nombre: "Agua", id: "boton-agua" }
]

const PYDOS_ATAQUES = [
    { nombre: "Tierra", id: "boton-tierra"},
    { nombre: "Fuego", id: "boton-fuego"},
    { nombre: "Tierra", id: "boton-tierra"},
    { nombre: "Fuego", id: "boton-fuego"},
    { nombre: "Tierra", id: "boton-tierra"}
]

// Cargar ataques a un array q hay dentro de un objeto. Según c/mascota, varía el tipo de ataques q tendrán
hipodoge.ataques.push(...HIPODOGE_ATAQUES)
// Los "..." me permiten pasar los valores q están dentro de la lista y no en la forma q tienen dentro de la lista. Es como si hubiera escrito todos esos valores dentro de ese paréntesis
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

pydos.ataques.push(...PYDOS_ATAQUES)



// Agruparé mokepones al "array" creado previa/
mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

// Para verificar durante el proceso q se esté creando bien, puedo usar la consola del navegador para verlo
// console.log(hipodoge, capipepo, ratigueya)
// console.log(mokepones)








// A partir de aquí están las fxnes q se ejecutan a lo largo del juego

function iniciarJuego () {
    // Esconder secciones q jugador no necesita ver, hasta tanto no seleccione previamente su mascota
    seccionSeleccionarAtaque.style.display = "none"
    seccionReiniciar.style.display = "none"
    seccionVerMapa.style.display = "none"
   
    // utilizaré un método (una fxn) para recorrer (iterar) array "mokepones" (ir por c/u de los objetos q están dentro del array) e insertarlo en HTML
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById("Hipodoge")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    inputLangostelvis = document.getElementById("Langostelvis")
    inputTucapalma = document.getElementById("Tucapalma")
    inputPydos = document.getElementById("Pydos")
    })

    // Cuando haga click en esa etiqueta, ejecute esa fxn q va a ir a mirar qué mascota se seleccionó. Es como si definiera la acción q va a llevar a cabo ese órgano.
    botonMascotaJugador.addEventListener("click", seleccionaMascotaJugador)

    // Creo "escuchadores" para saber qué ataque elige el usuario (también si da click en reiniciar).
    botonReiniciar.addEventListener("click", reiniciarJuego)

    // Invoco fxn q me permitirá conectarme con servidor (el BACKEND)
    unirseAlJuego()
}

// Declaro fxn invocada previamente (conexión con BACKEND):
function unirseAlJuego() {
    // Hago llamada a un servicio a través de "fetch" (una petición). En este caso indico lo q configuré en el servidor
    // el "localhost" me funcionó cuando todo lo hacía desde mi PC. Si quiero poderlo jugar desde un cel, debo reemplazarlo por "192.168.1.62" q es la dirección IP de mi computador
    fetch("http://192.168.1.62:8080/unirse")
        // Con el método "then" de "fetch" asigno fxn con respuesta del servidor
        .then(function (res) {
            // console.log(res)
            // Para obtener respuesta legible... q signifique algo, q diga algo útil. Si la petición salió OK le pido q me traiga la respuesta
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}



// AQUÍ CONTÍNUO CON COSAS DE FRONTEND Y LE APARECERÁN OTRAS COSAS DE BACKEND

// Fxn para q aparezca alerta anunciando qué mascota se seleccionó
function seleccionaMascotaJugador () {
    if (inputHipodoge.checked) {
        // alert ("Seleccionaste a Hipodoge")
        // Con "innerHTML" puedo modificar contenido de etiquetas en HTML (lo q ve el usuario). En este caso, infórmele al usuario q seleccionó a Hipodoge
        spanMascotaJugador.innerHTML = inputHipodoge.id
        // Con la siguiente fxn, almaceno ese nombre para usarlo en otras fxnes
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    } else {
        alert("Debes seleccionar una mascota");
        // location.reload()
        return
    } 

    // Ocultar sección q ya no se necesita
    seccionSeleccionarMascota.style.display = "none"
    
    // Aquí creo elementos para dibujar en la pantalla
    seccionVerMapa.style.display = "flex"

    // Enviar este dato al BACKEND
    seleccionarMokepon(mascotaJugador)

    // Genere mapa sobre el q van a jugar las mascotas
    iniciarMapa()

    // Con esta fxn extraeré los ataques asociados a la mascota seleccionada, con el fin de mostrarlos en pantalla
    extraerAtaques(mascotaJugador)

    // Esto selecciona mascota oponente de manera aleatoria
    // seleccionaMascotaOponente()
}

// Defino fxn para enviar cosas al BACKEND
function seleccionarMokepon(mascotaJugador) {
    // fetch(("http://192.168.1.62:8080/mokepon" + "/:jugadorId"), {
    // La línea de arriba equivale a lo mismo q está en la de abajo, solo q se usa una sintaxis diferente
    fetch(`http://192.168.1.62:8080/mokepon/${jugadorId}`, {
        // Por defecto "fetch" es de tipo "get", por lo cual debo decirle q sea de tipo "post"
        method: "post",
        // indico el tipo de dato q enviaré
        headers: {
            "Content-Type": "application/json"
        },
        // "stringify" convierte un JSON en texto
        body: JSON.stringify ({
            mokepon: mascotaJugador
        })
    })
}


function extraerAtaques(mascotaJugador) {
    let ataques
    // este ciclo se lee: la variable "i" empieza en 0; mientras "i" sea menor a la longitud del array "mokepones", ejecute la fxn definida abajo; después de eso, sume una unidad a "i" hasta q llegue a longitud del array y se rompa
    for (let i = 0; i < mokepones.length; i++) {
        // Si la mascota q se seleccionó es igual al nombre del elemento de ese array, asígnele los ataques correspondientes a esa mascota
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    // console.log(ataques)
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    // Por c/ataque q exista dentro del array de "ataques" insertar en HTML información de los ataques
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    // Puesto q para este momento los botones ya se crearon desde JS y se insertaron en HTML, puedo darles interacción desde JS
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")

    // Ingreso contenido a array con botonoes q tienen la clase "BAtaque". Esto es para q todos los botones fxnen y no únicamente algunos de ellos
    botones = document.querySelectorAll(`.BAtaque`)
}

function secuenciaAtaque() {
    // Por c/boton q exista en el array "botones" agrega un evento de click y validar cuál es el valor q se está seleccionando (el ataque q se está seleccionando)
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Fuego") {
                ataqueJugador.push("Fuego")
                // Cambio estilo de boton q ya se seleccionó
                boton.style.background = "#403d3960"
                boton.style.border = "none";
                boton.style.color = "#403d39"
                // Deshabilitar botones para q usuario no pueda seguir jugando
                boton.disabled = true
            } else if (e.target.textContent === "Agua") {
                ataqueJugador.push("Agua")
                boton.style.background = "#403d3960"
                boton.style.border = "none";
                boton.style.color = "#403d39"
                boton.disabled = true
            } else {
                ataqueJugador.push("Tierra")
                boton.style.background = "#403d3960"
                boton.style.border = "none";
                boton.style.color = "#403d39"
                boton.disabled = true
            }
            // Si los ataques del jugador son iguales a 5, entonces active fxn de enviarAtaques (q es del BACKEND)
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

// Fxn del BACKEND para los ataques
function enviarAtaques () {
    fetch(`http://192.168.1.62:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.62:8080/mokepon/${oponenteId}/ataques`)
        .then(function(res) {
            if(res.ok) {
                res.json()
                    .then(function({ ataques }) {
                        if(ataques.length === 5) {
                            ataqueOponente = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionaMascotaOponente (oponente) {    
    // Si supiera q solo habrán 3 opciones:
    // let mascotaAleatorio = aleatorio(1,3)

    // Pero si quiero q fxn se escale posterior/, dejo abierta la posibilidad q aumente cantidad de manera aleatoria. En este caso el 1 pasa a ser 0 pq ese es el primer elemento del array y le disminuyo 1 al máximo pq empecé desde 0
    // let mascotaAleatorio = aleatorio(0, mokepones.length -1)
    // spanMascotaOponente.innerHTML = mokepones[mascotaAleatorio].nombre
    // ataquesMokeponOponente = mokepones[mascotaAleatorio].ataques

    spanMascotaOponente.innerHTML = oponente.nombre
    ataquesMokeponOponente = oponente.ataques

    secuenciaAtaque()
}

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ataqueAleatorioOponente () {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponOponente.length -1)

    ataqueOponente.push(ataquesMokeponOponente[ataqueAleatorio].nombre)

    ataquesMokeponOponente.splice(ataqueAleatorio, 1)
    // The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

    // console.log("ataqueOponente " + ataqueOponente)
    // console.log("ataquesMokeponOponente " + ataquesMokeponOponente)

    iniciarPelea()
}

function iniciarPelea() {
    // Sola/ hasta q haya escogido 5 ataques, inicia pelea
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosJugadores(jugador, oponente) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueOponente = ataqueOponente[oponente]
}

// Fxn de Combate
function combate() {
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueOponente[i]) {
            indexAmbosJugadores(i, i)
            crearMensaje("Empataste")
        } else if ((ataqueJugador[i]=="Fuego" && ataqueOponente[i]=="Tierra") || (ataqueJugador[i]=="Agua" && ataqueOponente[i]=="Fuego") ||
        (ataqueJugador[i]=="Tierra" && ataqueOponente[i]=="Agua")) {
            indexAmbosJugadores(i, i)
            crearMensaje("Ganaste")
            // Como gané, disminuyo vidas de enemigo
            victoriasJugador++
            // Informe a usuario como se actualiza la cuenta
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosJugadores(i, i)
            crearMensaje("Perdiste...")
            // Como perdí, disminuyo vidas mías
            victoriasOponente++
            spanVidasOponente.innerHTML = victoriasOponente
        }
    }
    
    revisarVictorias()
}

// Creo fxn para insertar mensaje en HTML informando con qué atacó cada jugador y cuál fue el resultado
function crearMensaje () {
    // Cree un párrafo en el HTML a partir de JS
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelOponente = document.createElement("p")
    
    seccionMensajes.innerHTML = resultadoCombate
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelOponente.innerHTML = indexAtaqueOponente
   
    // En cada nuevo combate, añada un nuevo párrafo contando qué pasó
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelOponente.appendChild(nuevoAtaqueDelOponente)
}

function revisarVictorias(){
    if (victoriasJugador === victoriasOponente) {
        crearMensajeFinal("Has terminado en un empate")
    } else if (victoriasJugador > victoriasOponente) {
        crearMensajeFinal("Felicitaciones! Ganaste")
    } else {
        crearMensajeFinal("Lo siento... perdiste. Sigue intentando.")
    }
}

function crearMensajeFinal(resultadoFinal) {
    // Mostrar en HTML el argumento de esta fxn, es decir lo q definí en fxn previa
    seccionMensajes.innerHTML = resultadoFinal    

    // Volver a mostrar botón de reiniciar q había ocultado al inicio
    seccionReiniciar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}



// Aquí creo fxnes asociadas al mapa sobre el q van a jugar mascotas y manera de moverse de las mascotas dentro del mismo

function iniciarMapa() {
    // Creo objeto q tenga todos los atributos de cada mascota, con el fin de poder acceder a los mismos posteriormente
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    // dibuje la mascota en el canvas y muévala cada X milisegundos. "setInterval" permite llamar una fxn cada determinado tiempo
    intervalo = setInterval(pintarCanvas, 50)
    
    // Inerprete lo q hago con el teclado:
    window.addEventListener("keydown", teclaPresionada)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function pintarCanvas() {
    // Si quisiera dibujar un rectángulo dentro del canvas. En este caso ubicado en 5 de X, 15 de Y, ancho de 20 y largo de 40:
    // lienzo.fillRect(5,65,20,40)
    

    // Para q mascota se mueva
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX

    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    // Que mascota se mueva sin salirse del lienzo
    if (mascotaJugadorObjeto.x < 0){
        mascotaJugadorObjeto.x = 0
    } else if (mascotaJugadorObjeto.x > mapa.width -30) {
        mascotaJugadorObjeto.x = mapa.width - 30 
    } else if (mascotaJugadorObjeto.y < 0) {
        mascotaJugadorObjeto.y = 0
    } else if (mascotaJugadorObjeto.y > mapa.height -30){
        mascotaJugadorObjeto.y = mapa.height - 30
    }

    // Limpio todo el lienzo antes de volver dibujar (me permite dar ilusión de movimiento)
    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    // Dibujar fondo canvas con imagen existente
    // lienzo.drawImage(
    //     mapaBackground,
    //     0,
    //     0,
    //     mapa.width,
    //     mapa.height
    // )

    // Dibujando fondo canvas con líneas desde JS:
    // Cuadrícula pequeña
    for (let i = 12; i < mapa.width; i=i+12) {
        // Líneas verticales
        lienzo.moveTo(i, 0)
        lienzo.lineTo(i, mapa.height)

        // Líneas horizontales
        lienzo.moveTo(0, i)
        lienzo.lineTo(mapa.width, i)

        lienzo.strokeStyle="#403d3905"
        lienzo.lineWidth="1"
        lienzo.stroke()        
    }
    // Cuadrícula grande
    lienzo.beginPath()
    for (let g = 48; g < mapa.width; g=g+48) {
        // Líneas verticales
        lienzo.moveTo(g, 0)
        lienzo.lineTo(g, mapa.height)

        // Líneas horizontales
        lienzo.moveTo(0, g)
        lienzo.lineTo(mapa.width, g)

        lienzo.strokeStyle="#403d3960"
        lienzo.lineWidth="2"
        lienzo.stroke()
    }

    // Dibujar mascota llamando la fxn q hay dentro del objeto creado
    mascotaJugadorObjeto.pintarMokepon()

    // fxn de BACKEND para enviar posición de mokepon
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    // Aquí hay conexiones con BACKEND
    mokeponesOponentes.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

// Defino fxn de BACKEND
function enviarPosicion(x, y) {
    // Genero petición para enviar posición 
    fetch(`http://192.168.1.62:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // "x: x"... cuando "clave: valor" son lo mismo, se puede abreviar poniéndolo solo una sola vez (como aparece abajo)
            x,
            y
        })
    })  
    // Aquí configuro la respuesta que voy a recibir
    .then(function (res) {
       if (res.ok) {
           res.json()
               .then(function ({ oponentes }) {
                    console.log(oponentes)
                    // Dependiendo del nombre del oponente q aparezca en la lista de "oponentes" voy a crear ese mokepon
                    // "forEach": Por cada elemento ejecute un fxn
                    // oponentes.forEach(function (oponente) {

                    // En lugar de "forEach" usaré "map" para q retorne valor y genere una nueva lista con el mismo número de elementos q la lista original
                    mokeponesOponentes = oponentes.map(function (oponente) {
                        let mokeponOponente = null

                        // esto es lo q viene del servidor
                        const mokeponNombre = oponente.mokepon.nombre || ""

                        // ya sabiendo el nombre, determino qué mokepon se va a crear
                        if (mokeponNombre === "Hipodoge") {
                            mokeponOponente = new Mokepon("Hipodoge", "assets/png/hipodoge.png", 5, oponente.id)
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponOponente = new Mokepon("Capipepo", "assets/png/capipepo2.png", 5, oponente.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponOponente = new Mokepon("Ratigueya", "assets/png/ratigueya.png", 5, oponente.id)
                        } else if (mokeponNombre === "Langostelvis") {
                            mokeponOponente = new Mokepon("Langostelvis", "assets/png/langostelvis.png", 5, oponente.id)
                        } else if (mokeponNombre === "Tucapalma") {
                            mokeponOponente = new Mokepon("Tucapalma", "assets/png/tucapalma.png", 5, oponente.id)
                        } else if (mokeponNombre === "Pydos") {
                            mokeponOponente = new Mokepon("Pydos", "assets/png/pydos.png", 5, oponente.id)
                        }
                        
                        mokeponOponente.x = oponente.x
                        mokeponOponente.y = oponente.y

                        return mokeponOponente
                   })        
               })
       }
    })
}

function moverDerecha() {
    // Mascota se moverá 5px en X hacia la derecha
    // Mascota.x = capipepo.x + 5
    mascotaJugadorObjeto.velocidadX = 5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event) {
    // Para saber el tipo de tecla q se presiona
    // console.log(event.key)
    
    // con "switch" puedo crear varios condicionales juntos (es como un sanduche de "if´s"). Aquí voy a decirle qué hace cada tecla q se presione
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}

function revisarColision(oponente) {
    // console.log(oponente)
    const arribaOponente = oponente.y
    const abajoOponente = oponente.y + oponente.alto/2
    const derechaOponente = oponente.x + oponente.ancho/2
    const izquierdaOponente = oponente.x

    const arribaJugador =
        mascotaJugadorObjeto.y
    const abajoJugador = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto/2
    const derechaJugador = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho/2
    const izquierdaJugador = 
        mascotaJugadorObjeto.x

    if (abajoJugador < arribaOponente ||
        arribaJugador > abajoOponente ||
        derechaJugador  < izquierdaOponente ||
        izquierdaJugador > derechaOponente) {
            return;
            // Quiere decir q no voy a hacer nada pq no hay colisión
    } else {
        detenerMovimiento()
        clearInterval(intervalo)
        oponenteId = oponente.id

        seccionSeleccionarAtaque.style.display = "flex"
        seccionVerMapa.style.display = "none"
        
        seleccionaMascotaOponente(oponente)
    }
}

// Código de JS solo se ejecutará una vez el HTML haya cargado
window.addEventListener ("load", iniciarJuego)