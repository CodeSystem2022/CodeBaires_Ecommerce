let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="item-carrito carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="item-carrito carrito-producto-titulo">
                    <small>Producto</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="item-carrito-row">
                    <div class="item-carrito carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="item-carrito carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                    </div>
                    <div class="item-carrito carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="item-carrito carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
                </div>
            `;
    
            contenedorCarritoProductos.append(div);
        })

        actualizarBotonesEliminar();
        actualizarTotal();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #0a0131, #220c83)",
          borderRadius: "2rem",
          fontSize: "0.75rem",
        },
        offset: {
            x: "1.5rem",
            y: "1.5rem"
        },
        onClick: function(){}
    }).showToast();
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    //Usamos libreria SweetAlert2 la llamamos Swal
    Swal.fire({
        title: '¿Estás seguro?',
        width: 300,
        icon: 'question',
        html: `Se van a borrar <br> ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

//mp
const mercadopago = new MercadoPago ("TEST-568e2a49-e9fd-4243-901b-06f5f59f2f95", {
    locale: "es-AR", //Los mas comunes son: 'pt-BR','es-AR','en-US'
});

//botonComprar.addEventListener("click", comprarCarrito);

botonComprar.addEventListener("click",function () {
    const orderData = {
        quantity: 1,
        description: "Compra CodeBaires Techno Store",
        price: productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0),
    };

    fetch("http://localhost:8080/create_preference",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(orderData),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (preference) {
            createCheckoutButton(preference.id);
        })
        .catch(function() {
            alert("Unexpected error");
        });
    
    });

function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    const bricksBuilder = mercadopago.bricks();
      
    const renderComponent = async (bricksBuilder) => {
        await bricksBuilder.create(
            "wallet",
            "carrito-acciones-comprar", // class/id where the payment button will be displayed
            {
                initialization: {
                    preferenceId: preferenceId,
                },
                callbacks: {
                    onError: (error) => console.error(error),
                    onReady: () => {},
                },
            }
            );
    };
    window.botonComprar = renderComponent(bricksBuilder);
}