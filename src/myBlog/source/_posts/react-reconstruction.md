---
title: react重构移动端项目的记录
date: 2017-11-17 15:48:10
tags: ['react','javaScript']
---
### 家校健康v2.0.0
#### 参考

1. https://github.com/yeoman/generator-webapp

#### 简介

>* 基于react的技术栈重构dhome-teach
>* 基础语言： ES6 react sass
>* 脚手架： yeoman generator-webapp
>* 构建工具 ： gulp + webpack
>* 统一数据管理： redux
>* 路由控制器： react-router react-router-redux
>* 性能优化： immutable purerender
>* 前后端分离： webpack-dev-server(proxy)
>* 代码规范： eslintrc
>* 单元测试 ： karma
>* 开发效率提升 : redux-devtools react-hot-loader

#### 使用的主要库：
+ react                                           //view
+ redux                                           //数据管理
+ react-router react-router-redux                 //路由
+ ReactCSStransitionGroup                          //react官方动画库
+ axios                                           //取数据
+ redux-thunk                                     //redux异步控制
+ react-hot-loader                                 //热替换
+ create-react-app                                 //react官方脚手架
+ lib-flexible                                   //移动端自适应
+ sass                                           //css预处理器

#### 使用：
1. 前期准备，代码规范
```
npm i -g gulp
npm i -g gulp-cli
npm i -g webpack
```
+ 使用网易NEC规范 http://nec.netease.com/standard

2. 使用脚手架工具快速搭建基础工程

3. 开始,开发模式
```
npm i
gulp webpack:watch
```
4. 部署


5. 使用redux-devtools工具 https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
```
npm install --save-dev redux-devtools
npm install --save-dev redux-devtools-log-monitor
npm install --save-dev redux-devtools-dock-monitor
```

#### 样式
1. 使用normalize.css reset样式
https://github.com/necolas/normalize.css

#### webpack 配置
loaders：

### react 学习记录
1.像设计师一样思考
已知“低保真原型和JSON数据结构”；
通过对比、重复、亲密性原则进行组件的划分，定义组件并命名；
然后划分组件层次（并列、包含）；

2.构建静态版本
利用数据模型渲染一个没有交互的静态版本；
可以自上而下或者自下而上的构建静态组件；
要求组件只使用render()方法，且只能用props传递数据；

3.确定最小的可变状态（state）
如何确定最小的state？
——列出应用所有的数据块；
——逐一对以上数据块思考三个问题：
①是通过props从父级传递过来么？如果是，则可能不是state。
②随时间变化么？如果不变，则可能不是state。
//说明可以通过props传递；
③能否基于其它state或者props计算出？如果可以，则不是state。

4.定义getInitialState()所在的组件
React 总是在组件层级中单向数据流动的；
①找出可以修改或者拥有该state的所有components；
②确定一个层级高于①中的所有组件单一组件；
③如果找不到该单一组件，则创建该组件；
//仅仅为了定义该state；


父子组件通信互相影响时，props的定义
eg:
```
data() {
    return {
        time:this.perid
    }
}
props: ['period'],
watch: {
  period(newVal) {
    if(newVal) {
      this.time = newVal
    }
},
```



























