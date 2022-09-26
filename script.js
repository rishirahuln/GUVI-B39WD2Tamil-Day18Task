let container=document.createElement("div");
container.classList.add("container");

let h1=document.createElement("h1");
h1.setAttribute("id","title");
h1.classList.add("text-center");
h1.innerHTML="Countries with Weather data";

let row=document.createElement("div");
row.classList.add("row");

container.append(h1,row);
document.body.append(container);

async function getCountriesData(){
    try {
        let response=await fetch("https://restcountries.com/v3.1/all");
        let data=await response.json();
        return dataInCard(data);
    } catch (error) {
        console.log(error);
    }
}
getCountriesData();

function dataInCard(data){
    for(i=0;i<data.length;i++){
        row.innerHTML+=`
        <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
        <div class="card border-dark cardHover h-90 mb-3" style="max-width: 18rem;">
        <div class="card card-header cardTitle">${data[i].name.common}</div>
        <div class="card card-body">
        <img src="${data[i].flags.svg}" class="card-img-top image">
        <div class="card-text">Capital: ${data[i].capital}</div>
        <div class="card-text">Region: ${data[i].region}</div>
        <div class="card-text">Country Code: ${data[i].altSpellings[0]}</div>
        <div class="card-text">Population: ${data[i].population}</div>
        <div class="d-flex justify-content-center">
        <button class="btn btn-primary" onclick="getWeatherData(${data[i].latlng[0]},${data[i].latlng[1]},'${data[i].name.common}')">Click for Weather</button>
        </div>
        <div class="card-text" id="${data[i].name.common}"></div>
        </div>
        </div>
        </div>`;
    }
    
}

async function getWeatherData(lat,lon,idname){
    let weatherDiv=document.getElementById(idname);
    try {
        let weatherResponse=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5c6b7f0fefc23f9b28b90550581a1789`);
        let weatherData=await weatherResponse.json();       
        weatherDiv.innerHTML=(weatherData.main.temp - 273.15).toFixed(2) + "&#176; C, " + weatherData['weather'][0].description;
    } catch (error) {
        console.log(error);
    }
}