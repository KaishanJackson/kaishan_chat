function socket() {
    let ws: WebSocket | undefined | null
    function connect(url: string, username: string) {
        console.log(url)
        if (ws) {
            return
        }
        ws = new WebSocket(url + "?=" + username)
    }
    function listen(callback: (data: { message: string, to: string, from: string }) => void) {
        ws!.onmessage = event => {
            console.log(event)
            const param = JSON.parse(event.data)

            callback(param)
        }
    }
    function sendMessage(text: { to: string, message: string, from: string }) {
        ws!.send(JSON.stringify(text))
    }
    return {
        connect, listen, sendMessage
    }
}
export default socket()