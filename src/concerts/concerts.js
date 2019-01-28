// API key reference
concertApiKey = config.concertKey

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

const concertsResultsSection = document.getElementById("section--results")
const concertIteneraryDiv = document.getElementById("itenerary--concerts")
const concertInput = document.getElementById("input--concerts")
console.log(concertInput, "input")


const fetchConcertAPI = () => {
    
    //fetch will automatically only search today's music events in Nashville, along with whatever keyword User provides
    //startDateTime is set to 12am this morning and endDateTime 12am tomorrow morning, which equals today only
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&startDateTime=${todayYear}-${todayMonth}-${todayDay}T06:00:01Z&endDateTime=${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}T06:00:00Z&keyword=music&apikey=${concertApiKey}`)
    .then(response => response.json())
    .then(parsedData => {
        let concertFetchResults = parsedData
        console.log(concertFetchResults)
        const concertHTML = makeConcertResultsComponent(concertFetchResults)
        showConcertResults(concertHTML)
    })
}

const makeConcertResultsComponent = (results) => {
    const concertSearchTerm = concertInput.value
    console.log("searchterm", concertSearchTerm)
    let concertResultsToSearch = results._embedded.events
    let concertResultsHTML = ""
    for (let i = 0; i < concertResultsToSearch.length; i++) {
        let currentConcert = concertResultsToSearch[i]
        console.log(currentConcert.classifications[0].genre.name)
        console.log("searchterm", concertSearchTerm)
        if ((currentConcert.classifications[0].genre.name || currentConcert.classifications[0].subGenre.name) === concertSearchTerm) {
            concertResultsHTML += `<span id="results--concerts${i}">${currentConcert.name} at ${currentConcert._embedded.venues[0].name}</span><button id="results-button--concerts${i}">Save</button>`
        }
    }
    console.log(concertResultsHTML)
    return concertResultsHTML
}

const concertSearch = () => {
    fetchConcertAPI()
}

const showConcertResults = (concertResultsHTML) => {
    concertsResultsSection.innerHTML = concertResultsHTML
}

// find the button for a concerts search
const concertSearchButton = document.getElementById("button--concerts")
// event listener to activate concerts search
concertSearchButton.addEventListener("click", concertSearch)




    // .com/discovery/v2/events.json?city=nashville&
    // "https://app.ticketmaster.com/discovery/v2/events.json?apikey=MqDKE2kPYJihkI1bA4caKHsLSKNQjBoW"
