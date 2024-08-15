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
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
