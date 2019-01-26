let meetupApiKey = config.meetupKey

//Array of objects to pair category names with their values
let meetupCategories = [
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

let meetupResultsSection = document.getElementById("section--results")
let meetupItenerarySection = document.getElementById("section--itenerary")

//Convert single digit integer to two digits
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

//Pair input string with corresponding category value
function meetupSearch(textInput) {
    let validInput = false
    meetupCategories.forEach(function(element) {
        if (element.name === textInput) {
            fetchMeetupAPI(element.value)
            validInput = true
        }
    })
    if (validInput === false) {
        meetupResultsSection.innerHTML = '<p style="color:red;">Invalid input</p>'
    }
}

let meetupIteneraryDiv = document.getElementById("itenerary--meetup")

let meetupDiv = document.createElement("div")
meetupDiv.setAttribute("id", "meetupDiv")

let meetupInput = document.getElementById("input--meetups")

let meetupButton = document.getElementById("button--meetups")
meetupButton.addEventListener("click", function () {
    let categoryInput = meetupInput.value
    meetupInput.value = ""
    meetupSearch(categoryInput)
})

meetupInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      meetupButton.click()
    }
  });

//Get values for day, month, and year for today and tomorow
let meetupToday = new Date
let meetupTomorrow = new Date(meetupToday)
meetupTomorrow.setDate(meetupTomorrow.getDate()+1)
let meetupTodayMonth = pad(meetupToday.getMonth()+1)
let meetupTomorrowMonth = pad(meetupTomorrow.getMonth()+1)
let meetupTodayDay = pad(meetupToday.getDate())
let meetupTomorrowDay = pad(meetupTomorrow.getDate())
let meetupTodayYear= meetupToday.getFullYear()
let meetupTomorrowYear= meetupTomorrow.getFullYear()


//Function to fetch from eventbrite api
function fetchMeetupAPI(category) {
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&location.within=50mi&categories=${category}&start_date.range_start=${meetupTodayYear}-${meetupTodayMonth}-${meetupTodayDay}T06%3A00%3A00&start_date.range_end=${meetupTomorrowYear}-${meetupTomorrowMonth}-${meetupTomorrowDay}T05%3A59%3A59&token=${meetupApiKey}`, {
        headers: {
            "Accept": "application/json"
        },
    })
        .then(response => response.json())
        .then(events => {meetupCreateResults(events)})
}

function meetupCreateResults(events) {
    let resultCounter = 1
    console.log(events)
    if (events.events.length === 0) {
        meetupResultsSection.innerHTML = '<p style="color:red;">No meetups for this category today</p>'
    } else {
        meetupResultsSection.innerHTML = ""
        events.events.forEach(function(element) {
            let span = document.createElement("span")
            span.setAttribute("id", `meetupResult${resultCounter}`)
            span.innerHTML = `${resultCounter}: `
            let result = document.createElement("a")
            result.setAttribute("href", element.url)
            result.setAttribute("target", "_blank")
            result.setAttribute("id", `meetupLink${resultCounter}`)
            result.innerHTML = element.name.text
            let saveButton = document.createElement("button")
            saveButton.setAttribute("id", `meetupButton${resultCounter}`)
            saveButton.innerHTML = "Save"
            span.appendChild(result)
            span.appendChild(saveButton)
            span.innerHTML += "</br>"
            meetupResultsSection.appendChild(span)
            meetupAddSaveListener(resultCounter)
            resultCounter++
        })
    }
}

function meetupAddSaveListener(id) {
    let meetupSaveButton = document.getElementById(`meetupButton${id}`)
    meetupSaveButton.addEventListener("click", function () {
        meetupIteneraryDiv.innerHTML = ""
        resultToSave = document.getElementById(`meetupLink${id}`)
        meetupIteneraryDiv.innerHTML = 'Meetup: '
        meetupIteneraryDiv.appendChild(resultToSave)
        meetupResultsSection.innerHTML = ""
    })
}