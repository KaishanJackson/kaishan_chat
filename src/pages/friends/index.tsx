import { List } from "antd-mobile"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useMemo } from "react"
import { useNavigate } from "react-router"

const Friends = () => {
    const userinfo = useSelector((state: RootState) => state.user.info.userInfo)
    const friendList = useMemo(() => userinfo.friends.split(","), [userinfo])
    const navigate = useNavigate()
    const goChat = (value: string) => {
        navigate("/chat", { state: { friend: value } })
    }
    return (
        <section>
            <List header='好友列表'>
                {
                    friendList.map((value, index) => <List.Item key={index} onClick={() => { goChat(value) }}>{value}</List.Item>)
                }
            </List>
        </section>
    )
}

export default Friends