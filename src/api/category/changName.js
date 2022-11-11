import app from "../requestInterceptor";
export function changeCateName(id,name){
    return app({
        url:'/api/manage/category/update',
        method:'POST',
        data:{
            categoryId:id,
            categoryName:name
        }
    })
}