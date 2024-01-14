import { useState } from "react";
import { useNavigate } from "react-router";
import style from "./index.module.css"
import { getUserInfo, userLogin } from "../../api/user";
import { Input, Button, Form, Toast, Space } from "antd-mobile"
import { useDispatch } from "react-redux";
import { setToken, setUserInfo } from "../../store/reducer/userReducer";


const userInfo = async (dispatch) => { 
    try{
        const result = await getUserInfo()
        dispatch(setUserInfo(result.data.data))
    }catch(error){
        console.log(error)
    }
}

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = Form.useForm<{ username: string, password: string }>()
    const [loginLoading, setLoading] = useState(false)
    const login = async () => {
        setLoading(true)
        const values = form.getFieldsValue()
        try {
            const result = await userLogin(values)
            const token: string = result.data.data
            if (token) {
                dispatch(setToken(token))
                userInfo(dispatch)
                navigate("/")
                Toast.show({
                    icon: 'success',
                    content: '登录成功',
                })
            } else {
                Toast.show({
                    icon: 'error',
                    content: '登录失败',
                })
            }
        } catch (error) {
            Toast.show({
                icon: 'fail',
                content: '登录失败',
            })
        } finally {
            setLoading(false)
        }
    }
    const register = () => {
        navigate("/register")
    }
    return (
        <section className={style.content}>
            <p className={style.navtext}>登录</p>
            <p className={style.logo}>SHAN CHAT</p>
            <Form className={style.section} form={form}>
                <Form.Item name='username' label='用户名' rules={[{ required: true }]}>
                    <Input className={style.input} placeholder='请输入用户名' />
                </Form.Item>
                <Form.Item name='password' label='密码' rules={[{ required: true }]}>
                    <Input className={style.input} type="password" placeholder='请输入密码' />
                </Form.Item>
            </Form>
            <section className={style.section}>
                <Space direction='vertical'>
                    <Button block color='primary' size='large' loading={loginLoading} onClick={login}>
                        登录
                    </Button>
                    <Button block color='default' size='large' onClick={register}>
                        注册
                    </Button>
                </Space>
            </section>
        </section>
    )
}

export default Login