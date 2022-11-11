import app from "../requestInterceptor";

export function addCategory(id,name){
    return app({
        url:'/api//manage/category/add',
        method:'POST',
        data:{
            parentId:id,
            categoryName:name
        }
    })
}