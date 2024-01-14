import { Button } from "antd-mobile"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import style from "./index.module.css"
import { resetInfo } from "../../store/reducer/userReducer"
import { useNavigate } from "react-router"

const User = () => {
    const username = useSelector((state: RootState) => state.user.info.userInfo.username)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(resetInfo())
        navigate("/login")
    }
    return (
        <section>
            <header className={style.header}>{username}</header>
            <Button block size="large" onClick={logout}>退出登录</Button>
        </section>
    )
}

export default User