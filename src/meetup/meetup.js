//Array of objects to pair category names with their values
let categories = [
    music = {
        name: "music",
        value: 103
    },
    business = {
        name: "business",
        value: 101
    },
    food = {
        name: "food",
        value: 110
    },
    community = {
        name: "community",
        value: 113
    },
    performing = {
        name: "performing",
        value: 105
    },
    film = {
        name: "film",
        value: 104
    },
    sports = {
        name: "sports",
        value: 108
    },
    health = {
        name: "health",
        value: 107
    },
    science = {
        name: "science",
        value: 102
    },
    travel = {
        name: "travel",
        value: 109
    },
    charity = {
        name: "charity",
        value: 111
    },
    religion = {
        name: "religion",
        value: 114
    },
    family = {
        name: "family",
        value: 115
    },
    seasonal = {
        name: "seasonal",
        value: 116
    },
    government = {
        name: "government",
        value: 112
    },
    fashion = {
        name: "fashion",
        value: 106
    },
    religion = {
        name: "religion",
        value: 114
    },
    home = {
        name: "home",
        value: 117
    },
    auto = {
        name: "auto",
        value: 118
    },
    hobbies = {
        name: "hobbies",
        value: 119
    },
    other = {
        name: "other",
        value: 199
    },
    school = {
        name: "school",
        value: 120
    }
]

//Convert single digit integer to two digits
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

//Pair input string with corresponding category value
function meetupSearch(textInput) {
    let validInput = false
    categories.forEach(function(element) {
        if (element.name === textInput) {
            fetchMeetupAPI(element.value)
            validInput = true
        }
    })
    if (validInput === false) {
        window.alert("Invalid Input")
    }
}

let resultsSection = document.getElementById("section--results")
let itenerarySection = document.getElementById("section--itenerary")

let meetupDiv = document.createElement("div")
meetupDiv.setAttribute("id", "meetupDiv")

let meetupInput = document.getElementById("input--meetups")

let meetupButton = document.getElementById("button--meetups")
meetupButton.addEventListener("click", function () {
    let categoryInput = meetupInput.value
    meetupInput.value = ""
    meetupSearch(categoryInput)
})

//Get values for day, month, and year for today and tomorow
let today = new Date
let tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate()+1)
let todayMonth = pad(today.getMonth()+1)
let tomorrowMonth = pad(tomorrow.getMonth()+1)
let todayDay = pad(today.getDate())
let tomorrowDay = pad(tomorrow.getDate())
let todayYear= today.getFullYear()
let tomorrowYear= tomorrow.getFullYear()


//Function to fetch from eventbrite api
function fetchMeetupAPI(category) {
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&location.within=50mi&categories=${category}&start_date.range_start=${todayYear}-${todayMonth}-${todayDay}T06%3A00%3A00&start_date.range_end=${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}T05%3A59%3A59&token=MJMTGPG2SRILJMB5I5LS`, {
        headers: {
            "Accept": "application/json"
        },
    })
        .then(response => response.json())
        .then(events => {createResults(events)})
}

function createResults(events) {
    let resultCounter = 1
    console.log(events)
    if (events.events.length === 0) {
        resultsSection.innerHTML = '<p style="color:red;">No events for this category today</p>'
    } else {
        events.events.forEach(function(element) {
            let span = document.createElement("span")
            span.setAttribute("id", `meetupResult${resultCounter}`)
            span.innerHTML = `${resultCounter}: `
            let result = document.createElement("a")
            result.setAttribute("href", element.url)
            result.innerHTML = element.name.text
            let saveButton = document.createElement("button")
            saveButton.setAttribute("id", `meetupButton${resultCounter}`)
            saveButton.innerHTML = "Save"
            span.appendChild(result)
            span.appendChild(saveButton)
            span.innerHTML += "</br>"
            resultsSection.appendChild(span)
            addSaveListener(resultCounter)
            resultCounter++
        })
    }
}

function addSaveListener(id) {
    console.log(id)
}