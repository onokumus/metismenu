import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
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
    output: [
      {
        file: pkg.main,
        banner,
        format: 'cjs',
      },
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'dist/cjs/index.js',
    output: [
      {
        name: 'MetisMenu',
        file: pkg.browser,
        banner,
        format: 'umd',
        sourcemap: true
      },
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs()
    ],
  },
];
