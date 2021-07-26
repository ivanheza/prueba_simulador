// Simulador con el objetivo de Agregar un dato de cliente, tipo de evento, cantidad de personas , tipo de servicio, y precio del evento.


/////SE CREA LA ENTIDAD CLIENTE

class Cliente {
    constructor (nombre, evento, tipo, personas,precio){
        this.nombre = nombre;
        this.evento = evento;
        this.tipo = tipo;
        this.personas = personas 
        this.precio = precio
    } 
    
    
} 


//Evento para el Dark Mode
let darkMode = document.querySelector("#darkMode");
darkMode.addEventListener("click",modoDark)
//Funcion para Dark Mode
function modoDark() {
    //let dark = document.querySelector("#box1");
   

    let dark = document.querySelector("#box1");
    dark.classList.toggle("bg-dark")
    dark.classList.toggle("blanco")

    let dark2 = document.querySelector("#box2");
    dark2.classList.toggle("bg-dark")
    dark2.classList.toggle("blanco")

    console.log("Boton DarkMode");
}

// Se declara array con los paquetes y precios
const tiposDeServicio = [
    {paquete: "Play Basic", precio: 400},
    {paquete: "Play Gold", precio: 600},
    {paquete: "Play Black", precio: 800}
    ]; //ARRAY TIPOS

let preciosPaq = tiposDeServicio.map((paquete,index,Array) => {
        return paquete.precio
    }) 
let paquete = tiposDeServicio.map((paquete,index,Array) => {
        return paquete.paquete
    }) 

/////---- Evento para generar los option en el html desde el DOM

function GenerarOpcion() {
    const tipo = document.querySelector("#tipoServicio")

    paquete.forEach(element => {
        let opciones = document.createElement("option");
        opciones.setAttribute("value",element);
        opciones.append(element);
        tipo.append(opciones);
    });  
}


function cargarListaClientes() {
    //Propiedades
    let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    if (listaClientes == null) {
        return [];
    }
    return listaClientes; 
}
//Funcion para cargar el Array CLIENTES

function guardarListaClientes(listaClientes) {
    //Propiedades
    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
    mostrarLista(listaClientes);
}

//Evento para borrar ITEM
let borrarCliente = document.querySelector("#btn-borrar")
borrarCliente.addEventListener("click", borrarItem)

function borrarItem() {
    
    localStorage.removeItem("listaClientes");    
    console.log("PruebaBoton");
    location.reload();

}



