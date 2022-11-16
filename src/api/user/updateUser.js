import app from "../requestInterceptor";
export function updateUser(data){
    return app({
        url:'/api/manage/user/update',
        method:'POST',
        data
    })
}