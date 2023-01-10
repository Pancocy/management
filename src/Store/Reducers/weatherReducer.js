
const initWeather ={};

export default function weatherReducer(preState = initWeather,action){
        const {type,data} = action
        switch (type) {
            case 'saveWeather':
                return {...data}
            default:
                return initWeather
        }
}
