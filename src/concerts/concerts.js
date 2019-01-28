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


const fetchConcertAPI = () => {

    //fetch will automatically only search today's music events in Nashville, along with whatever keyword User provides
    //startDateTime is set to 12am this morning and endDateTime 12am tomorrow morning, which equals today only
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&startDateTime=${todayYear}-${todayMonth}-${todayDay}T06:00:01Z&endDateTime=${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}T06:00:00Z&keyword=music&apikey=${concertApiKey}`)
        .then(response => response.json())
        .then(parsedData => {
            let concertFetchResults = parsedData
            const concertHTML = makeConcertResultsComponent(concertFetchResults)
            showConcertResults(concertHTML)
        })
}

const makeConcertResultsComponent = (results) => {
    const concertSearchTerm = concertInput.value.toLowerCase()
    let concertResultsToSearch = results._embedded.events
    let concertResultsHTML = ""
    if (concertSearchTerm === "") {
        concertResultsHTML = `<div>Type in a music genre, or type "all" to see all of today's events.</div>`
    } else if (concertSearchTerm === "all") {
        for (let i = 0; i < concertResultsToSearch.length; i++) {
            let currentConcert = concertResultsToSearch[i]
            concertResultsHTML += `<div class="result" id="results--concerts${i}">${currentConcert.name} at ${currentConcert._embedded.venues[0].name}</div><button id="results-button--concerts${i}">Save</button>`
        }
    } else {
        for (let i = 0; i < concertResultsToSearch.length; i++) {
            let currentConcert = concertResultsToSearch[i]
            if ((currentConcert.classifications[0].genre.name.toLowerCase() || currentConcert.classifications[0].subGenre.name.toLowerCase()) === concertSearchTerm) {
                concertResultsHTML += `<div class="result" id="results--concerts${i}">${currentConcert.name} at ${currentConcert._embedded.venues[0].name}</div><button id="results-button--concerts${i}">Save</button>`
            }
        }
    }
    return concertResultsHTML
}

const showConcertResults = (concertResultsHTML) => {
    if (concertResultsHTML === "") {
        concertResultsHTML = `<div>Sorry, there are no concerts of that type today.  Try another genre, or type "all" to see all of today's events.</div>`
    }
    concertsResultsSection.innerHTML = concertResultsHTML
}

// find the button for a concerts search
const concertSearchButton = document.getElementById("button--concerts")
// event listener to activate concerts search
concertSearchButton.addEventListener("click", fetchConcertAPI)

//Save button click event--
concertsResultsSection.addEventListener("click", (evt) => {
    let iteneraryConcertTarget;
    let concertIdToTarget;
    if (evt.target.id.split("--")[0] === "results-button") {
        concertIdToTarget = evt.target.id.split("--")[1]
    }
    const allResults = document.getElementsByClassName("result")
    for (let i = 0; i < allResults.length; i++) {
        let currentResult = allResults[i]
        if (currentResult.id.split("--")[1] === concertIdToTarget) {
            iteneraryConcertTarget = currentResult
            const iteneraryConcertDiv = document.getElementById("itenerary--concerts")
            let iteneraryConcertContent = `Concert: ${iteneraryConcertTarget.textContent}`
            iteneraryConcertDiv.textContent = "Testing"
            iteneraryConcertDiv.textContent = iteneraryConcertContent
            concertsResultsSection.innerHTML = ""
        }
    }
})
