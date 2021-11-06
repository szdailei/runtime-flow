import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const compileMode = process.env.NODE_ENV;
const plugins = [
  nodeResolve({ extensions: ['.mjs', '.js', '.jsx'], preferBuiltins: false }),
  replace({ 'process.env.NODE_ENV': JSON.stringify(compileMode), preventAssignment: true }),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    presets: [['@babel/preset-env', { targets: { chrome: 90 } }], '@babel/preset-react'],
    include: ['../**/src/**'],
    extensions: ['.jsx', '.tsx'],
  }),
];

async function rollupBuild(inputOptions, outputOptions) {
  const bundle = await rollup(inputOptions);

  const prodOutputOptions = { ...outputOptions };
  prodOutputOptions.plugins = process.env.NODE_ENV === 'production' ? [terser()] : [];
  await bundle.write(prodOutputOptions);
  await bundle.close();
}

export { plugins, rollupBuild };
