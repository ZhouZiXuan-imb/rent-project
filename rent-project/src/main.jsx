import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// 引入renderRouter方法
import {renderRoutes} from "react-router-config"
// 引入路由组件
import {HashRouter} from "react-router-dom"
// 引入路由文件
import routes from "./routes/index"
// 导入antd-mobile的样式：
import 'antd-mobile/dist/antd-mobile.css'; // or 'antd-mobile/dist/antd-mobile.less'
// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'
// This only needs to be done once; probably during your application's bootstrapping process.
// import 'react-virtualized/styles.css';

ReactDOM.render(
    <HashRouter>
        {/* 使用严格模式后antd报错，原因：antd UI库的问题 */}
        {/* <React.StrictMode> */}
        {renderRoutes(routes)}
        {/* </React.StrictMode> */}
    </HashRouter>,
    document.getElementById('root')
)
