const express = require('express')
const app = express()
app.use(express.json())
const productos = [
  { id: 1, title: 'Producto 1', description: 100 ,code:"P1",price: 100,status:true, stock: 10,category:"cat1", thumbnails:["img1","img2"] },
  { id: 2, title: 'Producto 2', description: 200 ,code:"P2",price: 200,status:true, stock: 20,category:"cat2", thumbnails:["img3","img4"] },
  { id: 3, title: 'Producto 3', description: 300 ,code:"P3",price: 300,status:true, stock: 30,category:"cat3", thumbnails:["img5","img6"] },
  { id: 4, title: 'Producto 4', description: 400 ,code:"P4",price: 400,status:true, stock: 40,category:"cat4", thumbnails:["img7","img8"] },
]

const PORT = 8080

app.get('/products', (req, res) => {
  res.json(productos)
})

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const producto = productos.find(p => p.id === id)
  if (producto) {
    res.json(producto)
  } else {
    res.status(404).json({ error: 'Producto no encontrado' })
  }
})

app.post('/products', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body
  const newProduct = {
    id: productos.length + 1,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  }
  productos.push(newProduct)
  res.status(201).json(newProduct)
})

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = productos.findIndex(p => p.id === id)
  if (index !== -1) {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    productos[index] = { id, title, description, code, price, status, stock, category, thumbnails }
    res.json(productos[index])
  } else {
    res.status(404).json({ error: 'Producto no encontrado' })
  }
})

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = productos.findIndex(p => p.id === id)
  if (index !== -1) {
    productos.splice(index, 1)
    res.json({ message: 'Producto eliminado' })
  } else {
    res.status(404).json({ error: 'Producto no encontrado' })
  }
})

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`)
})