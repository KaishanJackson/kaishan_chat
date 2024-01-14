import { Form, Input, List } from "antd-mobile"
import { globalContext } from "../../context"
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

const Chat = () => {
    const [form] = Form.useForm<{ message: string }>()
    const [list, setList] = useState<{ name: string, message: string }[]>([])
    const location = useLocation()
    const username = useSelector((state: RootState) => state.user.info.userInfo.username)
    const { sendMessage, listen } = useContext(globalContext)
    useEffect(() => {
        listen((data: { message: string, to: string, from: string }) => {
            console.log(data)
            const messageList = list.map((event) => event)
            console.log(messageList)
            messageList.push({ message: data.message, name: data.from })
            console.log(messageList)
            setList(messageList)
            console.log(list)
        })
    }, [])
    const handleSendMessage = () => {
        const values = form.getFieldsValue()
        sendMessage({
            to: location.state.friend,
            message: values.message,
            from: username
        })
        form.resetFields()
        const messageList = list.map((event) => event)
        messageList.push({ message: values.message, name: username })
        setList(messageList)
    }
    return (
        <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: "100%" }}>
            <div style={{ flex: 1 }}>
                {list.map((user, index) => (
                    <List.Item
                        key={index}
                        description={user.message}
                    >
                        {user.name}
                    </List.Item>
                ))}
            </div>
            <Form form={form} layout='horizontal' style={{ background: "#fff" }}>
                <Form.Item
                    extra={
                        <div onClick={handleSendMessage}>
                            <a>发送</a>
                        </div>
                    }
                    name="message"
                >
                    <Input clearable />
                </Form.Item>
            </Form>
        </section>
    )
}

export default Chat