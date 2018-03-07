import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const banner = `/*!
* ${pkg.name} - v${pkg.version}
* A jQuery menu plugin
* https://github.com/onokumus/metismenu#readme
*
* Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/`;


export default [
  {
    input: 'src/index.js',
    external: ['jquery'],
    output: [
      {
        name: 'metisMenu',
        banner,
        globals: {
          jquery: 'jQuery',
        },
        file: pkg.browser,
        format: 'umd',
        sourcemap: true,
      },
      {
        file: pkg.main,
        banner,
        format: 'cjs',

      },
      {
        file: pkg.module,
        banner,
        format: 'es',
      },
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/index.js',
    external: ['jquery'],
    output: [
      {
        name: 'metisMenu',
        banner,
        globals: {
          jquery: 'jQuery',
        },
        file: pkg.jsdelivr,
        format: 'umd',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
      uglify({
        output: {
          comments: '/^!/',
        },
      }),
    ],
  },
];
