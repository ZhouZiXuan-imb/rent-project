import {NavBar} from "antd-mobile";
import * as React from "react";
import {withRouter} from "react-router-dom"

function NavHeader({children, history}: { children: string, history: any }) {
    return (
        <NavBar
            className={"nav-bar"}
            mode="light"
            icon={<i className="iconfont icon-back" style={{color: "#999", fontSize: "16px"}}></i>}
            // 点击之后返回上一级页面
            onLeftClick={() => history.goBack(1)}
            rightContent={[]}
        >
            {children}
        </NavBar>
    )
}

export default withRouter(NavHeader);

