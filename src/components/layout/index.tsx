import { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import style from "./index.module.css"
import { NavBar, Space, TabBar } from "antd-mobile";
import { UserAddOutline, UserContactOutline, MessageOutline, UserOutline, AppOutline, LeftOutline } from 'antd-mobile-icons'
import AddFriend from "./addFriend";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { globalContext } from "../../context";

const NAV_LIST = [{
    to: '/message',
    icon: <MessageOutline />,
    text: "消息"
}, {
    to: '/friends',
    icon: <UserContactOutline />,
    text: "好友"
}, {
    to: '/find',
    icon: <AppOutline />,
    text: "发现"
}, {
    to: '/user',
    icon: <UserOutline />,
    text: "我的"
}]
const TOP_TEXT = {
    message: "消息",
    friends: "好友",
    find: "发现",
    user: "我的"
}
const Layout = () => {
    const token = useSelector((state: RootState) => state.user.info.token)
    const username = useSelector((state: RootState) => state.user.info.userInfo.username)
    const location = useLocation()
    const navigate = useNavigate()
    const pathname = useMemo(() => {
        return location.pathname.replace(/\//g, "")
    }, [location])
    const handleTabBarChange = (value: string) => {
        navigate(value)
    }
    const [popShow, setPopShow] = useState(false)
    const closePop = () => { setPopShow(false) }
    const showPop = () => { setPopShow(true) }
    const friendName = useMemo(() => location.state?.friend, [location])
    const { connect } = useContext(globalContext)
    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else {
            console.log(connect)
            connect("ws://localhost:8080", username)
        }
    }, [])
    const goBack = () => {
        navigate(-1)
    }
    return (
        <section className={style.layout}>
            <Routes>
                <Route path="/" element={<Navigate replace to="/message" />}></Route>
            </Routes>
            {<NavBar style={{ background: "#fff" }} back={null} left={friendName ? <LeftOutline onClick={goBack} /> : null} right={<Space style={{ '--gap': '16px' }}>
                <UserAddOutline onClick={showPop} />
            </Space>}>
                {!friendName ? TOP_TEXT[pathname] : friendName}
            </NavBar>}
            <AddFriend show={popShow} onClose={closePop} />
            <div className={style.content}>
                <Outlet />
            </div>
            {/* <div className={style.bottom}> */}
            {friendName ? null : <TabBar activeKey={location.pathname} style={{ background: "#fff " }} onChange={handleTabBarChange}>
                {NAV_LIST.map(item => (
                    <TabBar.Item key={item.to} icon={item.icon} title={item.text} />
                ))}
            </TabBar>}
        </section>
    )
}

export default Layout