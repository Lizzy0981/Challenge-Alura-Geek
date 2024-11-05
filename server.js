const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

const port = process.env.PORT || 3001;

// Agregar middleware personalizado para el filtrado
server.use(cors({
  origin: '*'
}));

// Middleware para el filtrado personalizado
server.use((req, res, next) => {
  if (req.method === 'GET' && req.url.startsWith('/productos')) {
    const categoria = req.query.categoria;
    if (categoria) {
      const db = router.db; // Obtener la base de datos
      const productos = db.get('productos').value(); // Obtener todos los productos
      
      // Filtrar por categoría
      const filtrados = productos.filter(p => 
        p.categoria.toLowerCase() === categoria.toLowerCase()
      );
      
      return res.json(filtrados);
    }
  }
  next();
});

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server está corriendo en el puerto ${port}`);
});
