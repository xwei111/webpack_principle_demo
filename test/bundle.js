// 将整个解析出来的模块即modules传入自执行函数，key即路径，value即执行代码
(function (modules) {
  // 用来存储解析过的模块
  var installedModules = {}; 
  // moduleId即为各个模块的唯一标识
  function __webpack_require__(moduleId) {
    // 解析过的模块直接返回exports
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 定义module，包含唯一标识i和exports
    var module = installedModules[moduleId] = {
      i: moduleId,
      exports: {}
    };
    // 调用modules[moduleId]对应的函数
    // 会执行eval中的代码
    // eval中遇到module.exports时，module代表call传入的第二个参数module，exports代表call传入的第三个参数module.exports
    // eval中遇到__webpack_require__则调用call的四个参数__webpack_require__函数，以此形成递归
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // 返回exports
    return module.exports;
  }
  // 初次调用，传入webpack.config.js中的entry，我们的配置是./src/index.js
  return __webpack_require__("./src/index.js");
})
  ({
    "./src/a.js":
      (function (module, exports, __webpack_require__) {
        eval("const { num2 } = __webpack_require__(\"./src/b.js\")\r\n\r\nmodule.exports = {\r\n    num1: 1,\r\n    num2\r\n}\n\n//# sourceURL=webpack:///./src/a.js?");
      }),
    "./src/b.js":
      (function (module, exports) {
        eval("module.exports = {\r\n    num2: 2\r\n}\n\n//# sourceURL=webpack:///./src/b.js?");
      }),

    "./src/c.js":
      (function (module, exports) {
        eval("module.exports = {\r\n    num3: 3\r\n}\n\n//# sourceURL=webpack:///./src/c.js?");
      }),

    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        eval("const { num1, num2 } = __webpack_require__(\"./src/a.js\");\r\nconst { num3 } = __webpack_require__(\"./src/c.js\");\r\n\r\nconst num4 = num1 + num2 + num3;\r\n\r\nconsole.log('num4---', num4)\n\n//# sourceURL=webpack:///./src/index.js?");
      })
  });