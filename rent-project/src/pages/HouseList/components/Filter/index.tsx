import * as React from "react";
import {useEffect, useState} from "react";
import {Toast} from "antd-mobile"
import "./index.scss"

//引入FilterTitle组件
import FilterTitle from "../FilterTitle/index"
import {axiosGet} from '../../../../utils/axios/requer';
import {homeUseAPI, houseUseApi} from "../../../../api/homeApi";
import {getLocalStoreageItem} from "../../../../utils/myLocalStoreage";
import {
    FilterDataInterface,
    initPickerViewData,
    SelectedValuesInterface,
    TitleSelectedStatusInterface
} from "./interface";
import FilterPicker from "../FilterPicker";
// 导入 Spring 组件
import {Spring} from 'react-spring/renderprops'
// 引入FilterMore组件
import FilterMore from "../FilterMore/index.jsx"

function Filter({onFilter}: { onFilter: any }) {
    //初始化页面Hook
    useEffect(() => {
        // 初始化页面时调用获取PickerView数据的方法
        getPickerViewData();

    }, [])


    // 存储当前城市下区级筛选数据
    const [pickerViewData, setPickerViewData] = useState<initPickerViewData>({
        // FilterMore
        roomType: [],
        oriented: [],
        floor: [],
        characteristic: [],
        // FilterPicker
        area: {},
        subway: {},
        rentType: [],
        price: []
    });
    // 存储子元素点击了哪个筛选功能
    const [pickerViewType, setPickerViewType] = useState<string>("");

    // 存储筛选组件的默认值
    const [selectedValues, setSelectedValues] = useState<SelectedValuesInterface>({
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
        more: []
    })
    // 控制筛选按钮是否高亮的hook
    const [titleSelectedStatus, setTitleSelectedStatus] = useState<TitleSelectedStatusInterface>({
        area: false,
        mode: false,
        price: false,
        more: false
    })

    // 获取当前城市方法
    async function getPickerViewData() {
        // 调用获取当前城市方法
        let currentCityRes: any = getLocalStoreageItem();
        // 解构出当前城市的id
        let {value}: { label: string, value: string } = currentCityRes;
        // 发起请求获取PickerView数据
        let getPickerViewDataRes: any = await axiosGet(houseUseApi.houseCondition, {
            id: value
        });
        // 解构出我们需要的数据
        let {body, status} = getPickerViewDataRes.data;
        // 判断数据是否获取成功
        if (status !== 200) return Toast.info("筛选数据获取失败");
        // 把获取到的数据添加到
        setPickerViewData(body);
    }

    // 传给子组件的方法，如果子组件点击了pickerView组件就调用父组件中的方法
    function handleShowPickerView(type: string) {
        // 解构titleSelectedStatus
        let newTitleSelectedStatus = {...titleSelectedStatus};
        // 循环遍历titleSelectedStatus的键
        Object.keys(titleSelectedStatus).forEach(item => {
            let selectedVal = selectedValues[item];
            if (type === item) {
                newTitleSelectedStatus[item] = true;
            } else if (item === "area" && (selectedVal.length === 3 || selectedVal[0] !== "area")) {
                newTitleSelectedStatus[item] = true;
            } else if (item === "mode" && selectedVal[0] !== "null") {
                newTitleSelectedStatus[item] = true;
            } else if (item === "price" && selectedVal[0] !== "null") {
                newTitleSelectedStatus[item] = true;
            } else newTitleSelectedStatus[item] = item === "more" && selectedVal.length !== 0;
        })
        // 更新type
        setPickerViewType(type)
        // 把新对象赋值给titleSelectedStatus
        setTitleSelectedStatus(newTitleSelectedStatus);
    };


    // 渲染遮罩层方法
    function renderMask() {
        const isHide = pickerViewType === "more" || pickerViewType === "";
        return (
            <Spring from={{opacity: 0}} to={{opacity: isHide ? 0 : 1}}>
                {props => {
                    // 说明遮罩层已经完成动画效果，隐藏了
                    if (props.opacity === 0) {
                        return null
                    }

                    return (
                        <div
                            style={props}
                            className={"mask"}
                            onClick={() => onCancel(pickerViewType)}
                        />
                    )
                }}
            </Spring>
        )
    }

    function renderPickerView() {
        // 解构出pickerViewData中的数据
        let {area, subway, rentType, price}: initPickerViewData = pickerViewData;

        if (pickerViewType !== "area" && pickerViewType !== "mode" && pickerViewType !== "price") {
            return null;
        }

        // 定义一个新数组，存储要渲染的数据
        let data = [];
        // pickerView组件的cols
        let cols: number = 3;
        let selected = selectedValues[pickerViewType]
        switch (pickerViewType) {
            case "area":
                data = [area, subway]
                cols = 3
                break;
            case "mode":
                data = rentType
                cols = 1
                break;
            case "price":
                data = price
                cols = 1
                break;
            default :
                break;
        }

        return (
            <div className={"picker-view"}>
                {
                    <FilterPicker key={pickerViewType} data={data} defaultValues={selected} cols={cols}
                                  type={pickerViewType} onOk={onOk} onCancel={onCancel}></FilterPicker>
                }
            </div>
        );
    };

    function onCancel(type) {
        // 解构titleSelectedStatus
        let newTitleSelectedStatus = {...titleSelectedStatus};
        // 循环遍历titleSelectedStatus的键
        Object.keys(titleSelectedStatus).forEach(item => {
            let selectedVal = selectedValues[item];
            if (item === "area" && (selectedVal.length === 3 || selectedVal[0] !== "area")) {
                newTitleSelectedStatus[item] = true;
            } else if (item === "mode" && selectedVal[0] !== "null") {
                newTitleSelectedStatus[item] = true;
            } else if (item === "price" && selectedVal[0] !== "null") {
                newTitleSelectedStatus[item] = true;
            } else newTitleSelectedStatus[item] = item === "more" && selectedVal.length !== 0;
        })
        // 隐藏PickerView
        setPickerViewType("");
        // 把新对象赋值给titleSelectedStatus
        setTitleSelectedStatus(newTitleSelectedStatus);
    }

    // 点击筛选的确定按钮的方法
    function onOk(type: string, value: string) {
        // 解构titleSelectedStatus
        let newTitleSelectedStatus = {...titleSelectedStatus};
        let selectedVal = value;
        if (type === "area" && (selectedVal.length !== 2 || selectedVal[0] !== "area")) {
            newTitleSelectedStatus[type] = true;
        } else if (type === "mode" && selectedVal[0] !== "null") {
            newTitleSelectedStatus[type] = true;
        } else if (type === "price" && selectedVal[0] !== "null") {
            newTitleSelectedStatus[type] = true;
        } else newTitleSelectedStatus[type] = type === "more" && selectedVal.length !== 0;


        // 声明新对象接收旧数据
        let newSelectedValues = {...selectedValues, [type]: value};
        let {area, mode, price, more} = newSelectedValues;
        // 组装数据的对象
        let filterData: FilterDataInterface = {
            area: "",
            mode: "",
            price: "",
            more: ""
        };
        // area的键，直接去area中的第一个值当作键，第一个值是 "area"
        const areaKey = area[0];
        // 声明变量为空作为area的初始值
        let areaValue = "null";
        if (area.length === 3) {
            // 判断一下如果area数组中的三个值如果是null，那么就取第二个值
            areaValue = area[2] === "null" ? area[1] : area[2];
        }
        // 把组装好的数据存储到存储组装数据的对象中 filterData
        filterData[areaKey] = areaValue;
        // 组装mode数据
        filterData.mode = mode[0];
        // 组装price数据
        filterData.price = price[0]
        // 组装more数据,more是一个字符串数组，使用join方法用逗号拼接数组中的每个元素
        filterData.more = more.join(",");
        // 把数据返回给父组件，再父组件中获取数据
        onFilter(filterData);


        // 把新对象赋值给selectedValues
        setSelectedValues(newSelectedValues);
        // 修改type
        setPickerViewType("");
        // 把新对象赋值给titleSelectedStatus
        setTitleSelectedStatus(newTitleSelectedStatus);
    }

    // 渲染more组件的方法
    function renderFilterMore() {
        let {roomType, oriented, floor, characteristic} = pickerViewData;
        let data = {roomType, oriented, floor, characteristic}
        return (
            <div>
                <FilterMore data={data} onOk={onOk} onCancel={onCancel} type={pickerViewType}
                            defaultValue={selectedValues.more}></FilterMore>
            </div>
        )
    };

    return (
        <div className={"Filter"}>
            <div className={"content"}>
                <FilterTitle titleSelectedStatus={titleSelectedStatus} onClick={handleShowPickerView}></FilterTitle>

                {/* 渲染筛选标题 */}
                {renderPickerView()}


            </div>

            {/* 渲染遮罩层 */}
            {renderMask()}

            {/*渲染FilterMore组件*/}
            {renderFilterMore()}
        </div>
    )
}

export default Filter;