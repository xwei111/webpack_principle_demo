const loaderUtils = require('loader-utils')

module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    var warning = '';
    console.log('options--', options)
    if(source.indexOf('const') > -1) {
        warning = "\n\r console.warn("+ '"'+ options.message + '"' +")"
    }
    return source + warning
}