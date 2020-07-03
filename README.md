# 使用verdaccio 搭建私有npm 服务器
* npm install –global verdaccio
* verdaccio 启动 
* 将当前 npm 服务指向私库 （npm set registry http://localhost:4873 ）
* 注册用户 （npm adduser –registry http://localhost:4873，按照提示输入userName 和 password,email）
* npm publish 发布包到私库
* nrm ls 查看所有源
* 本地添加一个源 nrm add registryName http://localhost:4873
* 使用某个源 nrm use registryName 

# vue-rollup

## 开发vue插件
* 进入package.json文件，全局替换 my-plugin 成你的包名。
* npm install 安装依赖
* npm run dev 启动项目
* 在packages 文件中复制demo 文件进行开发 ，在 local-src文件中引入

## 打包插件

* dist 输出文件

- my-plugin.esm.js
- my-plugin.cjs.js
- my-plugin.min.js
- my-plugin.umd.js
- my-plugin.min.css

## 发布插件  
* npm publish  （到http://localhost:4873就可以看见发布成功）
* 文件列表

- dist
- src
- packages
- package.json

## 引用插件
* 在项目下 新增 .npmrc 文件 ，添加 registry=http://localhost:4873
* npm install @i61/my-plugin
* import MyPlugin from "@i61/my-plugin"
* import  "@i61/my-plugin/dist/my-plugins.min.css"
