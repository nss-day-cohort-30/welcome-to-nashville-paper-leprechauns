// determine today's and tomorrow's dates and convert to appropriate format for API search =============================

// Make single digit dates double digits
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

// Calculate day, month, and year for today and tomorrow
let today = new Date
let tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
let todayMonth = pad(today.getMonth() + 1)
let tomorrowMonth = pad(tomorrow.getMonth() + 1)
let todayDay = pad(today.getDate())
let tomorrowDay = pad(tomorrow.getDate())
let todayYear = today.getFullYear()
let tomorrowYear = tomorrow.getFullYear()

//=================================================================================

// create div for displaying concerts itenerary item

const fetchConcertAPI = (concertSearchTerm) => {

    //fetch will automatically only search today's music events in Nashville, along with whatever keyword User provides
    //startDateTime is set to 12am this morning and endDateTime 12am tomorrow morning, which equals today only
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&startDateTime=${todayYear}-${todayMonth}-${todayDay}T06:00:01Z&endDateTime=${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}T06:00:00Z&keyword=music&keyword=${concertSearchTerm}&apikey=MqDKE2kPYJihkI1bA4caKHsLSKNQjBoW`)
        .then(response => response.json())
        .then(parsedData => {
            const concertSearchResults = parsedData
            return concertSearchResults
        })

}

const makeResultsComponent = (results) => {
    for (let i =0; i < results.length; i++) {
        return `
        <span id="results--concerts${i}>${results}</span><button id="results-button--concerts$[i]>Save</button>
        `
    }
}

const showResults = (html) => {

}

const concertSearch = (term) => {
    const results = fetchConcertAPI(term)
    const html = makeResultsComponent(results)
    showResults(html)
}

// find the button for a concerts search
const concertSearchButton = document.getElementById("button--concerts")
// find the concerts search input
const concertInput = document.getElementById("input--concerts")
//define what the user is searching for
const concertSearchTerm = concertInput.value


// event listener to activate concerts search
concertSearchButton.addEventListener("click", concertSearch(concertSearchTerm))




    // .com/discovery/v2/events.json?city=nashville&
    // "https://app.ticketmaster.com/discovery/v2/events.json?apikey=MqDKE2kPYJihkI1bA4caKHsLSKNQjBoW"
