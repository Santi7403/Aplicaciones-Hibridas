import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
const port = 3000;
const admin = new ProductManager();

app.use(express.json());

// Get main
app.get('/', (req, res) => {
    res.send('<h1>Hola desde NodeJS - Servidor con Express</h1>');
});

// Get para todo los productos
app.get('/api/products', async (req, res) => {
    try {
        const products = await admin.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Get oara un producto por su ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await admin.getProductById(id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el producto" });
    }
});

// Post para agregar un nuevo producto
app.post('/api/products', async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: "Faltan campos obligatorios: name y price" });
        }

        const newProduct = {
            name,
            price
        };

        const id = await admin.setProduct(newProduct);

        res.status(200).json({ message: "Producto agregado", id, ...newProduct });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
