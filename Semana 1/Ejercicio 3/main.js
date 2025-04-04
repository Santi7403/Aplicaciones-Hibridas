const ProductManager = require("./index");

const manager = new ProductManager();

manager.addProduct({ titulo: "Teclado", descipcion: "Teclado Mecánico", precio: 25000, stock: 25 });
manager.addProduct({ titulo: "Mouse", descipcion: "Mouse inalámbrico", precio: 15000, stock: 30 });
manager.addProduct({ titulo: "Auriculares", descipcion: "Auriculares", precio: 700, stock: 6 });

// Obtengo todos los productos
console.log(manager.getProducts());

// Busco productos por ID
console.log(manager.getProductById(0)); //Aca pongo los ids bien asi funcionan.
console.log(manager.getProductById(1)); 
console.log(manager.getProductById(150)); //Aca pongo un id que no existe asi tira error.

