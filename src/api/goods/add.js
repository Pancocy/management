import app from "../requestInterceptor";

export function addGood(obj){
    return app({
        url:'/api/manage/product/add',
        method:'POST',
        data:obj
    })
} 