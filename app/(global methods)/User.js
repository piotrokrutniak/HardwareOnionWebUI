const { default: Cookies } = require("universal-cookie");

const cookies = new Cookies()

export function ClearUser(){
    cookies.remove("bearer_token")
    cookies.remove("user")
}

export function GetUser(){
    const user = cookies.get("user")
    return user ?? false
}