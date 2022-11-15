import app from "../requestInterceptor";

export function UpdateGood(obj){
    return app({
        url:'/api/manage/product/update',
        method:'POST',
        data:obj
    })
} 