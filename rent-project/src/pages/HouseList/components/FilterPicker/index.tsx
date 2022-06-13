import * as React from "react";
import {useState} from "react";
import {PickerView} from "antd-mobile";
//引入FilterMore组件
import FilterFooter from "../../../../components/FilterFooter/index.jsx"

function FilterPicker({
                          defaultValues,
                          data,
                          cols,
                          type,
                          onOk,
                          onCancel,
                      }: { defaultValues: Array<any>, data: Array<any>, cols: number, type: string, onOk: any, onCancel: any }) {
    const [value, setValue] = useState<Array<any>>(defaultValues);

    function handleChange(val) {
        setValue(val)
    }

    return (
        <>
            {/*  PikerView组件  */}
            <PickerView value={value} data={data} cols={cols} onChange={handleChange}></PickerView>

            {/* 确定按钮 */}
            {/*<div onClick={() => onOk(type, value)}>确定</div>*/}
            <FilterFooter onOk={() => onOk(type, value)} onCancel={() => onCancel(type)}></FilterFooter>
        </>
    )
}

export default FilterPicker;