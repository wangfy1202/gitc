# **Structure**

```
tree -L 2 -I "node_modules|dist"
```

```
├── CHANGELOG.md             // 版本更新，更给的地方
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── Dockerfile       //把项目放到镜像上，启动项目的方法
├── LICENSE         //版权许可证
├── README.md        //项目介绍，自述文件
├── build
│   ├── webpack.base.config.js     //公共文件
│   ├── webpack.dev.config.js      //开发
│   ├── webpack.dll.config.js
│   └── webpack.prod.config.js     //生产
├── dll
│   ├── react.dll.js
│   └── react.manifest.json
├── docker-compose.yml          //镜像上的配置
├── docs                      //安装依赖的介绍
│   ├── CSP.md
│   ├── ES6.md
│   ├── HMR.md
│   ├── README.md
│   ├── SPM.md
│   ├── Toast.md
│   ├── ant-mobile-theme.md
│   ├── babel.md
│   ├── circleci.md
│   ├── commit-lint.md
│   ├── core-js.md
│   ├── docker.md
│   ├── eslint.md
│   ├── html-plugin.md
│   ├── mock.md
│   ├── project-init.md
│   ├── react-context.md
│   ├── react-hooks.md
│   ├── react-router.md
│   ├── redux.md
│   ├── request.md
│   ├── webpack.md
│   └── yarn.md
├── nginx.conf         //镜像上面的配置
├── package.json       //命令，依赖版本号
├── src               //项目代码
│   ├── actions
│   ├── app.js
│   ├── components
│   ├── containers
│   ├── context
│   ├── index.html
│   ├── index.js
│   ├── reducers
│   ├── static
│   ├── store
│   ├── styles
│   └── utils
├── theme.json
└── yarn.lock             //yarn版本锁定
```
