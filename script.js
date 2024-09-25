const btn = document.getElementById("send");
const input = document.getElementById("input");
const weatherImg = document.getElementById("weather-img");
const err = document.getElementById("err");
const tempElement = document.getElementById("temp");
const descElement = document.getElementById("desc");
const apiKey = '466aeda3d4935dbe916f194a826cb3f0';

btn.addEventListener("click", () => {
    const city = input.value;
    const units = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(json => weatherView(json))
        .catch(error => {
            err.textContent = "Error fetching data!";
            err.style.display = "block";
        });
});

function weatherView(data) {
    if (data.cod === '404') {
        err.style.display = "block";
        err.textContent = "SHAHAR KIRITING!";
        tempElement.textContent = "";
        descElement.textContent = "";
        weatherImg.src = "./img/sun.png"; 
    } else {
        err.style.display = "none"; 
        const temperature = Math.round(data.main.temp); 
        const description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); // Capitalize first letter

        tempElement.textContent = `${temperature} °C`;
        descElement.textContent = description;

        switch (data.weather[0].main) {
            case "Clear":
                weatherImg.src = "./img/sun.png"; 
                break;
            case "Rain":
                weatherImg.src = "./img/rain.png";
                break;
                case "Snow":
                    weatherImg.src = "./img/cloud_snow.png";
                    break;
            case 'Wind' :
                weatherImg.src = "./img/wind.png"; 
                break;
            case 'Clouds' :
                    weatherImg.src = "./img/clouds.png"; 
                    break;
        }

        
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed); 
        document.querySelector('.bottom div:nth-child(1) h3').textContent = `${humidity} % \nHumidity`;
        document.querySelector('.bottom div:nth-child(2) h3').textContent = `${windSpeed} km/hour \nWind Speed`;

        input.value = ""; 
    }
}
