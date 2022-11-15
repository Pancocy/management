import app from '../requestInterceptor'

export function getGoodList(pgNum,pgSize){
    return app({
        url:'/api/manage/product/list',
        method:'GET',
        params:{
            pageNum:pgNum,
            pageSize:pgSize,
        }
    })
}