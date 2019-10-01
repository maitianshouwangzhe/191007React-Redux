import React, {Component} from 'react'
import {
    Form,
    Icon,
    Input,
    Button,
} from 'antd';
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";

import './login.less'
import logo from '../../assets/images/logo.png'
import {login} from "../../redux/action"


// 登录的路由组件
class Login extends Component{


    // 事件回调函数需要event
    handleSubmit =(e) => {
        // 由于点击登录后，会提交表单，需阻止事件的默认行为
        e.preventDefault()
        // this.props.form得到强大的form对象，
        // 对表单中所有的字段进行校验，
        // 获取表单项中的输入值，其中values是对象，不是数组
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 收集数据
                const {username, password} = values
                // 调用分发异步action的函数， 即发登录的异步请求，有了结果后就更新状态
                this.props.login(username, password)
                // console.log('调用分发异步action的函数 ', values);
            }
        })
    }

    validatePwd = (rule, value, callback) => {
        if (!value){
            callback('密码必须输入')
        } else if (value.length<4){
            callback('密码长度不能小于4位')
        } else if (value.length >=12){
            callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须由英文、数字和下划线组成')
        } else {
            callback()
        }
    }

    render() {

        // 如果已经登录，则自动跳转到管理页面
        const user = this.props.user
        if (user && user._id){
            return <Redirect to='/home'/>
        }
        // 得到form对象
        const form = this.props.form
        // 得到getFieldDecorator
        const { getFieldDecorator } = form;
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo'/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>
                        {user.errorMsg}
                    </div>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace:true, message: '请输入用户名' },
                                    { min: 4, message: '用户名至少4为' },
                                    { max: 12, message: '用户名最多12位' },
                                    {pattern:/^[a-zA-Z0-9_]+$/, message:'用户名必须是英文、数字或下划线组成'}
                                    ],
                                    // initialValue:'admin'
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {validator: this.validatePwd}
                                        ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"

                                    />,
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}


const WrapLogin = Form.create()(Login)
export default connect(
    state => ({user: state.user}),
    {login}
)(WrapLogin)