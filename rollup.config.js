import terser from '@rollup/plugin-terser'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const banner = `/**
 * om-map-utils
 * 地图坐标转换工具库，支持 WGS-84、GCJ-02、BD-09 三种坐标系之间的相互转换
 * @version ${pkg.version}
 * @license MIT
 */`

export default [
  // UMD 格式 - 用于浏览器 <script> 标签直接引用
  {
    input: 'src/index.js',
    output: {
      file: 'dist/om-map-utils.js',
      format: 'umd',
      name: 'MapUtils',
      banner,
      sourcemap: true
    }
  },
  // UMD 压缩版
  {
    input: 'src/index.js',
    output: {
      file: 'dist/om-map-utils.min.js',
      format: 'umd',
      name: 'MapUtils',
      banner,
      sourcemap: true
    },
    plugins: [terser()]
  },
  // ES Module 格式 - 用于现代打包工具
  {
    input: 'src/index.js',
    output: {
      file: 'dist/om-map-utils.esm.js',
      format: 'es',
      banner,
      sourcemap: true
    }
  },
  // CommonJS 格式 - 用于 Node.js
  {
    input: 'src/index.js',
    output: {
      file: 'dist/om-map-utils.cjs',
      format: 'cjs',
      banner,
      exports: 'named',
      sourcemap: true
    }
  }
]

