import app from "../requestInterceptor";
export function UpdatePower(data){
    return app({
        url:'/api/manage/role/update',
        method:'POST',
        data
    })
}