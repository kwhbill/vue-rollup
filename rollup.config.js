import resolve from 'rollup-plugin-node-resolve' // 解决模块的查找导入 ，
import commonjs from 'rollup-plugin-commonjs' // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import vue from 'rollup-plugin-vue' // 处理vue文件
// import { eslint } from 'rollup-plugin-eslint';  // eslint语法检查
import babel from 'rollup-plugin-babel'  // rollup 的 babel 插件，ES6转ES5
import css from 'rollup-plugin-css-only' // 提取css，压缩能力不行
import { terser } from 'rollup-plugin-terser'; // 实现js代码压缩
import CleanCSS from 'clean-css' // 压缩css
import replace from 'rollup-plugin-replace'    //代码中的__SAM__被正确替换；
import alias from 'rollup-plugin-alias'   // 将模块中’@'别名替换为’src’目录；
import { writeFileSync } from 'fs' // 写文件
import pkg from "./package.json";
const isDev = process.env.NODE_ENV !== 'production'
import path from 'path'
import _ from "lodash";
const pathResolve = p => path.resolve(__dirname, p)
let name = _.last(_.split(pkg.name,'/'))
function getUpperName(name) {
  let nameList = _.split(name,'-')
  nameList = _.map(nameList,(item,index)=>{
    return _.upperCase(_.get(item,'0')) + item.slice(1)
  })
  return _.join(nameList,'')
}
export default {
  input: 'src/index.js',
  output: [
    //  intro: "kong", outro: "weihao"  用户往包头包尾部加东西 
    { file: pkg.main, format: 'es', name , intro: "//kong", outro: "//weihao" },
    { file: pkg.module, format: 'cjs', name },
    { file: pkg.browser, format: 'umd', name },
    { file: pkg.iife, format: 'iife', name:getUpperName(name) },
  ],
  external: ['lodash'],   // 不打包 lodash
  globals: {
    lodash: '_'
  },
  plugins: [
    resolve({
      mainFields: ['module', 'main', 'browser'],
      extensions: ['.vue', '.js', '.jsx', '.json'],
    }),
    commonjs(),
    css({
      output(style) {
        // 压缩 css 写入 dist/vue-rollup-component-template.css
        writeFileSync(`dist/${name}.min.css`, new CleanCSS().minify(style).styles)
      }
    }),
    // css: false 将<style>块转换为导入语句，rollup-plugin-css-only可以提取.vue文件中的样式
    vue({ css: false }),
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
    }),
    alias({
      entries: [
        { find: '@', replacement: pathResolve('src') },
      ],
    }),
    replace({
      __SAM__: true
    }),
    isDev && terser({
      output: {
        ascii_only: true // 仅输出ascii字符
      },
      compress: {
        pure_funcs: ['console.log'] // 去掉console.log函数
      }
    }),
    // eslint({
    //     throwOnError: false,
    //     throwOnWarning: true,
    //     include: ['src/**'],
    //     exclude: ['node_modules/**']
    // }),
  ]
}
