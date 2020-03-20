module.exports = (req, res, next) => {
  if (req.query.token === process.env.TOKEN) next();
  else res.boom.unauthorized();
};