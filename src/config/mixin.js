// 设置根据商品stastus判断在售和下架的状态
export default function statusFn (status) {
        let val =''
        switch (status) {
            case 1:
                val='在售'
                break;
            case 2:
                val='已下架'
                break;
            default:
                val='';
        }
        return val
}