import Login from "../pages/login";
import Layout from "../components/layout";
import Message from "../pages/message";
import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/register";
import Friends from "../pages/friends";
import Find from "../pages/find";
import User from "../pages/user";
import Chat from "../pages/chat";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/message",
                element: <Message />
            },
            {
                path: "/friends",
                element: <Friends />
            },
            {
                path: "/find",
                element: <Find />
            },
            {
                path: "/user",
                element: <User />
            },
            {
                path: "/chat",
                element: <Chat />
            }
        ]
    }
])