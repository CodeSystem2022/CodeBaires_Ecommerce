const contenedorProductos = document.querySelector("contenedor-productos");

function cargarProductos(){

    cargarProductos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
           <img class="producto-imagen" src="img/productos/notebooks/note_01.png" alt="note_01">
           <div class="producto-detalles">
               <h3 class="producto-titulo">Notebook Gamer Asus TUF FA506 FHD 15.6"<br>Ryzen 5 4600Hz</h3>
               <p class="producto-precio">$ 805.999</p>
               <button class="producto-agregar">Agregar</button>
           </div>
        `;

        contenedorProductos.append(div);

    })
}

cargarProductos();



                   
               