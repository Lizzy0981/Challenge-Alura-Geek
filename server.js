const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

const port = process.env.PORT || 3001;

// Configurar CORS
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para el filtrado personalizado
server.use((req, res, next) => {
  if (req.method === 'GET' && req.url.startsWith('/productos')) {
    const categoria = req.query.categoria;
    
    if (categoria) {
      console.log('Filtrando productos por categoría:', categoria);
      
      const db = router.db;
      const productos = db.get('productos').value();
      
      // Mejorar el filtrado con validación
      const filtrados = productos.filter(producto => {
        // Verificar que el producto y la categoría existan
        if (!producto || !producto.categoria) {
          return false;
        }
        
        // Normalizar las cadenas para la comparación
        const categoriaProducto = producto.categoria.toLowerCase().trim();
        const categoriaRequest = categoria.toLowerCase().trim();
        
        return categoriaProducto === categoriaRequest;
      });
      
      console.log(`Se encontraron ${filtrados.length} productos en la categoría ${categoria}`);
      
      if (filtrados.length === 0) {
        console.log('No se encontraron productos para la categoría:', categoria);
      }
      
      return res.json(filtrados);
    }
  }
  next();
});

// Middleware para manejar errores
server.use((err, req, res, next) => {
  console.error('Error en el servidor:', err);
  res.status(500).json({
    error: true,
    message: 'Error interno del servidor'
  });
});

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server está corriendo en el puerto ${port}`);
  console.log(`Servidor iniciado con éxito en http://localhost:${port}`);
});
