// 引入React相关组件和方法
import * as React from "react";
// 引入antd mobile的Carousel组件
import {Carousel} from "antd-mobile"
// 引入axios网络请求
// import { API } from "../../../../utils/api"
import {axiosGet} from "../../../../utils/axios/requer"
// 引入轮播图请求API
import {homeUseAPI} from "../../../../api/homeApi";
// 引入变量类型文件
import {SwiperItem} from "./type"
import {AxiosResponse} from "axios";
// 引入css样式
import "./index.scss"

function CarouselComp() {
    React.useEffect(() => {
        getSwiperData();
    }, [])
    // 这个hook用来声明图片的高度
    const [imgHeight, setImageHeight] = React.useState<number | string>(176)
    // 这个hook用来判断数据是否获取成功
    const [isFinished, setIsFinished] = React.useState<boolean>(false)
    // 这个hook用来存储轮播图数据
    const [swiperList, setSwiperList] = React.useState<SwiperItem[]>([])

    // 获取轮播图数据方法
    async function getSwiperData() {
        const response: AxiosResponse<any> = await axiosGet(homeUseAPI.carouselDataApi)
        const {data} = response
        if (data.status !== 200) return console.log("轮播图数据获取失败");
        setSwiperList(data.body)
        // 数据获取完成后把是否请求完成改成true
        await setIsFinished(true)
    }

    // 渲染轮播图的方法
    function renderSwiperItem() {
        return swiperList.map(item => (
            <a
                key={item.id}
                href="http://www.baidu.com"
                style={{display: 'inline-block', width: '100%', height: imgHeight}}
            >
                <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt={item.alt}
                    style={{width: '100%', verticalAlign: 'top'}}
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        setImageHeight('auto')
                    }}
                />
            </a>
        ))
    }

    return (
        <div className="Carousel">
            {/* 
                    轮播图中直接使用a标签包裹图片
                */}
            {
                isFinished ?
                    <Carousel autoplay infinite dots={true}>
                        {isFinished && renderSwiperItem()}
                    </Carousel>
                    :
                    <div className={"undone"}>轮播图获取失败</div>
            }
        </div>
    );
}

export default CarouselComp;