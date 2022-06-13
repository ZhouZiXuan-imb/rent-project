// 引入React相关组件和方法
import * as React from "react"
// 引入Nav图片
import nav1 from "../../../../assets/images/nav-1.png"
import nav2 from "../../../../assets/images/nav-2.png"
import nav3 from "../../../../assets/images/nav-3.png"
import nav4 from "../../../../assets/images/nav-4.png"
// 引入antd mobile的Flex组件
import {Flex} from "antd-mobile"
// 引入css样式
import "./indedx.css"
// 引入type类型
import {NavType} from "./type"

function Nav(props) {

    // 声明Nav数据
    // 因为这些数据不会变，所以直接使用死数据
    const navList: Array<NavType> = [
        {
            title: "整租",
            path: "/home/list",
            imageSrc: nav1
        },
        {
            title: "合租",
            path: "/home/list",
            imageSrc: nav2
        },
        {
            title: "地图找房",
            path: "/home/list",
            imageSrc: nav3
        },
        {
            title: "去出租",
            path: "/home/list",
            imageSrc: nav4
        },
    ]

    // 渲染Nav数据
    function renderNavList() {
        const FlexItem = Flex.Item
        // console.log(props);
        return navList.map((item, index) => (
            <FlexItem key={index} onClick={() => props.props.history.push(item.path)}>
                <img src={item.imageSrc} alt=""/>
                <p>{item.title}</p>
            </FlexItem>
        ))
    }

    return (
        <div className="nav">
            {/* 使用antd mobille的Flex组件 */}
            <Flex>
                {renderNavList()}
            </Flex>
        </div>
    )
}

export default Nav;