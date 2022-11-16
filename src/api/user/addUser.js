import app from "../requestInterceptor";
export function addUsers(data){
    return app({
        url:'/api/manage/user/add',
        method:'POST',
        data
    })
}