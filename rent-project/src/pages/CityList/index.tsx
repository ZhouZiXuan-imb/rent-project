import * as React from 'react'
import {useEffect, useState} from 'react'
// 引入请求方法
import {axiosGet} from "../../utils/axios/requer"
// 引入请求地址
import {areaUseApi} from "../../api/homeApi"
// 引入antd mobile的轻提示组件
import {Toast} from "antd-mobile";
// 引入长列表优化组件
import {AutoSizer, List} from 'react-virtualized';

// 引入封装获取城市列表数据的方法
import {cityListFormat} from "../../utils/cityListFormat"
import {getCurrentCity} from '../../utils/getCurrentCity';
// 引入设置localStorage的方法
import {setLocalStoreageItem} from "../../utils/myLocalStoreage"

import "./index.scss"
import NavHeader from "../../components/NavHeader";


function CityList(props) {
    React.useEffect(() => {
        document.title = "好租客-房源"
        // 初始化页面时调用获取城市列表的方法
        getCityList();
    }, [])

    // 存储城市列表的Hook
    const [cityList, setCityList] = React.useState({} as object);
    // 存储城市列表索引的Hook
    const [cityIndex, setCityIndex] = React.useState([] as string[])
    // 页面数据是否获取成功
    const [responseDone, setResponseDone] = React.useState(false as boolean);
    // 创建一个ref来获取List组件中的方法
    let listRef = React.useRef(null);
    // 存储当前城市索引列表高亮的hook
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // let a = listRef.current.scrollToRow();
        // console.log(a)
    }, [])

    // 初始化组件时请求cityList数据
    async function getCityList() {
        setResponseDone(false);
        Toast.loading("数据正在加载", 0, null, true)
        // 发起请求获取citiList数据
        const cityListResponse = await axiosGet(areaUseApi.cityDataApi, {
            level: 1
        })
        // 判断数据是否获取成功，如果获取失败就弹出提示框
        if (cityListResponse.data.status !== 200) return Toast.info("成列表数据获取失败");
        // 把cityList和cityIndex从获取城市列表方法中结构出来
        let {cityList, cityIndex} = await cityListFormat(cityListResponse.data.body);

        // 获取城市列表
        const hotCityListResponse = await axiosGet(areaUseApi.hotCityDataApi)
        // 判断数据是否获取成功，如果获取失败就弹出提示框
        if (hotCityListResponse.data.status !== 200) return Toast.info("热门城市数据获取失败");
        // 把热门城市列表添加到cityList数组中
        cityList["hot"] = hotCityListResponse.data.body
        // 把热门城市添加到cityIndex中
        cityIndex.unshift("hot")

        // 调用获取当前城市方法
        let currentCityResponse = await getCurrentCity();
        // console.log(currentCityResponse);
        // 把当前城市添加到cityList的#属性中,属性是一个数组，所以用[]包裹
        cityList["#"] = [currentCityResponse];
        // 把#添加到cityIndex数组中
        cityIndex.unshift("#");
        // 给citiList赋值
        setCityList(cityList)
        // 给cityIndex赋值
        setCityIndex(cityIndex)
        // 关闭Toast提示框
        Toast.hide();
        setResponseDone(true);
    }


    // 封装处理字母索引的方法
    const formatCityIndex = (letter: string) => {
        switch (letter) {
            case '#':
                return '当前定位'
            case 'hot':
                return '热门城市'
            default:
                return letter.toUpperCase()
        }
    }

    // 点击城市后切换为当前城市
    function changeCity({label, value}: { label: string, value: string }) {
        // 因为只有这四个城市才有房源数据，所以判断一下点击的是不是这四个城市
        if (label === "北京" || label === "上海" || label === "广州" || label === "深圳") {
            // 如果是就使用setLocalStoreageItem方法修改localStorage中的数据
            setLocalStoreageItem({label, value})
            props.history.go(-1);
        } else {
            Toast.info(`${label}市目前没有房源`, 1, null, true)
        }
    }

    // 渲染城市列表的方法
    function rowRenderer({
                             key, // Unique key within array of rows
                             index, // Index of row within collection
                             style, // Style object to be applied to row (to position it)
                         }) {
        let cityIndexItem = cityIndex[index]
        return (
            <div key={key} style={style}>
                <div className="city-item">
                    <div className="title">{formatCityIndex(cityIndexItem)}</div>
                    {cityList[cityIndexItem].map(item => (
                        <div key={item.value} className="name" onClick={() => changeCity(item)}>{item.label}</div>
                    ))}
                </div>
            </div>
        );
    }

    // 获取每一组相同城市的总高度
    function getCityHeight({index}) {
        return 36 + 50 * cityList[cityIndex[index]].length;
    }


    // 渲染城市索引列表的方法
    function renderCityIndex() {
        return (
            cityIndex.map((item: any, index: number) => (
                <li key={item} className={"city-index-item"}>
                    <span className={index === activeIndex ? "index-active" : ""} onClick={() => {
                        listRef.current.scrollToRow(index)
                    }}>
                        {item === "hot" ? "热" : item.toUpperCase()}
                    </span>
                </li>
            ))
        )
    };

    // 设置当前高亮的index的方法
    function onRowsRendered({startIndex}) {
        // console.log(startIndex);
        // 判断如果当前高亮索引和滑动到当前的索引不同就给当前高亮索引重新赋值
        if (startIndex !== activeIndex) {
            setActiveIndex((startIndex));
        }
        ;
    }


    return (
        <div className="citylist">
            <NavHeader>城市选择</NavHeader>
            {
                responseDone ?
                    <div className="city-list-component">
                        <AutoSizer>
                            {({height, width}) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={cityIndex.length}
                                    rowHeight={getCityHeight}
                                    rowRenderer={rowRenderer}
                                    ref={listRef}
                                    onRowsRendered={onRowsRendered}
                                    scrollToAlignment={"start"}
                                />
                            )}
                        </AutoSizer>
                        {/* 右侧索引列表 */}
                        <ul className="city-index">{renderCityIndex()}</ul>
                    </div>
                    :
                    <div className={"loading"}>loading...</div>
            }
        </div>
    )
}

export default CityList;