document.addEventListener('DOMContentLoaded', async function() {
    //const apiKey = "6343c8b1a1a94cf99ab120833251001";
    //const city = "Bratislava";
    //const url ='https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no';
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=6343c8b1a1a94cf99ab120833251001&q=Bratislava&days=5&aqi=no&alerts=no';

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Текущая погода
            document.getElementById('city').textContent = data.location.name;
            document.getElementById('country').textContent = data.location.country;
            document.getElementById('last-updated').textContent = `Последнее обновление: ${data.current.last_updated}`;
            document.getElementById('temperature').textContent = `Температура: ${data.current.temp_c}°C`;
            document.getElementById('icon').src = data.current.condition.icon;
            document.getElementById('icon-text').textContent = data.current.condition.text;
            document.getElementById('wind-speed').textContent = `Скорость ветра: ${data.current.wind_kph} км/ч`;
            document.getElementById('precipitation').textContent = `Осадки: ${data.current.precip_mm} мм`;
            document.getElementById('pressure').textContent = `Давление: ${data.current.pressure_mb} мбар`;

            // Прогноз на 5 дней
            data.forecast.forecastday.forEach(function(day) {
                const forecastDay = document.createElement('div');
                forecastDay.className = 'forecast-day';
                forecastDay.innerHTML = `
                <p>${new Date(day.date).toLocaleDateString('en-En', { weekday: 'long' })}</p>
                <p>${day.date}</p>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                <p>Температура: ${day.day.avgtemp_c}°C</p>
            `;
                document.getElementById('forecast-days').appendChild(forecastDay);
            });
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    });
