document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:8080/api/productos';

    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    const modalTitle = document.getElementById('productModalLabel');
    const productForm = document.getElementById('productForm');
    const saveProductButton = document.getElementById('saveProductButton');
    
    // Variable para almacenar el ID del producto actual en edición
    let currentProductId = null;

    // Función para cargar productos en la tabla
    const loadProducts = async () => {
        try {
            const response = await fetch(`${apiUrl}/all`);
            if (!response.ok) {
                throw new Error('Error al cargar productos: ' + response.statusText);
            }
            const productos = await response.json();
            
            // Ordenar productos por ID de menor a mayor
            productos.sort((a, b) => a.productoId - b.productoId);
            
            const tbody = document.querySelector("#tablaProductos tbody");
            tbody.innerHTML = '';
            productos.forEach(producto => {
                const row = document.createElement('tr');
                row.dataset.id = producto.productoId; // Guardar el ID en el dataset
                row.innerHTML = `
                    <th scope="row">${producto.productoId}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-edit">Editar</button>
                        <button class="btn btn-danger btn-sm btn-delete" data-id="${producto.productoId}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Cargar productos al iniciar
    loadProducts();

    // Función para validar los datos del formulario
    const validateForm = () => {
        const name = document.getElementById('productName').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value, 10);

        // Validar que los campos no estén vacíos
        if (!name || !description || isNaN(price) || isNaN(stock)) {
            alert('Por favor, complete todos los campos.');
            return false;
        }

        // Validar que el precio y el stock no sean negativos
        if (price <= 0) {
            alert('El precio no puede ser negativo ni cero.');
            return false;
        }

        if (stock < 0) {
            alert('El stock no puede ser negativo.');
            return false;
        }

        return true;
    };

    // Agregar evento al botón de agregar
    document.querySelector('#btnAgregar').addEventListener('click', () => {
        modalTitle.textContent = 'Agregar Producto';
        productForm.reset();
        saveProductButton.onclick = async () => {
            if (validateForm()) {
                const producto = {
                    nombre: document.getElementById('productName').value,
                    descripcion: document.getElementById('productDescription').value,
                    precio: parseFloat(document.getElementById('productPrice').value),
                    stock: parseInt(document.getElementById('productStock').value, 10)
                };
                try {
                    const response = await fetch(`${apiUrl}/save`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(producto)
                    });
                    if (!response.ok) {
                        throw new Error('Error al agregar producto: ' + response.statusText);
                    }
                    productModal.hide();
                    loadProducts();
                } catch (error) {
                    console.error(error);
                }
            }
        };
        productModal.show();
    });

    // Evento para editar un producto
    document.querySelector("#tablaProductos").addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-edit')) {
            const row = event.target.closest('tr'); // Obtener la fila más cercana
            const id = row.dataset.id; // Obtener el ID del dataset
            currentProductId = id; // Guardar el ID del producto actual

            modalTitle.textContent = 'Editar Producto';
            document.getElementById('productId').value = id;
            document.getElementById('productName').value = row.children[1].textContent;
            document.getElementById('productDescription').value = row.children[2].textContent;
            document.getElementById('productPrice').value = row.children[3].textContent;
            document.getElementById('productStock').value = row.children[4].textContent;

            saveProductButton.onclick = async () => {
                if (validateForm()) {
                    const producto = {
                        productoId: currentProductId,
                        nombre: document.getElementById('productName').value,
                        descripcion: document.getElementById('productDescription').value,
                        precio: parseFloat(document.getElementById('productPrice').value),
                        stock: parseInt(document.getElementById('productStock').value, 10)
                    };
                    try {
                        const response = await fetch(`${apiUrl}/save`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(producto)
                        });
                        if (!response.ok) {
                            throw new Error('Error al actualizar producto: ' + response.statusText);
                        }
                        productModal.hide();
                        loadProducts();
                    } catch (error) {
                        console.error(error);
                    }
                }
            };
            productModal.show();
        }
    });

    // Evento para eliminar un producto
    document.querySelector("#tablaProductos").addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-delete')) {
            const id = event.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                try {
                    const response = await fetch(`${apiUrl}/delete/${id}`, {
                        method: 'GET'
                    });
                    if (!response.ok) {
                        throw new Error('Error al eliminar producto: ' + response.statusText);
                    }
                    loadProducts();
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });
});
