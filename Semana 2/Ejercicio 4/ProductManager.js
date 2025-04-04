const fs = require('fs/promises');
const crypto = require('crypto'); 
const path = './products.json';

class ProductManager {
    constructor() {
        this.products = [];
    }

    randomID() {
        return crypto.randomUUID(); 
    }

    async setProduct(product) {
        try {
            const products = await this.getProducts(); 
            product.id = this.randomID();
            products.push(product);
            const data = JSON.stringify(products, null, 2);
            await fs.writeFile(path, data);
            return product.id;
        } catch (error) {
            console.error('No pudimos guardar el archivo', error);
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return JSON.parse(data); 
        } catch (error) {
            console.error('No pudimos leer el archivo');
            return []; 
        }
    }

    async getProductById(id) {
        const list = await this.getProducts(); 
        const product = list.find(item => item.id === id);
        return product || null; 
    }
}

// las lista es solo a modo ejemplo
const lista = [1,2,3];
module.exports =  { ProductManager, lista };
/* Versión larga
module.exports =  { 
    ProductManager: ProductManager, 
    lista: lista 
};
*/