const { ProductManager } = require('./ProductManager.js'); 
const http = require('http');
const url = require('url');

const port = 3000; 
let clientes = 0; 

const admin = new ProductManager(); 

const server = http.createServer(async (request, response) => {
    const parsedUrl = url.parse(request.url, true); 
    const path = parsedUrl.pathname; 
    const method = request.method; 
    
    let body = ''; 
    let status = 200; 
    let content = 'text/html'; 

    console.log(`Solicitud recibida: ${path} - Método: ${method}`);

    // Ruta principal 
    if (path === '/') {
        body = '<h1>Hola desde NodeJS - Servidor</h1>';
    } 
    
    // Ruta para productos 
    else if (path === '/products') {
        content = 'application/json'; 
        try {
            // Obtengo la lista de productos del método getProducts en Productmanager
            const products = await admin.getProducts();
            body = JSON.stringify(products); 
        } catch (error) {
            status = 500; 
            body = JSON.stringify({ error: "Error al obtener productos" }); 
        }
    } 
    
    // Ruta para un producto por ID 
    else if (path.startsWith('/products/')) {
        const id = path.split('/')[2]; 
        content = 'application/json'; //Aca lo muestro como JSson
        
        try {
            // Busca el producto por ID utilizando el método getProductById de ProductManager
            const product = await admin.getProductById(id);
            if (product) {
                body = JSON.stringify(product); 
            } else {
                status = 404; // Error del usuario si no encuentra el producto
                body = JSON.stringify({ error: "Producto no encontrado" }); 
            }
        } catch (error) {
            status = 500; 
            body = JSON.stringify({ error: "Error al buscar el producto" }); 
        }
    } 
    
    // Ruta para contacto 
    else if (path === '/contact') {
        body = '<h1>Formulario de Contacto</h1>';
    } 
    
    // Ruta para páginas no encontradas
    else {
        status = 404; 
        body = '<h1>Error 404 | Página web No encontrada</h1>';
    }

    response.writeHead(status, { 'Content-Type': content });
    response.end(body);

    console.log(`Clientes conectados: ${++clientes}`); 
});

server.listen(port, () => console.log(`Servidor Web en el puerto ${port}`));

console.log('Fin del Script'); 
