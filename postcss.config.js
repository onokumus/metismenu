const pkg = require('./package.json');

const banner = `/*!
* ${pkg.name} - v${pkg.version}
* A jQuery menu plugin
* https://github.com/onokumus/metismenu#readme
*
* Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
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
