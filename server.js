const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

const port = process.env.PORT || 3001;

server.use(cors({
  origin: '*' // En producción, deberías especificar tu dominio de Netlify
}));
server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server está corriendo en el puerto ${port}`);
});
