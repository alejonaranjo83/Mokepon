// console.log("Hello world")


// PASOS BÁSICOS PARA CONFIGURAR SERVIDOR

// 1. Creo una variable para invocar la librería "express"
const express = require("express")
// 1.2 Para resolver error de seguridad, importo librería "cors" que me ayudará con eso
const cors = require("cors")

// 2. Creo una aplicación q representará a mi servidor desde donde recibiré peticiones de clientes y enviaré respuestas
const app = express()


// Para q se pueda reproducir desde el celular. Debo llevar los archivos estaticos (html, css, js, imágenes) a una carpeta q creo, se llama "public" en este caso

// http://Alejandros-MacBook-Pro.local:8080
// Direccción IP mía: 192.168.1.62.

app.use(express.static('public'))

// 2.2 Continuando con lo del error de seguridad.
app.use(cors())
// Esto es para habilitar peticiones (tipo "post")... recibir datos de cliente
app.use(express.json())

// 3. Determino qué hará servidor. En este caso, q le envíe mensaje al cliente de saludo
// app.get("/", (req, res) => {
//     res.send("Hola! bienvenido al servidor")
// })

// 3. Para escuchar peticiones de clientes debo configurar el puerto por el q lo hará (8080 en este caso). Desde ahí creo una "arrow function"... () => {}
app.listen(8080, () => {
    console.log("Servidor funcionando")
})

// 4. Determino qué hará servidor. En este caso, q le envíe mensaje al cliente de saludo. La "/" representa el mismo sitio cuando uno se conecta, no hay URL adicional. "req" es la petición y "res" la respuesta al usuario.
// app.get("/", (req, res) => {
//     res.send("Hola! bienvenido al servidor")
// })


// EMPIEZO A CONECTARME CON LO Q ESTÁ EN EL FRONTEND

// Creo lista vacía a la q se irán agregando los jugadores q se unen
const jugadores = []

// Así configuro para q jugadores se unan al juego. Un "endpoint" es por donde me puedo conectar.
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    // con un "template string" ( ${...} ) puedo hacer q lo q se cree sea una cadena de texto, en este caso, una string a partir de un número aleatorio

    // Creo jugador usando la clase declarada para esto, el cual se identificará con su respectivo id
    const jugador = new Jugador(id)

    // agrego jugador creado a una lista de jugadores
    jugadores.push(jugador)

    // Para q no me salga error de seguridad, le digo al navegador q permita abrir todo (* representa q cualquier origen es válido). No es recomendable dejarlo así, pero es la opción más fácil
    // res.setHeader("Access-Control-Allow-Origin", "*")
    
    // Para hacer lo anterior de una mejor manera, ejecuto en la Terminal saliéndome del servidor: "npm install cors" y modifico cosas en los primeros pasos de arriba


    // Indico q la respuesta q se envíe sea el id del jugador
    res.send(id)
})

// Para recibir datos en JSON
app.post("/mokepon/:jugadorId", (req, res) => {
    // Defino variable a partir de solicitud realizada por el usuario. Extraigo lo q viene en la URL a partir del objeto "req"... hay varias opciones, en este caso pido los "params" q son los parámetros
    const jugadorId = req.params.jugadorId || ""
    // el || "" quiere decir: en caso de q eso no salga, mostrar cadena vacía
    const nombre = req.body.mokepon || ""
    // cree un Mokepon con ese nombre
    const mokepon = new Mokepon(nombre)
    
    // la fxn "findIndex" me permite buscar elementos dentro de una lista q cumplan con una determinada condición. Si existe, me devuelve su número de lista; sino me devuelve "-1"
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    // Si el jugador es un elemento válido de la lista (no es -1)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    // Para ver qué jugadores se han unido
    console.log(jugadores)
    // Ver ID de jugador
    console.log(jugadorId)
    res.end()
})

// Creo "endpoint"/servicio/petición para saber posición del mokepon en el mapa
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    // Modifico endpoint para q devuelva las coordenadas de todos los jugadores, menos del q acaba de realizar la solicitud (!==). La fxn (o método) "filter" me permite ejecutar filtros sobre una lista en JS. 
    const oponentes = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        oponentes
    })

    // res.end()
})

// Esto es para recibir la lista de ataques
app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    
    // la fxn "findIndex" me permite buscar elementos dentro de una lista q cumplan con una determinada condición. Si existe, me devuelve su número de lista; sino me devuelve "-1"
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    // Si el jugador es un elemento válido de la lista (no es -1)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end()
})

// Solicito datos del oponente
app.get ("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)

    res.send({
        ataques: jugador.ataques || []
    })
})


// Creo clase q representa cada jugador
class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}


