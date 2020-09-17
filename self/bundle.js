(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
  }
  return __webpack_require__("./src/index.js");
})({
  "./src/b.js": (function (module, exports, __webpack_require__) { 
    module.exports = { num2: 2 }; 
  }), 
  "./src/a.js": (function (module, exports, __webpack_require__) { 
    const { num2 } = __webpack_require__("./src/b.js"); module.exports = { num1: 1, num2 };
  }), 
  "./src/c.js": (function (module, exports, __webpack_require__) { 
    module.exports = { num3: 3 }; 
  }), 
  "./src/index.js": (function (module, exports, __webpack_require__) {
    const { num1, num2 } = __webpack_require__("./src/a.js");
    const { num3 } = __webpack_require__("./src/c.js");
    const num4 = num1 + num2 + num3;
    console.log('num4---', num4);
  }),
})