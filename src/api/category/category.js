import app from "../requestInterceptor";

export function getFirstCat(id){
    return app({
        url:'/api//manage/category/list',
        method:'GET',
        params:{
            parentId:id
        }
    })
}