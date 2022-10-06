const year = document.querySelector('#current-year')

let productos = [];
let user;

let formId;
let conteinerId;
let conteinerUser;
let texUser;
let clearStorage;

// Variables para formulario de productos
let form;
let inputNombre;
let inputPrecio;
let inputCantidad;
let conteinerProduct;
let inputUsuario;
let btnGoOn;

class Producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}
// añadiendo sweetAlerts
const showAlert = document.getElementById("btnGoOn");

showAlert.onclick = allert;

function allert() {
  Swal.fire({
    icon: 'success',
    title: 'Item added successfully',
    text: 'Added item shopping cart',
    toast: 'true',
    position: 'center',
    timer: 4000
  })
}


function startElements() {
  formId = document.getElementById("formId");
  inputUsuario = document.getElementById("inputUsuario");
  conteinerId = document.getElementById("conteinerId");
  conteinerUser = document.getElementById("conteinerUser");
  texUser = document.getElementById("texUser");

  clearStorage = document.getElementById("clearStorage");

  form = document.getElementById("form");
  conteinerProduct = document.getElementById("conteinerProduct");

  inputNombre = document.getElementById("inputNombre");
  inputPrecio = document.getElementById("inputPrecio");
  inputCantidad = document.getElementById("inputCantidad");

}

function startEvents() {
  form.onsubmit = (event) => okForm(event);
  formId.onsubmit = (event) => idUser(event);
  clearStorage.onclick = deleteStorage;
}

function deleteStorage() {
  localStorage.clear();
  user = "";
  productos = [];
  showId();
  paint();
}

function idUser(event) {
  event.preventDefault();
  user = inputUsuario.value;
  formId.reset();
  userStorage();
  showText();
}

function showText() {
  conteinerId.hidden = true;
  conteinerUser.hidden = false;
  texUser.innerHTML += ` ${user}`;
}

function showId() {
  conteinerId.hidden = false;
  conteinerUser.hidden = true;
  texUser.innerHTML = ``;
}

function okForm(event) {
  event.preventDefault();
  if (user) {
    let nombre = inputNombre.value;
    let precio = parseFloat(inputPrecio.value);
    let cantidad = parseInt(inputCantidad.value);

    const nameExist = productos.some((producto) => producto.nombre === nombre);
    if (!nameExist) {
      let producto = new Producto(
        nombre,
        precio,
        cantidad
      );

      productos.push(producto);
      form.reset();
      productStorage();
      paint();
    } else {
      alert("El producto ya existe");
    }
  } else {
    alert("Ingresar antes de comprar");
  }
}

function deleteProduct(nombreProducto) {
  let columnDelete = document.getElementById(`columna-${nombreProducto}`);
  let indexDelete = productos.findIndex(
    (producto) => Number(producto.nombre) === Number(nombreProducto)
  );

  productos.splice(indexDelete, 1);
  columnDelete.remove();
  productStorage();
}

function paint() {
  conteinerProduct.innerHTML = "";
  productos.forEach((producto) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3 mb-3";
    column.id = `columna-${producto.nombre}`;
    column.innerHTML = `
            <div class="card">
                <p class="card-text">Nombre:
                    <b>${producto.nombre}</b>
                </p>
                <p class="card-text">Precio:
                    <b>${producto.precio}</b>
                </p>
                
                <p class="card-text">Cantidad:
                    <b>${producto.cantidad}</b>
                </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger text-center" id="botonEliminar-${producto.nombre}" >Eliminar</button>
                </div>`;

               conteinerProduct.append(column);

               let botonEliminar = document.getElementById(`botonEliminar-${producto.nombre}`);

               botonEliminar.onclick = () => deleteProduct(producto.nombre);   
          
  });

}


function productStorage() {
  let productosJSON = JSON.stringify(productos);
  localStorage.setItem("productos", productosJSON);
}

function userStorage() {
  localStorage.setItem("user", user);
}

function actProductStorage() {
  let productosJSON = localStorage.getItem("productos");
  if (productosJSON) {
    productos = JSON.parse(productosJSON);
    paint();
  }
}

function actUserStorage() {
  let userlog = localStorage.getItem("user");
  if (userlog) {
    user = userlog;
    showText();
  }
}

year.innerHTML = new Date().getFullYear()

function main() {
  startElements();
  startEvents();
  actProductStorage();
  actUserStorage();
}

main();


