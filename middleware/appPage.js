module.exports = (req, res, next) => {
  const parts = req.get('host').split('.');
  const sub = parts[0] || null;
  const domain = parts[1];
  const type = `.${parts[2]}` || '';
  const fixed = `${req.protocol}://${`app.${req.get('host').replace('www.', '')}`}${req.originalUrl}`;
  if (sub === 'app') next();
  else res.redirect(fixed);
};
