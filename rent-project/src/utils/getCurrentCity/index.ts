// 引入请求方法
import {axiosGet} from "../../utils/axios/requer"
// 引入请求地址
import {areaUseApi} from "../../api/homeApi"
// 引入获取、设置localStoreage方法
import {getLocalStoreageItem, setLocalStoreageItem} from "../../utils/myLocalStoreage"

export const getCurrentCity = () => {
    // 获取local Storage中的数据
    let currentCity = getLocalStoreageItem()

    if (!currentCity) {
        return new Promise((resolve, reject) => {
            // 获取ip经纬度
            let myCity = new BMap.LocalCity();
            // 获取ip城市地址发起请求
            myCity.get(async (result) => {
                let response = await axiosGet(areaUseApi.cityNameDataApi, {
                    name: result.name
                });
                // 结构data数据
                let {data} = response
                // 判断是否获取到
                if (data.status === 200) {

                    setLocalStoreageItem(data.body)
                    resolve(data.body)
                }
            })
        })
    } else {
        return Promise.resolve(currentCity)
    }
}