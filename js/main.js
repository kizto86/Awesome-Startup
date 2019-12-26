/**
 * Endpoint Url
 */
const randomUser = "https://randomuser.me/api?results=12&nat=us";

const modalCloseBtn = document.getElementById("modal-close-btn");
const displayUser = document.getElementById("gallery");
const gallery = document.getElementsByClassName("gallery")[0];
const modalInfoContainer = document.getElementsByClassName(
  "modal-info-container"
)[0];
const modalInfo = document.getElementsByClassName("modal-container")[0];

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
    displayUser.innerHTML += html;
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

/**
 * hides the modal window by default
 */
document.getElementsByClassName("modal-container")[0].style.display = "none";

/**
 * The event listener listens for a click event and calls
 * the openModal function which displays the modal window
 */

gallery.addEventListener("click", openModal);

/**
 * An event listener  that  listens for a click event and calls
 * the closeModal function which is responsible for closing the
 * modal window
 */

modalCloseBtn.addEventListener("click", closeModal);

/**
 * Close the modal window
 */
function closeModal() {
  modalInfo.style.display = "none";
}
/**
 * Shows the modal window
 */
function openModal() {
  modalInfo.style.display = "block";
}
