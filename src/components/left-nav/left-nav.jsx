import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import {connect} from 'react-redux'

import './left-nav.less'
import logo from '../../assets/images/logo.png'
import menuList from "../../config/menuConfig";
import {setHeadTitle} from "../../redux/action";

const { SubMenu } = Menu;
// 左侧导航组件
class LeftNav extends Component{

    // 判断当前登录用户对item是否有权限
    hasAuth = (item) => {
        const {key, isPublic} = item
        // （在内存中）得到当前登录用户的信息， 如取出menus
        const menus = this.props.user.role.menus
        const username = this.props.user.username
        // 分多种情况进行讨论：
        // 第 1 种情况： 当前用户为admin
        // 第 2 种情况： 如果当前item是公开的
        // 第 3 种情况： 当前用户有此item的权限， 即：判断key是否存在menus中。若有，则显示。
        if (username === 'admin' ||  isPublic  ||  menus.indexOf(key) !== -1) {    /*  若有子项，无法匹配    */
            return true
        } else if (item.children) {
            // 第 4 种情况： 当前用户有此item的某个子item的权限， 即：判断某个子item的key是否存在menus中。若有，则显示。
            return !! item.children.find(  child => menus.indexOf(child.key !== -1)  )
        }
        return false
    }

    // 第二种办法，生成对应的标签数组
    // 采用reduce + 递归的方法
    getMenuNodes2 = (menuList) => {
        // 取当前的路径
        const path = this.props.location.pathname
        console.log(path)
        return menuList.reduce((pre, item) => {
            // 如果当前用户对item对应的权限，则才需要添加对应的菜单项目。否则不添加
            if (this.hasAuth(item)) {
                if (!item.children){
                    // 判断item是否为当前对应的item（解决： 刷新后标题出错的bug）
                    if (item.key === path || path.indexOf(item.key) === 0){
                        // 更新redux中setHeadTitle的状态
                        this.props.setHeadTitle(item.title)
                    }
                    // 解决从根目录访问，出现标题不能显示的bug
                    if (path === '/'){
                    this.props.setHeaderTitle('首页')
                    }
                    // 向pre里面添加<Menu.Item >
                    // push有两个括号：第一个小括号表示函数调用，第二个表示返回一个对象
                    pre.push((
                        <Menu.Item key={item.key} onClick={() => this.props.setHeadTitle(item.title)}>
                            <Link to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {
                    // 查找一个与当请求路径匹配的子item
                    //原先的代码为： const cItem = item.children.find( cItem => cItem.key===path)
                    const cItem = item.children.find( cItem => path.indexOf(cItem.key) === 0)
                    // 如果存在cItem，则当前item的列表需要展开，即可以查看子项
                    if (cItem) {
                        this.openKey = item.key
                    }
                    // 向pre里面添加<subMenu>
                    pre.push((
                        <SubMenu key={item.key}
                                 title={
                                     <span>
                                     <Icon type={item.icon} />
                                     <span>{item.title}</span>
                                 </span>
                                 }
                        >
                            {
                                this.getMenuNodes2(item.children)       /*  不断递归调用直到结束   */
                            }
                        </SubMenu>
                    ))
                }
            }
            return pre
        }, [])
    }
    // 在render渲染之前就执行
    // 为第一render执行之前准备数据（必须是同步的）
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes2(menuList)
    }

    render() {
        // 取当前请求的路由路径
        // Admin是路由组件，而left-nav是非路由组件，怎么传递数据？
        // 使用withRouter
        let path = this.props.location.pathname
        // 得到/product的下标index
        // 如路由: '/product/detail', 则此时/product的下标记为0
        // 如路由: ' /home ' ，则此时/product没有匹配，则计算得到的值为-1
        // 如果路由：'/a/product', 则此时返回值为2，[注：/为0， a为1， /product为2]
        if (path.indexOf('/product')===0){
            path = '/product'
        }
        // 得到需要打开的菜单项的key
        const openKey = this.openKey
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt='logo'/>
                    <h1>React项目</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}


// withRouter是高阶组件，
// 功能：包装非路由组件，返回一个新的组件，
// 该新组件可以向非路由组件传递3个属性，有：history, location, match

export default connect(
    state => ({user: state.user}),
    {setHeadTitle}
)(withRouter(LeftNav))
