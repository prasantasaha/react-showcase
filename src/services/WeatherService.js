let API_KEY = "f5aeb1bc16eb7584b3c6e0ce52794a2c"
let apiUrl = "http://api.openweathermap.org/data/2.5/"


export function fetchWeather(city, coord) {
    let weeklyWeatherUrl =
        `${apiUrl}/forecast?lat=${coord.lat}&lon=${coord.lon}&q=${city}&units=metric&cnt=7&appid=${API_KEY}`

    return fetch(weeklyWeatherUrl).then((response) => response.json());
}

export function getIcon(id) {
    if (id >= 200 && id < 300) {
        return "RAIN";
    } else if (id >= 300 && id < 500) {
        return "SLEET";
    } else if (id >= 500 && id < 600) {
        return "RAIN";
    } else if (id >= 600 && id < 700) {
        return "SNOW";
    } else if (id >= 700 && id < 800) {
        return "FOG";
    } else if (id === 800) {
        return "CLEAR_DAY";
    } else if (id >= 801 && id < 803) {
        return "PARTLY_CLOUDY_DAY";
    } else if (id >= 802 && id < 900) {
        return "CLOUDY";
    } else if (id === 905 || (id >= 951 && id <= 956)) {
        return "WIND";
    } else if (id >= 900 && id < 1000) {
        return "RAIN";
    }
}

export function shadeColor(color, percent) { // eslint-disable-next-line
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}