import React from "react"
import {Redirect} from "react-router-dom";
// 引入组件
import App from "../App";
import CityList from "../pages/CityList";
import Home from "../pages/Home";
import HouseList from "../pages/HouseList"
import Index from "../pages/Index";
import MapComp from "../pages/Map";
import News from "../pages/News";
import Profile from "../pages/Profile";
import Search from "../pages/Search";

const routes = [
    {
        path: "/",
        component: App,
        routes: [
            {
                path: "/",
                exact: true,
                render: () => (
                    <Redirect to={"/home"}/>
                )
            },
            {
                path: "/home",
                component: Home,
                routes: [
                    {
                        path: "/home",
                        exact: true,
                        component: Index,
                    },
                    {
                        path: "/home/list",
                        component: HouseList,
                    },
                    {
                        path: "/home/news",
                        component: News,
                    },
                    {
                        path: "/home/Profile",
                        component: Profile,
                    }
                ]
            },
            {
                path: "/map",
                component: MapComp,
            },
            {
                path: "/citylist",
                component: CityList,
            },
            {
                path: "/search",
                component: Search,
            },
        ]
    }
]

export default routes