const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
    // 在这里使用 customize-cra 里的一些函数来修改配置
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css' //或者true, true代表运用less
    })
);