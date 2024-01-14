import { Button, Form, Input, Popup, Toast } from "antd-mobile"
import React from "react"
import { AddOutline } from 'antd-mobile-icons'
import { addFriend, getUserInfo } from "../../api/user"
import { useDispatch } from "react-redux"
import { setUserInfo } from "../../store/reducer/userReducer"

const AddFriend: React.FC<{ show: boolean, onClose: () => void }> = (props) => {
    const [form] = Form.useForm<{ username: string }>()
    const dispatch = useDispatch()
    const hanleAddFriend = async () => {
        const values = form.getFieldsValue()
        console.log(values)
        try{
            const result = await addFriend(values.username)
            if(result.data.data){
                Toast.show({
                    icon: 'success',
                    content: '添加成功',
                })
                const res = await getUserInfo()
                dispatch(setUserInfo(res.data.data))
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Popup
            visible={props.show}
            showCloseButton
            onClose={props.onClose}
            position='top'
        >
            <Form layout='horizontal' form={form} style={{ marginBottom: "4vh" }}>
                <Form.Item
                    name="username"
                    rules={[{ required: true }]}
                >
                    <Input placeholder='请输入要添加的用户名' clearable />
                </Form.Item>
                <Form.Item>
                    <Button block onClick={hanleAddFriend}>
                        <span>添加</span>
                        <AddOutline />
                    </Button>
                </Form.Item>
            </Form>
        </Popup>
    )
}

export default AddFriend