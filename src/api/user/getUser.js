import app from '../requestInterceptor'
export function getUser (){
    return app({
        url:'/api/manage/user/list',
        method:'GET'
    })
}