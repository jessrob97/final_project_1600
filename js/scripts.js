// REQUIREMENT: Import statement
import {
    parks
} from './parks.js'

/*******************************************************/
/* Global variables */
/*******************************************************/

// REQUIREMENT: variables scoped to global
// REQUIREMENT: const variable
const parkList = document.querySelector("#parks");
// REQUIREMENT: use array to store and manipluate collections of data
const sortedParks = parks
    .map(park => {
        // REQUIREMENT: conditional logic
        if (park.activities.length > 0) {
            park.topActivity = park.activities[0].name;
        }
        return park;
    })
    // REQUIREMENT: value comparison
    .sort((a, b) => (a.name > b.name) ? 1 : -1);
// REQUIREMENT: let variable
let numberOfVisibleParks = 0;

/*******************************************************/
/* Functions */
/*******************************************************/

// REQUIREMENT: arrow function
const appendCard = park => {
    // REQUIREMENT: variable scoped to a function
    const li = document.createElement("li");
    li.classList.add("parkscard");
    li.addEventListener("click", () => {
        li.classList.toggle("is-flipped")
    });

    // Create and append front card
    const front = document.createElement("div");
    front.classList.add("parkscard-front");
    front.classList.add("parkscard-face");
    // REQUIREMENT: template literal
    // REQUIREMENT: use object key-vlaue pair
    front.style.backgroundImage = `url('${park.images[0].url}')`
    li.appendChild(front);

    const name = document.createElement("h3");
    // REQUIREMENT: string manipulation
    name.textContent = park.name.toUpperCase();
    front.appendChild(name);

    // Create and append back card
    const back = document.createElement("div");
    back.classList.add("parkscard-back");
    back.classList.add("parkscard-face");

    li.appendChild(back);

    const designation = document.createElement("div");
    designation.textContent = "designation: " + park.designation;
    back.appendChild(designation);

    const states = document.createElement("div");
    states.textContent = "states: " + park.states;
    back.appendChild(states);

    const topActivity = document.createElement("div");
    topActivity.textContent = "top activity: " + park.topActivity;
    back.appendChild(topActivity);

    parkList.appendChild(li);

    return;
}

const loadMoreParks = () => {
    sortedParks
        .slice(numberOfVisibleParks, numberOfVisibleParks + 15)
        //REQUIREMENT: Iterate through array
        .forEach(park => {
            appendCard(park);
        });
    numberOfVisibleParks += 15;

    if (numberOfVisibleParks >= sortedParks.length) {
        document.getElementById("park-button").style.display = "none";
    }

    return;
}

/*******************************************************/
/* Other code */
/*******************************************************/

loadMoreParks();

document.getElementById("park-button").addEventListener("mousedown", event => {
    loadMoreParks();
});