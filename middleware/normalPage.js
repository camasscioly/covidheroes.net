module.exports = (req, res, next) => {
  const parts = req.get('host').split('.');
  const sub = parts[0] || null;
  const domain = parts[1];
  const type = `.${parts[2]}` || '';
  const fixed = `${req.protocol}://${`${req.get('host').replace(/^[^.]+\./g, '')}`}${
    req.originalUrl
  }`;
  if (sub === 'app' || req.get('host').includes('canary')) {
    res.cookie('member', '', { expires: new Date(0) });
    next();
  } else res.redirect(fixed);
};
