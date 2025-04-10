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
    async updateProductById(id, updatedData) {
        const products = await this.getProducts();
        const parsedId = isNaN(id) ? id : Number(id);
        const index = products.findIndex(p => p.id === parsedId);

        if (index === -1) return null;

        products[index] = { ...products[index], ...updatedData, id: products[index].id };
        await fs.writeFile(path, JSON.stringify(products, null, 2));
        return products[index];
    }
    async deleteProductById(id) {
        const products = await this.getProducts();
        const parsedId = isNaN(id) ? id : Number(id);
        const index = products.findIndex(p => p.id === parsedId);

        if (index === -1) return false;

        products.splice(index, 1);
        await fs.writeFile(path, JSON.stringify(products, null, 2));
        return true;
    }


}

export { ProductManager };
