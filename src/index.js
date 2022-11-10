import './style.css';

let inputbox = document.querySelector("#search")
let submitButton = document.querySelector(".searchButton")

submitButton.addEventListener("click", () => {
    let country = inputbox.value
    getData (country)
})

let country = inputbox.value
async function getData (country) {
    try {
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=9da5f0d77aac89c44adc161546b98485`, {mode: "cors"});
        let jsonFile = await response.json()
        console.log(jsonFile)
        let lat;
        let lon;
        for(let i = 0; i < jsonFile.length; i++) {
            if(jsonFile[i].name.toUpperCase() == country.toUpperCase()) {
                lat = jsonFile[i].lat;
                lon = jsonFile[i].lon;
            } //else if (jsonFile[i].name.stringsplit(" ").join("") == country.stringsplit(" ").join("")) {
                //lat = jsonFile[i].lat;
                //lon = jsonFile[i].lon;

            //}
        }
        console.log(lat)
        console.log(lon)
        getWeather(lat, lon)
    } catch {
        console.log("error")
    }
}

async function getWeather(lat, lon) {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9da5f0d77aac89c44adc161546b98485`, {mode: "cors"})
    let dataJson = await data.json()
    console.log(dataJson)
    let degree = dataJson.main.temp
    let tempFeelsLike = dataJson.main.feels_like
    let weatherDescription = dataJson.weather[0].description
    let humidity = dataJson.main.humidity
    console.log(dataJson.weather[0].description)
}
let domStuff = () => {
    
}
