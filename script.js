$(document).ready(function() {
    const apiKey = '9f96446568932f33e34d2bd678cff58f';
    const city = 'Bratislava';
    const url = `https://api.weatherstack.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&lang=en`;


    $.getJSON(url, function(data) {
        // Текущая погода
        $('#city').text(data.location.name);
        $('#country').text(data.location.country);
        $('#last-updated').text(`Последнее обновление: ${data.current.last_updated}`);
        $('#temperature').text(`Температура: ${data.current.temp_c}°C`);
        $('#icon').attr('src', data.current.condition.icon);
        $('#icon-text').text(data.current.condition.text);
        $('#wind-speed').text(`Скорость ветра: ${data.current.wind_kph} км/ч`);
        $('#precipitation').text(`Осадки: ${data.current.precip_mm} мм`);
        $('#pressure').text(`Давление: ${data.current.pressure_mb} мбар`);

        // Прогноз на 5 дней
        data.forecast.forecastday.forEach(function(day) {
            const forecastDay = `
                <div class="forecast-day">
                    <p>${new Date(day.date).toLocaleDateString('en-En', { weekday: 'long' })}</p>
                    <p>${day.date}</p>
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                    <p>Температура: ${day.day.avgtemp_c}°C</p>
                </div>
            `;
            $('#forecast-days').append(forecastDay);
        });
    });
});
