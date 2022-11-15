import app from "../requestInterceptor";
export function searchGoodByName(pageNum,pageSize,productName){
    return app({
        url:'/api/manage/product/search',
        method:'GET',
        params:{
            pageNum, 
            pageSize ,
            productName
        }
    })
}

export function searchGoodByDesc(pageNum,pageSize,productDesc){
    return app({
        url:'/api/manage/product/search',
        method:'GET',
        params:{
            pageNum, 
            pageSize ,
            productDesc
        }
    })
}