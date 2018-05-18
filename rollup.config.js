import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import dotenv from 'dotenv';
import pkg from './package.json';

dotenv.config();

const { env } = process;

export default {
  input: 'src/index.js',
  external: ['react', 'react-dom'],
  output: {
    name: 'app-ui-kit',
    file: pkg.main,
    format: 'umd',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: env.NODE_PATH,
      },
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react-dom': ['findDOMNode'],
      },
    }),
  ],
};
