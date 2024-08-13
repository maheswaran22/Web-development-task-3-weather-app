const container = document.querySelector('.container');
const search = document.querySelector('.search-box button'); // Fixed 'butten' to 'button'
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => { // Fixed 'addEventLists' to 'addEventListener'
    const APIkey = '4bfa4872a37ceafa320cbe518bfecd95';
    const city = document.querySelector('.search-box input').value; // Fixed 'ariaValueMax' to 'value'

    if (city === '') // Fixed comparison to use '===' for strict equality
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json()) // Fixed 'Response' to 'response'
        .then(json => {
            const image = document.querySelector('.weather-box img'); // Fixed 'image' to 'img'
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description'); // Fixed 'discription' to 'description'
            const humidity = document.querySelector('.weather-details .humidity span'); // Fixed 'spam' to 'span'
            const wind = document.querySelector('.weather-details .wind span'); // Fixed 'spam' to 'span'

            switch (json.weather[0].main) {
                case 'Clear': // Fixed 'clear' to 'Clear' (weather conditions should match the API response)
                    image.src = 'assets/clear.png';
                    break;

                case 'Rain':
                    image.src = 'assets/rain.png';
                    break;

                case 'Snow':
                    image.src = 'assets/snow.png';
                    break;

                case 'Clouds': // Fixed 'Cloud' to 'Clouds'
                    image.src = 'assets/cloud.png';
                    break;

                case 'Mist':
                case 'Haze': // Combined 'Mist' and 'Haze' case to share the same image
                    image.src = 'assets/mist.png';
                    break;

                default:
                    image.src = 'assets/cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
        })
        .catch(error => console.error('Error fetching weather data:', error)); // Added error handling
});
