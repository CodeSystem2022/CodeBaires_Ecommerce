const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
           <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
           <div class="producto-detalles">
               <h3 class="producto-titulo">${producto.titulo}</h3>
               <p class="producto-precio">$${producto.precio}</p>
               <button class="producto-agregar" id="${producto.id}">Agregar</button>
           </div>
        `;

        contenedorProductos.append(div);

    })
}

cargarProductos(productos);

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
})



                   
               