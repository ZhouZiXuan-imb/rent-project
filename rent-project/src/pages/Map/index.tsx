import * as React from "react";
import {useEffect, useState} from "react";
import NavHeader from "../../components/NavHeader";
// 引入获取当前地址方法
import {axiosGet} from "../../utils/axios/requer"
import {areaUseApi, houseUseApi} from "../../api/homeApi"
// 引入样式
import "./index.scss"
// 引入Toast组件
import {Toast} from "antd-mobile"
// 引入接口
import {CurrentCityHousInterface, RenderHouseItemInterface} from "./interface";
// 引入获取localStorage数据的方法
import {getLocalStoreageItem} from "../../utils/myLocalStoreage";
// 引入HouseItem组件
import HouseItem from "../../components/HouseItem"

const labelStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255, 0, 0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
}

function MapComp() {
    // 声明控制存储小区级的房源数据的hook
    const [isShow, setIsShow] = useState(false)
    // 声明存储房源列表数据的hook
    const [houseList, setHouseList] = useState<any>([]);

    useEffect(() => {
        initMap();
    }, [])

    // 定义方法接收map
    let map2;

    function initMap() {
        // // 通过new操作符可以创建一个地图实例
        const map = new BMap.Map("container");
        // 下面的函数中会用到map，所以在外面定义变量接收map
        map2 = map
        // // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
        const point = new BMap.Point(118.2754, 33.9619);
        // // 地图初始化，同时设置地图展示级别
        map.centerAndZoom(point, 11);

        // 获取当前选择城市
        let currentCityRes: any = getLocalStoreageItem();
        const {label, value}: { label: string, value: string } = currentCityRes

        //创建地址解析器实例
        let myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(label, async (point) => {
            if (point) {
                // 初始化地图
                map.centerAndZoom(point, 11);
                // 添加地图控件
                // 添加比例尺控件
                map.addControl(new BMap.ScaleControl());
                // 添加平移缩放控件
                map.addControl(new BMap.NavigationControl())

                // 遍历每一项数据
                renderLabel(value);
            }
        }, label)

        // 给地图添加移动事件,移动后隐藏房屋列表数据
        map2.addEventListener("movestart", () => {
            setIsShow(false);
        })
    }

    // 封装渲染覆盖物的方法
    function getTypeAndZoom(): object {
        // 获取当前市第几级
        const zoom = map2.getZoom();
        let nextZoom: number, type: string;
        // 如果点击的时候缩放等级为11
        if (zoom > 10 && zoom < 12) {
            // 那么就让缩放等级为13  让地图变大
            nextZoom = 13;
            // 设置类型为圆形标注物
            type = "circle";
        } else if (zoom > 12 && zoom < 14) {
            nextZoom = 15;
            type = "circle";
        } else if (zoom > 14 && zoom < 16) {
            type = "rect";
        }
        return {
            type,
            nextZoom
        }
    }

    async function renderLabel(id) {
        // 请求前让loading组件显示
        Toast.loading("房源数据加载中...", 0)
        // 获取当前城市下的所有房源信息
        const currentCityHousRes: any = await axiosGet(areaUseApi.currentCityHouse, {
            id
        });
        // 请求到数据后让loading组件隐藏
        Toast.hide();
        // 解构出我们需要的数据
        let {body, status}: { body: any, status: number } = currentCityHousRes.data;
        if (status !== 200) return Toast.info("房源信息获取失败");
        // 移动地图时，把房源列表改为不显示 fasle
        let {type, nextZoom}: any = getTypeAndZoom();
        body.forEach((item: CurrentCityHousInterface) => {
            // 调用创建文本标注的方法
            createLabel(item, type, nextZoom)
        })
    }

    // 封装创建文本标注的方法


    function createLabel(item, type, zoom): void {
        // 解构出我们需要的数据
        let {coord: {longitude, latitude}, count, label, value} = item;
        // 初始化坐标
        const areaPoint = new BMap.Point(longitude, latitude);
        if (type === "circle") {
            // 调用创建圆形文本标注方法
            createCircle(areaPoint, label, count, zoom, value);
        } else if (type === "rect") {
            createSquare(areaPoint, label, count, value);
        }
        ;
    };

    // 封装创建市、县级文本标注的方法
    function createCircle(areaPoint: any, label: string, count: number, zoom: number, value?: string): void {
        const options: { position: any, offset: any } = {
            position: areaPoint, // 指定文本标注所在的地理位
            offset: new BMap.Size(-35, -35) //设置文本偏移量
        }
        const content: string = ""
        const textLabel: any = new BMap.Label(content, options)
        // 设置房源覆盖物内容
        textLabel.setContent(`
              <div class="bubble">
                <p class="label">${label}</p>
                <p>${count}套</p>
              </div>
            `)
        // 添加房源覆盖物眼视光hi
        textLabel.setStyle(labelStyle);
        // 给覆盖物添加点击事件
        textLabel.addEventListener("click", () => {
            setTimeout(() => {
                // 每次点击获取数据之前清除之前的数据
                map2.clearOverlays();
            }, 0)

            // 调用渲染文本标注方法
            renderLabel(value)

            // 初始化百度地图的中心点和缩放级
            map2.centerAndZoom(areaPoint, zoom)
        })
        // 把覆盖物添加到地图中
        map2.addOverlay(textLabel);
    }

    // 创建方形文本标注物
    function createSquare(areaPoint: any, label: string, count: number, value: string): void {
        // 创建覆盖物
        const options: { position: any, offset: any } = {
            position: areaPoint,
            offset: new BMap.Size(-50, -28)
        }
        const content: string = ""
        const textLabel: any = new BMap.Label(content, options)
        // 设置房源覆盖物内容
        textLabel.setContent(`
          <div class="rect">
            <span class="housename">${label}</span>
            <span class="housenum">${count}套</span>
            <i class="arrow"></i>
          </div>
        `)
        // 添加房源覆盖物眼视光hi
        textLabel.setStyle(labelStyle);
        // 给覆盖物添加点击事件
        textLabel.addEventListener("click", (e) => {
            const {clientX, clientY} = e.changedTouches[0];
            map2.panBy((window.innerWidth / 2) - clientX, ((window.innerHeight - 330) / 2) - clientY);

            // 让房源信息显示
            setIsShow(true)
            // 调用获取房源列表信息的方法
            getHouseList(value)
        })
        // 把覆盖物添加到地图中
        map2.addOverlay(textLabel);
    }

    // 获取房源列表数据方法
    async function getHouseList(value: string) {
        Toast.loading("房源数据加载中...");
        // 点击小区级文本标注后，获取房源数据
        const houseRes = await axiosGet(houseUseApi.houseListApi, {
            cityId: value
        });
        Toast.hide();
        // 解构出数据和状态
        const {body, status} = houseRes.data;
        // 判断状态是否为接收成功
        if (status !== 200) Toast.info("房源信息获取失败")
        // 把数据存储到houseList中
        setHouseList(body.list);
    }

    // 渲染房源列表方法
    function renderHouse() {
        // 渲染房源列表
        return houseList.map((item) => {
            let {desc, houseCode, houseImg, price, tags, title}: RenderHouseItemInterface = item;
            return <HouseItem key={houseCode} desc={desc} houseImg={houseImg} price={price} tags={tags} title={title}/>
        });
    }

    return (
        <div className="map">
            <NavHeader>地图找房</NavHeader>
            <div id="container">

            </div>
            <div className={['houseList', isShow ? 'show' : ""].join(' ')}>
                <div className="titleWrap">
                    <h1 className="listTitle">房屋列表</h1>
                    <a className="titleMore" href="/house/list">
                        更多房源
                    </a>
                </div>
                <div className="houseItems">
                    {renderHouse()}
                </div>
            </div>
        </div>
    )
};


export default MapComp;