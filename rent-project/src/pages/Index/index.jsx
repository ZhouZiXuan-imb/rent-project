import React from 'react'

// 引入css样式
import "./index.css"

// 引入组件
import Nav from "./components/Nav"
// 引入轮播图组件
import CarouselComp from './components/CarouselComp'
// 引入租房小组组件
import Groups from './components/Groups'
// 引入资讯组件
import NewsComp from './components/NewsComp'
// 引入Sreach组件
import TopSreachComp from '../../components/TopSreachComp'

function Index(props) {
    return (
        <div className="Index">
            {/* 顶部搜索框 */}
            <TopSreachComp history={props.history}></TopSreachComp>
            {/* 轮播图 */}
            <CarouselComp></CarouselComp>


            {/* Nav component */}
            <Nav props={props}></Nav>

            {/* 租房小组 */}
            <Groups></Groups>

            {/* 资讯 */}
            <NewsComp></NewsComp>
        </div>
    )

}

export default Index
