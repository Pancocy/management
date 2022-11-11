import app from "../requestInterceptor";
const Key ='d0de984a8a6d36f260473e13d157b66f'
export function City(){
    return app({
        url:'https://restapi.amap.com/v3/ip',
        method:'GET',
        params:{
            // ip:'114.247.50.2',
            output:'json',
            key:Key
        }
        
    })
}

export function Weather(ad){
    return app({
        url:'https://restapi.amap.com/v3/weather/weatherInfo',
        method:'GET',
        params:{
            city:ad,
            key:Key
        }
        
    })
}

