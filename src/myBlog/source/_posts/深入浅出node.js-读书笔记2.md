---
title: 深入浅出node.js-读书笔记2
date: 2017-11-17 16:59:15
tags: ['node.js', 'javascript']
---
#### Node.js模块的实现
http://www.infoq.com/cn/articles/nodejs-module-mechanism

<p>原生模块，文件模块</p>
<p>加载文件模块的工作，主要有原生模块module来实现和完成，该原生模块在启动时已经被加载，进程直接调用到runMain静态方法。</p>
```
// bootstrap main module.
Module.runMain = function () {
    // Load the main module--the command line argument.
    Module._load(process.argv[1], null, true);
};
```
<p>_load静态方法在分析文件名之后执行
var module = new Module(id, parent);
并根据文件路径缓存当前模块对象，该模块实例对象则根据文件名加载。
module.load(filename);</p>
+ .js。通过fs模块同步读取js文件并编译执行。
+ .node。通过C/C++进行编写的Addon。通过dlopen方法进行加载。
+ .json。读取文件，调用JSON.parse解析加载。

Node.js在编译js文件的过程中实际完成的步骤有对js文件内容进行头尾包装。
```
(function (exports, require, module, __filename, __dirname) {
    var circle = require('./circle.js');
    console.log('The area of a circle of radius 4 is ' + circle.area(4));
});
```
该段代码通过vm原生模块的runInThisContext方法执行（类似eval，只是具有明确上下文，不污染全局），返回为一个具体的function对象。
最后传入module对象的exports，require方法，module，文件名，目录名作为实参并执行。
\__filename，\__dirname，module，exports几个没有定义但是却存在的变量。
其中 \__filename，\__dirname在查找文件路径的过程中分析得到后传入。module变量是这个模块对象自身，exports是在module的构造函数中初始化的一个空对象（{}，而不是null）
在这个主文件中，可以通过require方法去引入其余的模块。而其实这个require方法实际调用的就是load方法。
load的方法在载入，编译，缓存lmodule后，返回module的exports对象
以上所描述的模块载入机制均定义在lib/module.js中
1. require方法中文件查找策略
2. 包结构： NPM的出现则时为了ConmmonJS规范的基础上，实现解决包的安装卸载，依赖管理，版本管理等问题
一个符合CommonJS规范的包应该是如下这种结构：
一个package.json文件应该存在于包顶级目录下
二进制文件应该包含在bin目录下。
JavaScript代码应该包含在lib目录下。
文档应该在doc目录下。
单元测试应该在test目录下。
3. Node.js模块与前端模块的异同
通常有一些模块可以同时适用于前后端，但是在浏览器端通过script标签的载入Javascipt文件的方法与Node.js不同
Node： 包装，形成一个闭包，不会污染全局
变量
script： 裸露javascript代码片段
所以。。。：
```
(function () {
    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;
    var _ = function (obj) {
            return new wrapper(obj);
        };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else if (typeof define === 'function' && define.amd) {
        // Register as a named module with AMD.
        define('underscore', function () {
            return _;
        });
    } else {
        root['_'] = _;
    }
}).call(this);
```