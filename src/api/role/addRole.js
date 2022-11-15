import app from "../requestInterceptor";

export function addRole(data){
    return app({
        url:'/api/manage/role/add',
        method:'POST',
        data
    })
}