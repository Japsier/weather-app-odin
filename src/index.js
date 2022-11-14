//import './style.css';

let inputbox = document.querySelector("#search")
let submitButton = document.querySelector(".searchButton")
let degreeSwitch = document.querySelector("#degreeSwitch")

degreeSwitch.addEventListener("click", () => {
    getData(document.querySelector("#city").innerText)
})

submitButton.addEventListener("click", () => {
    let country = inputbox.value
    getData (country)
})

let country = inputbox.value
async function getData (country) {
    try {
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=9da5f0d77aac89c44adc161546b98485`, {mode: "cors"});
        let jsonFile = await response.json()
        let lat;
        let lon;
        if (jsonFile.message == "wrong latitude") {
            getData("Amsterdam")
            return
        }
        for(let i = 0; i < jsonFile.length; i++) {
            if(jsonFile[i].name.toUpperCase() === country.toUpperCase()) {
                lat = jsonFile[i].lat;
                lon = jsonFile[i].lon;
                document.querySelector("#city").innerText = jsonFile[i].name
                inputbox.placeholder = country
                inputbox.value = ""
                i = jsonFile.length
            } 
        }
        console.log(lat)
        console.log(lon)
        getWeather(lat, lon)
    } catch {
        console.log("error")
        setTimeout(getData("Amsterdam"), 1000)
        
    }
}

async function getWeather(lat, lon) {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9da5f0d77aac89c44adc161546b98485`, {mode: "cors"})
    let dataJson = await data.json()
    let degrees = dataJson.main.temp
    if (degreeSwitch.checked === true) {
        document.getElementById("degrees").innerText  = "temperature: " + Math.round((1.8*(degrees-273.15) + 32) *100)/100 + " °F"
    } else {
        document.getElementById("degrees").innerText = "temperature: " +  Math.round((degrees - 272.15) * 100)/100 + " °C"
    }
    let tempFeelsLike = dataJson.main.feels_like
    if (degreeSwitch.checked === true) {
        document.getElementById("feels-like").innerText  = "Temperature feels like: " + Math.round((1.8*(tempFeelsLike-273.15) + 32) *100)/100 + " °F"
    } else {
        document.getElementById("feels-like").innerText = "Temperature feels like: " + Math.round((tempFeelsLike - 272.15) * 100)/100 + " °C"
    }
    let weatherDescription = dataJson.weather[0].description
    document.getElementById("description").innerText = weatherDescription
    let humidity = dataJson.main.humidity
    document.getElementById("humidity").innerText = "humidity: " + humidity
    console.log(dataJson.weather[0].description)
}

getData("Amsterdam")
inputbox.placeholder = "Amsterdam"
