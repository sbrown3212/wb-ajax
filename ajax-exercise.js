import axios from 'axios';

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  // Axios.get to get data from dog API
  axios.get('https://dog.ceo/api/breeds/image/random')
    .then((response) => {
      // Save url to message variable
      const { message } = response.data;

      // Add img tag string with src as url from dog API to '#dog-image' div
      document.querySelector('#dog-image').innerHTML = `<img src="${message}">`;
    })

}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);



// PART 2: Show Weather

// 2. showWeather is invoked
function showWeather(evt) {
  // 3. gets user input and saves to zipcode variable
  const zipcode = document.querySelector('#zipcode-field').value;

  // 4. axios.get to ask for weather forecast of zipcode in server (app.js)
  // (steps 5-7 on server (app.js))
  axios.get(`/weather.txt?zipcode=${zipcode}`)
  .then((response) => {
    // 8. save response forecast data to forecast variable
    const forecast = response.data;

    // 9. Populate #weather-info <div> with forecast
    document.querySelector('#weather-info').innerText = forecast;
  })
}

// 1. User inputs zipcode and clicks '#weather-button' 
document.querySelector('#weather-button').addEventListener('click', showWeather);



// PART 3: Order Cookies

function orderCookies(evt) {
  // Prevents form submission from refreshing page
  evt.preventDefault();

  // Save user input to pass into axios.post object
  const cookieType = document.querySelector('#cookie-type-field').value;
  const qty = document.querySelector('#qty-field').value;

  // Save variable for '#order-status'
  const orderStatus = document.querySelector('#order-status');

  // axios.post to route of '/order-cookies.json' passing the object with cookieType and qty input from user
  axios.post('/order-cookies.json', {
    cookieType,
    qty,
  }).then((response) => {
    // Display message and change to red if error
    if (response.data.resultCode === 'ERROR') {
      orderStatus.classList.add('order-error');
      orderStatus.innerText = response.data.message;
    } else {
      orderStatus.innerHTML = response.data.message;
    }
  })
}

document.querySelector('#order-form').addEventListener('submit', orderCookies);



// PART 4: iTunes Search

function iTunesSearch(evt) {
  // Prevent page refresh upon submit
  evt.preventDefault();

  // Get user input
  const searchTerm = document.querySelector("#search-term").value;

  // Save API url for user input
  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  // axios get method for url
  axios.get(url).then((response) => {
    // Save results from response data
    const { results } = response.data;

    // Initialize string to store <li> tags with artist and song info
    let songInfo = '';

    // For each obj in results array
    results.forEach((songObj) => {
      // Concatenate string to song info
      songInfo += `<li>Artist: ${songObj.artistName} Song: ${songObj.trackName}</li>`
    })

    // Display songInfor in '#itunes-results' <div>
    document.querySelector('#itunes-results').innerHTML = songInfo;
  });
};

document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
