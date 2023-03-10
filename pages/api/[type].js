import api from '../../api/server';

export default (req, res) => {
  api
    .getCategories(req.query)
    .then((response) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response, undefined, 2));
    })
    .catch((err) => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(err));
    });
};
