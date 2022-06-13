import * as React from 'react'

import {TabBar} from "antd-mobile"

// 导入css样式
import "./index.css"
// 导入router-config的renderRoutes方法
import {renderRoutes} from 'react-router-config'
// 引入变量类型
import {TabBarList} from "./type"

function Home(props) {
    // 这个hook是初始化渲染的时候，修改页面的标题
    React.useEffect(() => {
        document.title = "好租客-首页";
    }, [])

    // 当前选中的TabBar
    const [selectedTab, setSelectedTab] = React.useState<string>(props.location.pathname)

    // TabBar选项数据
    const tabBarList: Array<TabBarList> = [
        {
            id: 1,
            title: "首页",
            icon: 'icon-ind',
            path: "/home"
        },
        {
            id: 2,
            title: "找房",
            icon: 'icon-findHouse',
            path: "/home/list"
        },
        {
            id: 3,
            title: "资讯",
            icon: 'icon-infom',
            path: "/home/news"
        },
        {
            id: 4,
            title: "我的",
            icon: 'icon-my',
            path: "/home/Profile"
        }
    ]

    // 这个hook用来监听地址是否改变了，如果改变了，声明的数据也要改变
    React.useEffect(() => {
        setSelectedTab(props.location.pathname)
    }, [props.location.pathname])

    function renderTabBarItem() {
        // 定义变量接收TabBar.Item组件
        const TabBarItem = TabBar.Item

        return (
            tabBarList.map((item) => (
                <TabBarItem
                    title={item.title}
                    key={item.id}
                    icon={< i className={`iconfont ${item.icon}`}/>}
                    selectedIcon={<i className={`iconfont ${item.icon}`}/>}
                    selected={selectedTab === item.path}
                    onPress={() => {
                        setSelectedTab(item.path)
                        props.history.push(item.path)
                    }}
                    data-seed="logId"
                />
            ))
        )
    }

    return (
        <div className="home">
            {renderRoutes(props.route.routes)}

            <TabBar
                // 未选中的字体颜色
                unselectedTintColor="#949494"
                // 选中后的字体颜色
                tintColor="#21b97a"
                // TabBar背景色
                barTintColor="white"
                // TabBar是否隐藏
                hidden={false}
                // TabBar位置
                tabBarPosition="bottom"
            >

                {/* render TabBar item */}
                {renderTabBarItem()}

            </TabBar>
        </div>
    )

}

export default Home
