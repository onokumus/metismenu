import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const banner = `/*!
* ${pkg.name} - v${pkg.version}
* ${pkg.description}
* ${pkg.homepage}
*
* Made by ${pkg.author}
* Under ${pkg.license} License
*/`;


export default [
  {
    input: 'dist/modules/index.js',
    output: {
      file: pkg.main,
      banner,
      format: 'cjs',
    }
  },
  {
    input: 'dist/modules/index.js',
    output: {
      name: 'MetisMenu',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      banner
    },
    plugins: [
      babel()
    ],
  },
];
