import fetch from "./fetch"

export function userLogin(data: { username: string, password: string }) {
    return fetch({
        url: "/user/login",
        data,
        method: 'post'
    })
}

export function userRegister(data: { username: string, password: string }) {
    return fetch({
        url: "/user/register",
        data,
        method: 'post'
    })
}
export function getUserInfo() {
    return fetch({
        url: "/user/userinfo",
        method: 'get'
    })
}
export function addFriend(friend: string) {
    return fetch({
        url: "/user/addfriend",
        data: { friend },
        method: 'post'
    })
}