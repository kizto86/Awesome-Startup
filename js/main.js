const randomUser = "https://randomuser.me/api?results=12";

const displayUser = document.getElementById("gallery");

/**
 * fetch makes an api call to the url stored in const randomUser
 */
fetch(randomUser)
  .then(checkStatus)
  .then(response => response.json())
  .then(data => displayRandUsers(data.results))
  .catch(error => console.log("we have a problem", error));

/**
 * The functions displays the random user information.
 * @param {An array of object} data
 */

function displayRandUsers(data) {
  data.map(user => {
    const html = `
        <div class="card">
        <div class="card-img-container">
          <img
            class="card-img"
            src="${user.picture.medium}"
            alt="profile picture"
          />
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${
      user.name.last
    }</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${
      user.location.state
    }</p>
        </div>
        </div>
        `;
    displayUser.innerHTML = html;
  });
}

/**
 * The function checks if  promise resolved with the response object
 * ok property is equal to true before parsing to JSON
 * @param {object} response
 * @return {object} promise object
 */
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
