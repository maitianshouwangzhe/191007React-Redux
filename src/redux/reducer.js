import {combineReducers} from "redux";

import {
    RECEIVE_USER,
    SET_HEAD_TITLE, SHOW_ERROR_MSG, RESET_USER
} from "./action-types";
import storageUtils from "../utils/storageUtils";



// 用来管理头部标题的reducer函数
// 设置初始值为 ' '
const initHeadTitle = ''
function headTitle(state = initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}


// 用来管理当前登录用户的reducer函数
// 当前登录用户的信息，在localStorage里面
const initUser = storageUtils.getUser()
function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case RESET_USER:
            return {}
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            // 不要直接修改状态的数据
            // 初始状态为空对象，在storageUtils里面
            // 在原本状态的基础上，添加一个属性。使用...state
            return {...state, errorMsg}
        default:
            return state
    }
}




// 向外默认暴露的是合并产生的总的reducer函数
// 管理着总的state的结构为对象。
export default combineReducers( {
    headTitle,
    user,
})