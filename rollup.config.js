import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const banner = `/*!
* ${pkg.name} ${pkg.homepage}
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author}
* @license: ${pkg.license} 
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
];
