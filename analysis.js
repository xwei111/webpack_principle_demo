const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const moduleInfo = {}

const getModules = (file) => {
  const body = fs.readFileSync(file, 'utf-8')
  const ast = parser.parse(body);
  const deps = []
  traverse(ast, {
    // 对语法树中特定的节点进行操作
    CallExpression(p) {
      if (p.node.callee.name === 'require') {
        // 将代码中的require替换为__webpack_require__
        p.node.callee.name = '__webpack_require__'
        // 拿到各模块路径
        const dirname = path.dirname(file)
        const oldValue = p.node.arguments[0].value
        p.node.arguments[0].value = ('./' + path.join(dirname, oldValue)).replace(/\\+/g, '/')
        // 将require的路径添加到deps
        deps.push(p.node.arguments[0].value)
      }
    }
  })
  if (deps.length) {
    deps.map(dep => getModules(dep))
  }
  // 将moduleInfo处理成bundle.js传入自执行函数的参数形式
  moduleInfo[file] = `(function (module, exports, __webpack_require__) {${generator(ast).code}})`
}

getModules('./src/index.js')

const getBundle = () => {
  let str = '';
  Object.keys(moduleInfo).map(key => {
    str += '"' + key + '"' + `: ${moduleInfo[key]},`
  })
  str = "{" + str + "}"
  return `(function (modules) {
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
      })(${str})`
}

const content = getBundle()

fs.mkdirSync('./self');
fs.writeFileSync('./self/bundle.js', content)

