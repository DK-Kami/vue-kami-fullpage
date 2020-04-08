import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'KamiFullpage',
    exports: 'named'
  },
  plugins: [
    commonjs(),
    vue({
      compileTemplate: true,
      css: true,
    }),
    buble(),
  ],
};
