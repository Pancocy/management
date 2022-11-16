import app from "../requestInterceptor";
export function delUser(data){
    return app({
        url:'/api/manage/user/delete',
        method:'POST',
        data
    })
}