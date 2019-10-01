/*
action对象：

有同步的action、异步的action之分
同步的action， 返回的为对象；
异步的action， 返回的是
*/

import {SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from "./action-types";
import {reqLogin} from "../api";
// import {message} from "antd";
import storageUtils from "../utils/storageUtils";


// 设置当前头部标题的同步action
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})


// 接收用户的同步action
export const receiveUser = (user) => ({type: RECEIVE_USER, user})


// 显示错误信息的同步action
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})




// 登录的异步action
export const login = (username, password) => {
    return async dispatch => {
        // 1、执行异步ajax代码
        const result = await reqLogin(username, password)
        // 2.2、如果发送请求成功，dispatch一个同步的action
        if (result.status===0){
            const user = result.data
            // 将user保存在local storage中
            storageUtils.saveUser(user)
            // 这句代码，将user存储到状态内存里面
            dispatch(receiveUser(user))
        } else {
            // 2.2、如果发送请求失败
            const msg = result.msg
            // message.error(msg)
            dispatch(showErrorMsg(msg))
        }
    }
}

// 退出登录的同步action
export const quit = () => {
    // 清空local storage存储的user， 不清空， 一旦刷新就自动登录了       /*   对user的操作全部在redux里面操作     */
    storageUtils.removeUser()
    // 返回action对象
    return {type: RESET_USER, }
}
