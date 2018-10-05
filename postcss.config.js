const pkg = require('./package.json');

const banner = `/*!
* ${pkg.name} ${pkg.homepage}
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author}
* @license: ${pkg.license} 
*/`;


module.exports = ctx => ({
  map: ctx.options.map,
  plugins: {
    'postcss-header': {
      header: banner,
    },
    'autoprefixer': {
      cascade: false
    },
    cssnano: ctx.env === 'production' ? {} : false
  }
})
