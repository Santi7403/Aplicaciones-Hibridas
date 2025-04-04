const fs = require("fs");  // Importa el módulo 'fs' de Node.js para trabajar con archivos (File System).
//Import es la forma mas actual, requiere es la antigua.
class ProductManager {
    constructor(filePath = "productos.json") {
        this.filePath = filePath;  // Establece la ruta del archivo JSON donde se guardarán los productos.
        this.products = this.loadProducts();  // Carga los productos desde el archivo JSON al iniciar.
        this.id = this.products.length ? this.products[this.products.length - 1].id + 1 : 0;  // Establece un ID para los productos. Si ya hay productos, incrementa el ID desde el último producto.
    }

    // Método para cargar los productos desde un archivo JSON.
    loadProducts() {
        try {
            if (fs.existsSync(this.filePath)) {  // Verifica si el archivo JSON existe.
                const data = fs.readFileSync(this.filePath, "utf-8");  // Lee el contenido del archivo JSON.
                return JSON.parse(data);  // Convierte el contenido del archivo (string) a un objeto JavaScript.
            }
            return [];  // Si el archivo no existe, devuelve un array vacío.
        } catch (error) {
            console.error("Error al leer el archivo:", error);  // Si ocurre un error, lo muestra en consola.
            return [];  // Si hay un error, devuelve un array vacío.
        }
    }

    // Método para guardar los productos en un archivo JSON.
    saveProducts() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));  // Convierte el array de productos a formato JSON y lo guarda en el archivo.
        } catch (error) {
            console.error("Error al guardar el archivo:", error);  // Si ocurre un error al guardar, lo muestra en consola.
        }
    }

    // Método para agregar un producto al array.
    addProduct(product) {
        if (!product.titulo || !product.descipcion || !product.precio || !product.stock) {  // Verifica que todos los campos del producto estén presentes.
            console.log("Todos los campos son obligatorios.");  // Muestra un mensaje si falta algún campo.
            return;  // Detiene la ejecución si faltan campos.
        }

        product.id = this.id++;  // Asigna un ID único al producto.
        this.products.push(product);  // Agrega el producto al array de productos.
        this.saveProducts();  // Guarda el array de productos actualizado en el archivo JSON.
        console.log(`Producto "${product.titulo}" agregado.`);  // Muestra un mensaje indicando que el producto fue agregado.
    }

    // Método para buscar un producto por ID.
    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);  // Busca un producto en el array usando el ID.
        if (!product) {  // Si no se encuentra el producto...
            console.log("No lo encontré :(");  // Muestra un mensaje indicando que no se encontró el producto.
            return null;  // Devuelve null si no se encuentra el producto.
        }
        return product;  // Devuelve el producto encontrado.
    }

    // Método para obtener todos los productos.
    getProducts() {
        return this.products;  // Devuelve todos los productos almacenados en el array 'this.products'.
    }
}

// Exporta la clase ProductManager para que pueda ser utilizada en otros archivos.
module.exports = ProductManager;
//Si exporto varias clases debo usar module.exports = { ProductManager };