import app from '../requestInterceptor'

export function getRoleList(){
    return app({
        url:'/api/manage/role/list',
        method:'GET'
    })
}