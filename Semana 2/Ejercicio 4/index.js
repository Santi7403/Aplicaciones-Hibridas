const { ProductManager } = require('./ProductManager.js');


const manager = new ProductManager();

const p1 = { name: 'tres', price: 3000}
const p2 = { name: "cuatro", price: 500}


const guardar = async () =>{
    const products = await manager.getProducts();

    await manager.setProduct(p1);
    await manager.setProduct(p2);

    console.table(products);


}


guardar();
/* 
manager.getProducts().then( resp => {
    console.log(resp);

})

manager.setProduct(p1).then( resp =>{
    manager.setProduct(p2);

}) */