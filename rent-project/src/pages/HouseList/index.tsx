import * as React from 'react'
import {useEffect, useState} from 'react'
// 引入顶部搜索组件
import TopSreachComp from '../../components/TopSreachComp'
// 引入antd mobile的Flex组件
import {Flex, Toast} from "antd-mobile"
// 引入Filter组件
import Filter from "./components/Filter"
// 引入样式表
import "./index.scss"
// 引入HouseItem组件
import HouseItem from "../../components/HouseItem";
// 引入axios请求方法
import {axiosGet} from "../../utils/axios/requer";
// 引入请求地址
import {houseUseApi} from "../../api/homeApi";
// 引入接口
import {HouseListInterface} from "./interface";
// 引入获取localStorage存储的值的方法
import {getLocalStoreageItem} from "../../utils/myLocalStoreage";

// 声明变量接收当前城市数据，声明变量接收筛选数据
// 这里变量声明在组件里面的话只有刚进入页面时能获取到，再次更新的时候这个值就没了，愿意暂时不明。
let cityLabel: string, cityValue: string, filter: object = {};

function HouseList(props) {
    // 声明存储房屋数据的hook
    const [houseList, setHouseList] = useState<Array<HouseListInterface>>([])

    useEffect(() => {
        // 获取当前城市名称和ID
        let currentCityRes: any = getLocalStoreageItem();
        // 解构出需要的数据
        let {label, value}: { label: string, value: string } = currentCityRes;
        // 赋值
        cityLabel = label;
        cityValue = value;
        getFilter();
    }, [])

    async function getFilter() {
        Toast.loading("加载中...", 0, null)
        // 获取到筛选数据后，发起请求
        let filterDataRes: any = await axiosGet(houseUseApi.houseListApi, {
            // cityId
            cityId: cityValue,
            ...filter,
            start: 1,
            end: 40
        });
        Toast.hide();

        // 解构出需要的数据
        let {body, status} = filterDataRes.data;
        // 判断数据是否获取成功
        if (status !== 200) return Toast.info("房源数据获取失败");
        if (body.count !== 0) {
            Toast.info(`共查找到${body.count}条数据`, 2);
        }
        // 解构出list，并声明list数组中对象属性的类型;
        // 把数据存储到HouseListHook中
        setHouseList(body.list)
    }

    // 获取筛选数据
    function onFilter(result) {
        filter = result;
        getFilter();
    };

    // 渲染房屋列表每一项的方法
    function renderHouseItem() {
        return (
            <div className={"houselist-item"}>
                {
                    houseList.map((item) => (
                        <HouseItem key={item.houseCode} houseImg={item.houseImg} title={item.title} tags={item.tags}
                                   price={item.price} desc={item.desc}/>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="houselist">
            {/* 顶部搜索导航 */}
            <Flex className={"header"}>
                <i
                    className="iconfont icon-back"
                    onClick={() => props.history.go(-1)}
                />
                <TopSreachComp history={props.history} className={"searchHeader"}/>
            </Flex>

            {/*  筛选房源  */}
            <Filter onFilter={onFilter}></Filter>

            {/*渲染每一项房屋数据*/}
            {renderHouseItem()}
        </div>
    )

}

export default HouseList
