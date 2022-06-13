import * as React from "react";
// 引入Flex组件
import {Flex} from "antd-mobile";
// 引入类型
import {TitleListItemInterface, titleSelectedStatus} from "./interface";
// 引入样式表
import "./index.scss"

function FilterTitle({onClick, titleSelectedStatus}: titleSelectedStatus) {

    // 声明存储Title数据的hook
    const titleList: Array<TitleListItemInterface> = [
        {
            title: "区域",
            type: "area"
        },
        {
            title: "方式",
            type: "mode"
        },
        {
            title: "租金",
            type: "price"
        },
        {
            title: "筛选",
            type: "more"
        }
    ]

    // 点击title选项的方法
    function handleShowPickerView(type) {
        // 调用父组件传来的方法，并且把type传给父组件
        onClick(type);
    }

    const FlexItem = Flex.Item;
    return (
        <div className={"filter-title"}>
            <Flex align={"center"} className={"title-flex"}>
                {
                    // 渲染title结构
                    titleList.map((item) => (
                        <FlexItem key={item.type}
                                  className={["title-item", titleSelectedStatus[item.type] ? "title-item-active" : ""].join(" ")}
                                  onClick={() => handleShowPickerView(item.type)}>
                            <span className={"dropdown"}>{item.title}</span>
                            <i className={"iconfont icon-arrow"}></i>
                        </FlexItem>
                    ))
                }
            </Flex>
        </div>
    )
}

export default FilterTitle;