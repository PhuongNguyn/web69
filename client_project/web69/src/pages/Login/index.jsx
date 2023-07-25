import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../services';
import {useDispatch} from 'react-redux'
import {Link} from "react-router-dom"
import HeaderLogin from '../../components/HeaderLogin';

const Login = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        try {
            const username = form.getFieldValue("username")
            const password = form.getFieldValue("password")

            const result = await login(username, password)

            dispatch({type: "LOGIN", payload: result.data.user})

        } catch (error) {
            console.log(error)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    

    return (
        <div className='' style={{ marginTop: '20px' }}>
            <HeaderLogin />
            <Link to='/app/dashboard'>test</Link>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Login;