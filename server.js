const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Tu base de datos
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/stats/:platform?', (req, res) => {
  const db = router.db;
  const platform = req.params.platform;

  const stats = db.get('stats').value();

  if (platform && stats[platform]) {
    res.jsonp({
      [platform]: stats[platform],
    });
  } else {
    res.jsonp({ AllPlatforms: stats['AllPlatforms'] });
  }
});

server.get('/games/:platform?', (req, res) => {
  const db = router.db;
  let platform = req.params.platform;
  if (!platform || platform.toLowerCase().includes('all')) {
    platform = '';
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search;

  let games = db
    .get('games')
    .value()
    .filter(game => (platform?.length ? game.platform === platform : game));

  if (search && search.length) {
    games = games.filter(sale => sale.gameName.toLowerCase().includes(search.toLowerCase()));
  }

  games.sort((a, b) => b.amount - a.amount);

  const start = (page - 1) * limit;

  const end = page * limit;
  const data = games.slice(start, end);

  if (data.length > 0) {
    res.jsonp({
      games: data,
      totalCount: games.length,
    });
  } else {
    res.status(404).jsonp({
      error: 'No se ha encontrado ningún juego',
    });
  }
});

server.get('/game/:id', (req, res) => {
  const db = router.db;
  const id = req.params.id;

  let game = db.get('games').find({ id: id }).value();

  if (!game) {
    game = db.get('games').find({ gameName: id }).value();
  }

  if (game) {
    res.jsonp({
      data: game,
    });
  } else {
    res.status(404).jsonp({
      error: 'Game not found',
    });
  }
});

server.get('/top-sales/:platform?', (req, res) => {
  const db = router.db;
  let platform = req.params.platform;
  if (!platform || platform.toLowerCase().includes('all')) {
    platform = '';
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search;

  let sales = db
    .get('topSales')
    .value()
    .filter(sale => (platform?.length ? sale.platform === platform : sale));

  if (search && search.length) {
    sales = sales.filter(sale => sale.productName.toLowerCase().includes(search.toLowerCase()));
  }

  sales.sort((a, b) => b.amount - a.amount);

  const start = (page - 1) * limit;

  const end = page * limit;
  const data = sales.slice(start, end);

  if (data.length > 0) {
    res.jsonp({
      sales: data,
      totalCount: sales.length,
    });
  } else {
    res.status(404).jsonp({
      error: 'No se ha encontrado ninguna venta',
    });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('✅ JSON Server running in http://localhost:3000');
});
