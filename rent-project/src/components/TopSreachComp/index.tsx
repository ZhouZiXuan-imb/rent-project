import * as React from "react";
import {useEffect, useState} from "react";
// 引入Flex组件
import {Flex} from "antd-mobile"
import "./index.scss"
// 导入请求方法
// 导入请求地址
// 引入获取当前城市名称
import {getCurrentCity} from "../../utils/getCurrentCity"

function TopSreachComp({history, className}) {
    // 初始化城市名
    const [cityName, setCityName] = useState<string>("北京");
    const [areaId, setAreaId] = useState<string>("")

    useEffect(() => {
        getCityName();
    }, [])

    // 获取城市名称
    async function getCityName() {
        let currentCityResponse: any = await getCurrentCity();
        setCityName(currentCityResponse.label as string)
    }

    return (
        <Flex className={['search-box', className ? "searchHeader" : ""].join(" ")}>
            {/* 左侧白色区域 */}
            <Flex className="search">
                {/* 位置 */}
                <div className="location" onClick={() => history.push('/citylist')}>
                    <span className="name">{cityName}</span>
                    <i className="iconfont icon-arrow"/>
                </div>

                {/* 搜索表单 */}
                <div className="form" onClick={() => history.push('/search')}>
                    <i className="iconfont icon-seach"/>
                    <span className="text">请输入小区或地址</span>
                </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i className="iconfont icon-map" onClick={() => history.push('/map')}/>
        </Flex>
    )
}

export default TopSreachComp;