//Funcion para guardar clientes
function guardarCliente(e) {
    e.preventDefault();

    let nombre = document.querySelector("#nombre").value;
    let evento = document.querySelector("#tipoEvento").value;
    let tipo = document.querySelector("#tipoServicio").value;
    let personas = parseInt (document.querySelector("#personas").value);
    
    let precios ;

    //Bucle Para Precios
    for (const value of preciosPaq) {
        if (tipo == "Play Basic") {
            precios = personas * 400
        }else if (tipo == "Play Gold") {
            precios = personas * 600
        }else if (tipo == "Play Black") {
            precios = personas * 800
        }
    }
   ////---- VALIDACIONES
    if (nombre.trim() == null || nombre.trim().length == 0 ) {
        const alerta = document.querySelector("#validacion")
        alerta.classList.add("alert", "alert-danger");
        alerta.textContent = "El nombre no es valido"
        return false;
    }else{
        document.querySelector("#validacion").style.display = "none"
    }
if (evento.trim() == null || evento.trim().length == 0 ) {
        const alerta = document.querySelector("#validacionE")
        alerta.classList.add("alert", "alert-danger");
        alerta.textContent = "El evento no es valido"
        return false;
    }else{
        document.querySelector("#validacionE").style.display = "none"
    }
if (tipo.trim() == "Tipo de Servicio") {
        const alerta = document.querySelector("#validacion3")
        alerta.classList.add("alert", "alert-danger");
        alerta.textContent = "Tipo de servicio no valido"
        
        return false;
    }else{
        document.querySelector("#validacion3").style.display = "none"
    }
if (personas == null || personas <=0 || isNaN(personas) ) {
        const alerta = document.querySelector("#validacion4")
        alerta.classList.add("alert", "alert-danger");
        alerta.textContent = "ingresa cantidad de personas"
        console.log("TIPO VALIDO");
        return false;
    }else{
        document.querySelector("#validacion4").style.display = "none"
    }
   
    let listaClientes = cargarListaClientes();
    
    //Nuevo Cliente

    listaClientes.push(new Cliente(nombre,evento,tipo,personas,precios));

    //Se usa la funcion guardar
    guardarListaClientes(listaClientes);
    
    document.getElementById("formClientes").reset();
    location.reload();
    
}

        

             
        //FUNCIONES PARA MOSTRAR EN HTML
  function  armarLista(elemento){
    const card = document.createElement("div");
    card.classList.add("bg-secondary", "mb-3");
   
    //Nombre
    const nombre = document.createElement("h5");
    
    nombre.textContent = `${elemento.nombre}`;
    card.appendChild(nombre);

    //Tipo Evento
    const tipo = document.createElement("div");
   
    tipo.textContent = `${elemento.evento}`;
    card.appendChild(tipo);
    
    //Paquete
    const servicio = document.createElement("div");
    servicio.textContent = `Paquete: ${elemento.tipo}`;
    card.appendChild(servicio);

    //Invitados
    const personas = document.createElement("div");
    
    personas.textContent = `Invitados: ${elemento.personas}`;
    card.appendChild(personas);

    //Precio Final por persona
    const precio = document.createElement("div");
    precio.textContent = `Precio Paquete: $${elemento.precio}`;
    card.appendChild(precio);

    for (const value of paquete) {
        if (elemento.tipo  == "Play Basic") {
            precio.classList.add("bg-primary", "bg-gradient")
            servicio.classList.add("bg-primary", "bg-gradient")
        }else if (elemento.tipo  == "Play Gold") {
            precio.classList.add("bg-warning", "bg-gradient")
            servicio.classList.add("bg-warning", "bg-gradient")
        }else if (elemento.tipo == "Play Black") {
            precio.classList.add("bg-dark", "bg-gradient", "blanco")
            servicio.classList.add("bg-dark", "bg-gradient", "blanco")
        }
    }
    return card;

    
}
        //FUNCIONES PARA MOSTRAR EN HTML 
function mostrarLista(listaClientes) {
    let lista = document.getElementById("listaDatos");
    lista.textContent = "";
    listaClientes.map( elemento => {
        lista.appendChild(armarLista(elemento));
    });
}

mostrarLista(cargarListaClientes());  





//Evento para mostrar la seccion de paquetes 
let check = document.querySelector("#check1")

function ocultarPaq(e) {
    e.preventDefault();
    
    if (document.querySelector("#check1").checked == false ) {
        let paquetes = document.querySelector("#paquetes");
        paquetes.style.display = "none";
    }else if (document.querySelector("#check1").checked == true ) {
        let paquetes = document.querySelector("#paquetes");
        paquetes.style.display = "block";
    }  
}

check.addEventListener("change",ocultarPaq)

//Evento para guardar formulario
document.querySelector("#btn-guardar").onclick = guardarCliente;


///INICIALIZAR


window.onload = () => {

    
    // Se oculta la seccion de paquetes en el html al cargar la pag
    let paquetes = document.querySelector("#paquetes");
        paquetes.style.display = "none";


    // Mensaje de bienvenida

//Dara uno de los 3 mensajes aleatoriamente
    let welcome = `Bienvenido`
    let mensajes = ["Estas es en el Simulador", " Ingresa los datos para tu evento", "Este es el simulador de play"]
    let mensaje1 = document.querySelector("#msg");
    for (let i = 0; i < mensajes.length; i++) {
        
        mensaje1.textContent = `${welcome}: ${mensajes[Math.floor(Math.random() * mensajes.length)]}`;
    
    
    //Se utiliza DOM para agregar las instrucciones al cargar la pag.

    let instrucciones = document.querySelector("#instrucciones");
    instrucciones.textContent = "Ingresa tus datos para iniciar con el simulador y calcular el costo de tu Evento"}

    GenerarOpcion();

}






