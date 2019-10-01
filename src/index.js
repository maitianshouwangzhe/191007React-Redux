/*

入口js文件, 一开始运行就执行

 */

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from "./App";
import store from "./redux/store";



ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'))