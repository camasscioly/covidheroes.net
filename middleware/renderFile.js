const ejs = require('ejs');
const pretty = require('pretty');
const { join } = require('path');
const { minify } = require('html-minifier');

module.exports = (req, res, file, options = {}) => {
  let data = {
    t: req.t,
  };
  return ejs.renderFile(
    join(__dirname, `./../views/${file}.ejs`),
    data,
    options,
    (err, content) => {
      if (err) return res.status(500).send(err);
      res.setHeader('Content-Type', 'text/html');
      if (process.env.NODE_ENV === 'development') {
        res.send(
          minify(pretty(content), {
            removeAttributeQuotes: false,
            collapseWhitespace: false,
            removeComments: false,
            removeTagWhitespace: false,
            useShortDoctype: false,
            minifyCSS: false,
            minifyJS: false,
          })
        );
      } else {
        res.send(
          minify(content, {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            removeTagWhitespace: true,
            useShortDoctype: true,
            minifyCSS: true,
            minifyJS: true,
          })
        );
      }
    }
  );
};
