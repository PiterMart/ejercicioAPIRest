const express = require('express');

const PORT = process.env.PORT || 5050;

const productos = [
    {id: 1, producto: "Monitores JBL"},
    {id: 2, producto: "Placa de sonido"},
    {id: 3, producto: "Pie de microfono"}
];

const app = express();

//Middlewares

app.use(express.json());

// Routes
// GET
// query
//devuelve todos los productos
app.get('/api/productos', (req, res) => {
    const {producto, id} = req.query;
    console.log(producto, id);
    res.json(productos);
});

// params

//devuelve prodducto segun ID
app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find((producto) => producto.id === +id);
    res.json(producto);
});

// POST
//recibe y agrega un producto, y lo devuelve con su id asignado
app.post('/api/productos', (req, res) => {
    console.log('Peticion POST recibida');
    console.log(req.body);
    res.json({ body: req.body });

})

//PUT
//recibe y actualiza un producto segun su id
app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { producto } = req.body;
    const index = productos.findIndex((producto) => producto.id === +id);
    productos[index] = {
        id: productos[index].id,
        producto: producto
    };
    res.json({ mensaje: 'producto actualizado'})
});

//DELETE
//elimina un producto segun su id
app.delete('/api/productos/:id', (req, res) => {
    const { id } =  req.params;
    const index = productos.findIndex((producto) => producto.id === +id);
    productos.splice(index, 1);
    res.json({ mensaje: "Producto eliminado correctamente" });
});

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});

