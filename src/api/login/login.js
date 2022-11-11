import app from '../requestInterceptor.js'

//登录api
export function submitLogin(username,password){
    return app({
        url :'/api/login',
        method:'POST',
        data:{
            username,
            password
        }
    })
}