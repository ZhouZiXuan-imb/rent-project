import * as React from 'react'
// 引入axios
// import { API } from "../../../../utils/api"
import {axiosGet} from "../../../../utils/axios/requer"
// 引入请求API
import {homeUseAPI} from "../../../../api/homeApi"
// 引入antd mobile的Flex组件
import {Flex, Grid, Toast} from "antd-mobile"
// 引入css样式
import "./index.css"
// 引入axios请求类型
import {AxiosResponse} from "axios"

function Groups() {
    // 初始化页面时调用获取租房小组数据方法
    React.useEffect(() => {
        getGroupsData();
    }, [])

    // 这个hook用来存储租房小组数据
    const [groupsList, setGroupsList] = React.useState([])

    // 获取租房小组数据方法
    async function getGroupsData() {
        const response: AxiosResponse<any> = await axiosGet(homeUseAPI.rentalTeamDataApi)

        const {data} = response
        if (data.status !== 200) return Toast.fail("租房小组数据获取失败", 2)

        // 赋值
        setGroupsList(data.body)
    }

    return (
        <div className="group">
            <h4 className="group_title">租房小组 <span className="more">更多</span></h4>
            {/* 宫格组件 */}
            <Grid
                data={groupsList}
                columnNum={2}
                hasLine={false}
                square={false}
                renderItem={(item) => (
                    <Flex className="group-item" justify={"around"} key={item.id}>
                        <div className="left">
                            <p className="group-title">{item.title}</p>
                            <span className="group-info">{item.desc}</span>
                        </div>
                        <img className="group-img" src={`http://localhost:8080${item.imgSrc}`} alt=""/>
                    </Flex>
                )}
            />
            {/* <Flex wrap="wrap">
                {
                    groupsList.map(item => (
                        // <Flex.Item className="inline"></Flex.Item>
                        <div key={item.id} className="inline">

                        </div>
                    ))
                }
            </Flex> */}
        </div>
    )
}

export default Groups;