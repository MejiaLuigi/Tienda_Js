// Variables globales
let nombre = document.querySelector("#nombre-pro");
let presentacion = document.querySelector("#presentacion-pro");
let precio = document.querySelector("#precio-pro");
let imagen = document.querySelector("#imagen-pro");
let btnGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table tbody");
let btnActualizar = document.querySelector(".btn-actualizar");
let buscarInput = document.querySelector(".buscar-input");
let btnBuscar = document.querySelector(".btn-buscar");
let productosKey = "productos";
let productoSeleccionadoIndex = null;

// Función para inicializar la aplicación
document.addEventListener("DOMContentLoaded", function () {
    mostrarDatos();
    btnGuardar.addEventListener("click", guardarProducto);
    btnActualizar.addEventListener("click", actualizarProducto);
    btnBuscar.addEventListener("click", buscarProducto);
});

// Función para obtener los datos del formulario
function obtenerDatos() {
    if (
        nombre.value.trim() === "" ||
        presentacion.value.trim() === "" ||
        precio.value.trim() === "" ||
        imagen.value.trim() === ""
    ) {
        alert("Debes completar todos los campos.");
        return null;
    }

    return {
        nombre: nombre.value,
        presentacion: presentacion.value,
        precio: precio.value,
        imagen: imagen.value,
    };
}

// Función para guardar un producto
function guardarProducto() {
    const datos = obtenerDatos();
    if (!datos) return;

    let productos = obtenerProductosGuardados();
    productos.push(datos);
    guardarProductos(productos);

    limpiarCampos();
    mostrarDatos();
    alert("Producto guardado con éxito.");
}
// Función para guardar los productos en el Local Storage
function guardarProductos(productos) {
    localStorage.setItem(productosKey, JSON.stringify(productos));
}

// Función para obtener los productos guardados en el Local Storage
function obtenerProductosGuardados() {
    let productosGuardados = JSON.parse(localStorage.getItem(productosKey)) || [];
    return productosGuardados;
}


// Función para mostrar los productos en la tabla

function mostrarDatos() {
    limpiarTabla();
    let productos = obtenerProductosGuardados();

    productos.forEach((producto, i) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.presentacion}</td>
            <td>${"$" + producto.precio}</td>
            <td><img src="${producto.imagen}" width="20%"></td>
            <td>
                <button class="btn btn-warning" onclick="editarProducto(${i})">Editar</button>
                <button class="btn btn-danger" onclick="eliminarProducto(${i})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}
function limpiarTabla() {
    tabla.innerHTML = "";
}
function limpiarCampos() {
    nombre.value = "";
    presentacion.value = "";
    precio.value = "";
    imagen.value = "";
}

// Función para editar un producto
function editarProducto(index) {
    let productos = obtenerProductosGuardados();
    let producto = productos[index];

    nombre.value = producto.nombre;
    presentacion.value = producto.presentacion;
    precio.value = producto.precio;
    imagen.value = producto.imagen;

    btnGuardar.classList.add("d-none");
    btnActualizar.classList.remove("d-none");
    productoSeleccionadoIndex = index;

    alert("Puedes editar el producto ahora.");
}

// Función para actualizar un producto
function actualizarProducto() {
    let productos = obtenerProductosGuardados();

    if (productoSeleccionadoIndex !== null) {
        productos[productoSeleccionadoIndex] = {
            nombre: nombre.value,
            presentacion: presentacion.value,
            precio: precio.value,
            imagen: imagen.value,
        };

        guardarProductos(productos);
        limpiarCampos();
        mostrarDatos();

        btnGuardar.classList.remove("d-none");
        btnActualizar.classList.add("d-none");
        productoSeleccionadoIndex = null;

        alert("Producto actualizado con éxito.");
    }
}

// Función para eliminar un producto
function eliminarProducto(index) {
    let productos = obtenerProductosGuardados();
    let confirmar = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmar) {
        productos.splice(index, 1);
        guardarProductos(productos);
        mostrarDatos();
        alert("Producto eliminado con éxito.");
    }
}

// Función para buscar un producto

btnBuscar.addEventListener("keyup", function(e){
    console.log(e.key)
    if(e.key == "Enter"){
        buscarProducto();
    }
})

function buscarProducto() {
    let textoBuscado = buscarInput.value.toLowerCase().trim();
    let productos = obtenerProductosGuardados();

    limpiarTabla();

    productos.forEach((producto, i) => {
        if (producto.nombre.toLowerCase().includes(textoBuscado)) {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${i + 1}</td>
                <td>${producto.nombre}</td>
                <td>${producto.presentacion}</td>
                <td>${"$" +producto.precio}</td>
                <td><img src="${producto.imagen}" width="20%"></td>
                <td>
                    <button class="btn btn-warning" onclick="editarProducto(${i})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarProducto(${i})">Eliminar</button>
                </td>
            `;
            tabla.appendChild(fila);
        }
    })
}

function generarPDF(event){
    event.preventDefault()

    const tBody=document.querySelector("tbody")
    if (tBody.childElementCount === 0){
        alert("No se puede generar sin datos")
        return
    }

    const str = recorrerTabla()

    const doc = new jsPDF()
    doc.text(10,10,str)
    doc.save('lista-producto-pdf')
}

  function recorrerTabla(){
    let str = ''

    const table = document.querySelector(".table")

    for(let i = 0; i <= table.rows.length -1; i++){
        str += '\n'

        for (let j = 0; j <= table.rows[i].cells.length-1; j++){
            if (j == 0){
                str += '*'
            }else {
                let col = table.rows[i].cells[j].innerText
                str += `-> ${col}`  
            }
        }
    } return str
  }


















//ejecutar funcion
//mostrarDatos();

///////////////////////////////////////////////////////////////////////////////////////////////


/*let usuarios = [{
    nombre : "Juan",
    cargo : "Frontend",
    salario : "14000"
},
{    nombre : "claudia",
    cargo : "Dev",
    salario : "12000"
},
{   nombre : "Pedro",
    cargo : "DataBase",
    salario : "13000"
}
];
localStorage.setItem("Datos", JSON.stringify(usuarios));
alert("datos guardados con exito");*/
/*
//JSON.parse()lo que esta guardado lo pasa a estado natural  //JSON.stringify-lo convierte a texto

//guardar datos en el navegador 
localStorage.setItem("Datos", JSON.stringify(usuario));
alert("datos guardados con exito");

//recuperar datos del navegador*/
///obtener datos en el navegador

/*let datos = JSON.parse(localStorage.getItem("Datos"));
datos.forEach((d,i) => {
    document.write(i+"<br>");
    document.write("nombre:" + d.nombre+"<br>");
    document.write("cargo:" + d.cargo+"<br>");
    document.write("salario:" + d.salario+"<br>");
    document.write("<br>");
});*/


/*localStorage.removeItem("Datos");
alert("datos guardados con exito");*/

