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

function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  axios.get(`/weather.txt?zipcode=${zipcode}`)
  .then((response) => {
    const forecast = response.data;
    document.querySelector('#weather-info').innerText = forecast;
  })
}

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
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  axios.get(url).then((response) => {
    const { results } = response.data;

    let songInfo = '';

    results.forEach((songObj) => {
      songInfo += `<li>Artist: ${songObj.artistName} Song: ${songObj.trackName}</li>`
    })

    document.querySelector('#itunes-results').innerHTML = songInfo;
  });
};

document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
