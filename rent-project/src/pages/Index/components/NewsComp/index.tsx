import * as React from "react";
// 引入css样式
import "./index.scss"
// 引入Flex组件
import {Flex} from "antd-mobile"
// 引入axios
// import { API } from "../../../../utils/api"
// 引入请求方法
import {axiosGet} from "../../../../utils/axios/requer"
// 引入axios请求类型
import {AxiosResponse} from "axios"
// 引入请求地址API
import {homeUseAPI} from "../../../../api/homeApi"
// 引入变量类型
import {NewsData} from "./type"

function NewsComp() {
    React.useEffect(() => {
        // 初始化页面时发起请求
        getNewsData();
    }, [])

    // 这个hook用来存储资讯数据
    const [newsData, setNewsData] = React.useState<NewsData[]>([])

    // 获取资讯数据方法
    async function getNewsData() {
        const response: AxiosResponse<any> = await axiosGet(homeUseAPI.NewsDataApi);

        const {data} = response;

        if (data.status !== 200) return console.log("资讯数据请求失败");
        setNewsData(data.body)
    }

    function renderNews() {
        return (
            <React.Fragment>
                {
                    newsData.map(item => (
                        <Flex key={item.id} justify="between" className="news_item">
                            <img className="news_item_img" src={`http://localhost:8080${item.imgSrc}`} alt=""/>
                            <Flex justify="between" direction="column" className="news_item_right">
                                <h5 className="item_text_title">{item.title}</h5>
                                <Flex justify="between" direction="row" className="days">
                                    <span>{item.from}</span>
                                    <span>{item.date}</span>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))
                }
            </React.Fragment>
        )
    }

    return (
        <div className="news">
            {/* 标题 */}
            <h5 className="title">
                最新资讯
            </h5>
            <div className="news_content">
                {/* 资讯内容 */}
                {renderNews()}
            </div>
        </div>
    )
}

export default NewsComp;