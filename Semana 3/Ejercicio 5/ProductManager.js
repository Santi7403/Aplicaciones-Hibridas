import fs from 'fs/promises';
import crypto from 'crypto';

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
            await fs.writeFile(path, JSON.stringify(products, null, 2));
            console.log('Producto Guardado');
            return product.id;
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return [];
        }
    }
//Aca al buscar productos por Id, puedo buscar por ID numerico como tengo los primeros o los nuevos generados.
    async getProductById(id) {
        const products = await this.getProducts();
    
        const parsedId = isNaN(id) ? id : Number(id);
    
        const product = products.find(item => item.id === parsedId);
    
        return product || null;
    }
    
    
}

export { ProductManager };
