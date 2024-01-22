document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const temperature = document.getElementById('temp');
    const weatherDescription = document.getElementById('weatherDesc');
    const weatherImage = document.getElementById('weatherImage');
    const feelsLike = document.getElementById('feelsLike');
    const pressure = document.getElementById('pressure');
    const humidity = document.getElementById('humidity');
    const windspeed = document.getElementById('windspeed');
    const countryCode = document.getElementById('countryCode');
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    const countryInfo = document.getElementById('country-info');
    const countryFlag = document.getElementById('countryFlag');

    let map = L.map('map');
    let marker, circle;



    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
  
      try {

        if (marker) {
            map.removeLayer(marker);
        }
        if (circle) {
            map.removeLayer(circle);
        }

        const response = await fetch(`/weather?${new URLSearchParams(formData)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();


        temperature.textContent = `Temperature: ${result.temp}`;
        weatherDescription.textContent = `Weather: ${result.weatherDesc}`;
        feelsLike.textContent = `Feels like: ${result.feelsLike}`;
        pressure.textContent = `Pressure: : ${result.pressure}`;
        windspeed.textContent = `Wind speed: ${result.windspeed}`;
        countryCode.textContent = `code: ${result.countryCode}`;
        latitude.textContent = `latitude: ${result.latitude}`;
        longitude.textContent = `longitude: ${result.longitude}`;
        humidity.textContent = `humidity: ${result.humidity}`;
        weatherImage.src = result.imageURL;
        countryFlag.src = `https://flagsapi.com/${result.countryCode2}/flat/64.png`;


        countryInfo.innerHTML = `
                <h3>Country code: ${result.countryCode2}</h3>
                <h3>Country name: ${result.countryName}</h3>
                <h3>Postcode: ${result.postcode}</h3>
                <h3>Country currency: ${result.countryCurrency}</h3>
                <!-- Add more country-related information as needed -->
            `;

         map.setView([result.latitude, result.longitude], 9);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        marker = L.marker([result.latitude, result.longitude]).addTo(map)
        circle = L.circle([result.latitude, result.longitude], {radius: 2000}).addTo(map)

    // navigator.geolocation.watchPosition(sucess, error)

    // function sucess(pos) {
    //     const lat = pos.coords.latitude;
    //     const lng = pos.coords.longitude;
    //     const accurate = pos.coords.accuracy

    //     let marker = L.marker([lat, lng]).addTo(map)
    //     let circle = L.circle([lat, lng], {radius: accuracy}).addTo(map)

    //     map.fitBounds()
    // }

    // function error(err){
    //     if (err.code === 1){
    //         alert("Please allow geolocation access")
    //     } else {
    //         alert("cannot get current location")
    //     }
    // }

      } catch (error) {
        console.error('Error:', error.message);
      }
    });
  });
    
