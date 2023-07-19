const rollup = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');

/**
 * @type {rollup.InputOptions}
 */
const inputOptions = {
  input: './index.js',
  plugins: [
    commonjs({
      include: /node_modules/
    }),
    resolve()
  ],
};

/**
 *
 * @type {rollup.OutputOptions}
 */
const outputOptions = {
  dir: './dist',
  // file: 'index1.js',
  format: 'cjs',
}

async function build() {
  // 创建一个 bundle
  const bundle = await rollup.rollup(inputOptions);

  // 在内存中生成输出特定的代码
  // 您可以在同一个 bundle 对象上多次调用此函数
  const {output} = await bundle.generate(outputOptions);

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      console.log('Asset', chunkOrAsset);
    } else {
      console.log('Chunk', chunkOrAsset.modules);
    }
  }

  // 或者将bundle写入磁盘
  await bundle.write(outputOptions);
}

build();
