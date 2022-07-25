const cloudy = document.getElementById('cloudy')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const temp = document.getElementById('temp')
const city = document.getElementById('city')


onload = ()=>{
    getWeather('london')
}

onkeydown = e => {
    document.getElementById('search').focus()
    if (e.key === 'Enter') {
        getWeather(document.getElementById('search').value)
        document.getElementById('search').value = ''
    }
}

function search(e){
    e.preventDefault()
    
}

function getWeather(location) {
    let url = `https://api.weatherapi.com/v1/current.json?key=39161cb0454846e888893332222507&q=${location}`
    fetch(url)
        .then(res => res.json())
        .then(json => getData(json))
}


function getData(json){
    console.log(json.current.condition.text)
    let image = '<i class="bi bi-stars"></i>'
    if (json.current.condition.text.toLowerCase().includes('cloudy')) {
        image = '<i class="bi bi-cloud"></i>'
    }
    else if(json.current.condition.text.toLowerCase().includes('sunny')) {
        image = '<i class="bi bi-brightness-high"></i>'
    }
    else if(json.current.condition.text.toLowerCase().includes('rain')) {
        image = '<i class="bi bi-cloud-rain"></i>'
    }
    else if(json.current.condition.text.toLowerCase().includes('snow')) {
        image = '<i class="bi bi-cloud-snow"></i>'
    }
    else if(json.current.condition.text.toLowerCase().includes('fog')) {
        image = '<i class="bi bi-cloud-fog2"></i>'
    }

    const temp_value = json.current.temp_c
    const cities = json.location.name
    const cloud = json.current.cloud
    const humidity_value = json.current.humidity
    const winds = json.current.wind_kph

    cloudy.textContent = cloud + '%'
    humidity.textContent = humidity_value + '%'
    wind.textContent = winds + 'k/h'
    temp.innerHTML = temp_value + '°' + image
    city.textContent = cities
}