import axios from 'axios'

export default async function ServerHttpRequest(method, path, data) {
    console.log(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:${process.env.EXPO_PUBLIC_SERVER_PORT}${path}`)

    let response = await axios({
        method: method,
        url: `http://${process.env.EXPO_PUBLIC_SERVER_IP}:${process.env.EXPO_PUBLIC_SERVER_PORT}${path}`,
        data: data
    })
    return response
}