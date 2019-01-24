fetch ("https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&startDateTime=2019-01-24T06:00:01Z&endDateTime=2019-01-25T06:00:00Z&keyword=music&apikey=MqDKE2kPYJihkI1bA4caKHsLSKNQjBoW")
    .then(response => response.json())
    .then(parsedData => {
        console.log(parsedData)
    })

    // .com/discovery/v2/events.json?city=nashville&
    // "https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&startDateTime=2019-01-24T06:00:01Z&endDateTime=2019-01-25T06:00:00Z&keyword=music&apikey=MqDKE2kPYJihkI1bA4caKHsLSKNQjBoW"