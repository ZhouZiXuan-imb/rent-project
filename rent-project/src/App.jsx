import React from 'react'

// 引入路由组件
// import { NavLink } from "react-router-dom"
// 导入router-config
import {renderRoutes} from "react-router-config"
// // 引入路由文件
// import routes from "./routes/index"


// import TabBarComp from "./components/TabBar"
// 引入Home组件
// import Home from "./pages/Home"
// 导入CityList组件
// import CityList from './pages/CityList'

function App(props) {

    return (
        <div className="App">
            {/* <h2>my App Component</h2> */}

            {renderRoutes(props.route.routes)}
        </div>
    )

}

export default App
