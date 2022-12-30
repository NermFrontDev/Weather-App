
const temperature = document.querySelector('#temp');
const locationOutput = document.querySelector('#location');
const conditionOutput = document.querySelector('#condition');
const dateOutput = document.querySelector('#date');
const iconMain = document.querySelector('#icon-weather');
const iconStatus = document.querySelector('#icon-status');
const cloudOutput = document.querySelector('#cloud');
const humidityOutput = document.querySelector('#humidity');
const windOutput = document.querySelector('#wind');
const precipOutput = document.querySelector('#precipitation');
const timeOutput = document.querySelector('#timeClock');
const dayOrNight = document.querySelector('#dayNight');
const searchbox = document.querySelector('.search');
const form = document.getElementById('locationInput');
const btn = document.querySelector('.submit');


form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (searchbox.value.length == 0) {
        alert('Please add an city name');
    }
    callAPI(searchbox.value);
    searchbox.value = '';
})

function callAPI (city){
    const apiId = '6d497d6192534ad9a1d31621222812';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiId}&q=${city}&aqi=yes`;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;
    //https://api.openweathermap.org/data/2.5/weather?q=tucson&appid=5c6415497590de4880719096de77d1f1

    fetch(url)
        .then(data => {
            // console.log(data)
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.code === '404') {
                alert('No encontrado');
            } else {
                showWeather(dataJSON);
                // timeClock();
            }
            console.log(dataJSON);
        })
}

function showWeather(data) {
    const {location:{name,localtime}, current:{temp_c,condition:{text,icon,code}, wind_kph, humidity,feelslike_c, precip_mm, is_day}} = data;

    temperature.innerHTML = parseInt(`${temp_c}`);
    conditionOutput.innerHTML = `${text}`;
    locationOutput.innerHTML = `${name}`;
    humidityOutput.innerHTML = `${humidity}` + ' %';
    cloudOutput.innerHTML = parseInt(`${feelslike_c}`) + ' %';
    windOutput.innerHTML = parseInt(`${wind_kph}`) + ' km/h';
    precipOutput.innerHTML = `${precip_mm}` + ' mm'; 
    
    const date = new Date(localtime)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = (hours > 12) ? hours - 12 : hours;
    minutes = ("0" + minutes).slice(-2);
    timeOutput.innerHTML= `${hours}:${minutes}`;
    dateOutput.innerHTML = date.toDateString()
    dayOrNight.innerHTML = ampm;

    if (is_day == '1' && code == '1000') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1000') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-night.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1003') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1003') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1006') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/cloudy.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1006') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1009') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1009') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1030') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-fog.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1030') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-fog.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1063') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-drizzle.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1063') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1066') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1066') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1069') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-sleet.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1069') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-sleet.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1072') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-haze.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1072') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-haze.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1087') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-day-extreme.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1087') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-night-extreme.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1114') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-fog.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1114') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-haze.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1117') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-haze.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1117') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-haze.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1135') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-fog.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1135') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-fog.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1147') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-fog.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1147') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-fog.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1150') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-drizzle.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1150') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1153') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-drizzle.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1153') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1168') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-fog.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1168') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1171') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-haze.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1171') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-haze.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1180') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-drizzle.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1180') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1183') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-drizzle.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1183') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1186') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-drizzle.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1186') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1189') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-drizzle.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1189') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1192') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-rain.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1192') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-rain.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1195') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-rain.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1195') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-rain.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1198') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-haze.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1198') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-haze.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1201') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-haze.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1201') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-haze.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1204') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-sleet.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1204') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-sleet.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1207') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-sleet.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1207') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-sleet.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1210') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1210') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1213') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1213') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1216') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1216') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1219') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1219') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1222') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1222') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1225') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1225') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-hail.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1237') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-hail.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1237') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-hail.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1240') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-drizzle.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1240') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-drizzle.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1243') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-rain.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1243') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-rain.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1246') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-day-rain.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1246') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-night-rain.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1249') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-sleet.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1249') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-sleet.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1252') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-sleet.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1252') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-sleet.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1255') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1255') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1258') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1258') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1261') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-hail.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1261') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-hail.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1264') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-hail.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1264') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-hail.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1264') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-hail.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1264') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1273') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-day-extreme.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1273') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-night-extreme.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1276') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-extreme.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1276') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-extreme.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1279') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-day-extreme-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1279') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-night-extreme-snow.svg" alt="weater-icon"/>`
    }
    
    if (is_day == '1' && code == '1282') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-extreme-snow.svg" alt="weater-icon"/>`
    } else if (is_day == '0' && code == '1282') {
        iconMain.innerHTML = `<img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-extreme-snow.svg" alt="weater-icon"/>`
    }

    /* iconMain.innerHTML = ` <img
                                src=${icon}
                                alt="weater-icon"
                            />`; */

    iconStatus.innerHTML = ` <img
                                src=${icon}
                                alt="animation-description"
                            />`;   
}