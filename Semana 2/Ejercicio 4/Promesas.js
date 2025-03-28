const fs = require('fs/promises');
const path = './products.json';

class ProductManager {
    products = [];
    constructor( products=[]){
        this.products = products;
    }

    randomID(){
        return  crypto.randomUUID();
    }
    setProduct(product){
        this.getProducts().then( () => {
            product.id = this.randomID();

            this.products.push( product);
    
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFile(path, data).then( () => {
                console.log('Producto Guardado')
            })
        })


    }
    // Versión con callback
    getProducts(){
        fs.readFile(path, 'utf-8').then( ( data) =>{
            this.products = JSON.parse(data);
            console.log(JSON.parse(data))
            //return JSON.parse(data);

        }).catch( error => {
            console.error('Upss tenemos un error al leer el archivo');
        })
    }

    getProductById(id){

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