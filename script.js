const cityInput =
document.getElementById("city");

cityInput.addEventListener(
"keypress",
function(event){

    if(event.key === "Enter"){

        getWeather();
    }
}
);

document
.getElementById("themeBtn")
.addEventListener("click", ()=>{

    document.body
    .classList.toggle("dark");
});

window.onload = ()=>{

    let lastCity =
    localStorage.getItem("lastCity");

    if(lastCity){

        cityInput.value = lastCity;

        getWeather();
    }
};

async function getWeather(){

    let city = cityInput.value.trim();

    if(city === ""){

        alert("Please enter a city name");

        return;
    }

    localStorage.setItem(
        "lastCity",
        city
    );

    let result =
    document.getElementById(
        "weatherResult"
    );

    result.innerHTML =
    `<div class="loader"></div>`;

    try{

        let response =
        await fetch(
        `https://wttr.in/${city}?format=j1`
        );

        let data =
        await response.json();

        let current =
        data.current_condition[0];

        let temp =
        current.temp_C;

        let humidity =
        current.humidity;

        let wind =
        current.windspeedKmph;

        let description =
        current.weatherDesc[0].value;

        let emoji = "🌥";

        if(description
            .toLowerCase()
            .includes("rain")){

            emoji = "🌧";
        }

        else if(temp > 35){

            emoji = "☀";
        }

        else if(temp < 15){

            emoji = "❄";
        }

        result.innerHTML =

        `
        <div class="weather-card">

            <h2>
            ${emoji} ${city}
            </h2>

            <p>
            🌡 Temperature:
            ${temp}°C
            </p>

            <p>
            ☁ Weather:
            ${description}
            </p>

            <p>
            💧 Humidity:
            ${humidity}%
            </p>

            <p>
            🌬 Wind Speed:
            ${wind} km/h
            </p>

        </div>
        `;
    }

    catch(error){

        result.innerHTML =

        `
        <div class="weather-card">

            <h2>
            ❌ Error
            </h2>

            <p>
            Unable to fetch weather.
            </p>

        </div>
        `;
    }
}
