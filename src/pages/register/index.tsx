import { useState } from "react";
import { useNavigate } from "react-router";
import style from "./index.module.css"
import { userRegister } from "../../api/user";
import { Input, Button, Form, Toast, Space } from "antd-mobile"


const Login = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm<{ username: string, password: string }>()
    const [loginLoading, setLoading] = useState(false)
    const register = async () => {
        setLoading(true)
        const values = form.getFieldsValue()
        try {
            const result = await userRegister(values)
            if (result.data.data) {
                login()
                Toast.show({
                    icon: 'success',
                    content: '注册成功',
                })
            } else {
                Toast.show({
                    icon: 'error',
                    content: '注册失败',
                })
            }
        } catch (error) {
            Toast.show({
                icon: 'fail',
                content: '注册失败',
            })
        } finally {
            setLoading(false)
        }
    }
    const login = () => {
        navigate("/login")
    }
    return (
        <section className={style.content}>
            <p className={style.navtext}>注册</p>
            <p className={style.logo}>SHAN CHAT</p>
            <Form className={style.section} form={form}>
                <Form.Item name='username' label='用户名' rules={[{ required: true }]}>
                    <Input className={style.input} placeholder='请输入用户名' />
                </Form.Item>
                <Form.Item name='password' label='密码' rules={[{ required: true }]}>
                    <Input className={style.input} placeholder='请输入密码' />
                </Form.Item>
            </Form>
            <section className={style.section}>
                <Space direction='vertical'>
                    <Button block color='primary' size='large' loading={loginLoading} onClick={register}>
                        注册
                    </Button>
                    <Button block color='default' size='large' onClick={login}>
                        去登录
                    </Button>
                </Space>
            </section>
        </section>
    )
}

export default Login