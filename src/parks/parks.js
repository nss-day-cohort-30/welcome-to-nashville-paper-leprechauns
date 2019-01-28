//fetch data from api
const ParkFetchParkData = () => {
        return fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
                .then(parks => parks.json())
}
//global variables
const parkInputEl = document.querySelector("#input--park")

const parkSearchButton = document.querySelector("#button--park")

const parkResultEl = document.querySelector("#section--results")

//function to add search result into result section alongwith save button
//arg[0]: index no. 1: park name  2: park address
const parkAddHtmlToResult = (...arg) => {
        parkResultEl.innerHTML += `<div class = "result--${arg[0]}"> ${arg[0]}. ${arg[1]}:  ${arg[2]}
        <button class="save--button--${arg[0]}"> save </button>
        </div>`
}


//event listner on search button click
parkSearchButton.addEventListener("click", () => {
        const parkData = ParkFetchParkData()
                .then(events => {
                        parkResultEl.innerHTML = ""
                        document.querySelector(".hint--park").innerHTML = ""
                        //get the list of keys values search value
                        const keyList = Reflect.ownKeys(events[0]).filter(s => s.startsWith(parkInputEl.value.toLowerCase())).filter(p => p.startsWith(":@") === false)

                        if (keyList.length === 0) {
                                parkResultEl.innerHTML = "Invalid search Input"
                        }
                        else {
                                parkInputEl.value = keyList[0]
                                const selected_parks = events.filter(parks => parks[`${keyList[0]}`] === "Yes")
                                // display search result
                                selected_parks.forEach((park, index) => {
                                        parkAddHtmlToResult(index + 1, park.park_name, park.mapped_location_address)
                                });

                        }
                })
})


//display little hint under input text field
parkInputEl.addEventListener("keyup", () => {
        const parkData = ParkFetchParkData()
                .then(events => {
                        const keyList = Reflect.ownKeys(events[0]).filter(s => s.startsWith(parkInputEl.value.toLowerCase())).filter(p => p.startsWith(":@") === false)
                        if (keyList.length === 0) {
                                document.querySelector(".hint--park").innerHTML = ""
                        }
                        else
                                document.querySelector(".hint--park").innerHTML = keyList[0]
                })
})


//Save button click event--
parkResultEl.addEventListener("click", (evt) => {
        const saveButtonArray = evt.target.className.split("--")
        if (saveButtonArray[0] === "save") {
                console.log(evt.target.className)
                //select the div related to save button
                const parkNameEl = document.querySelector(`.result--${saveButtonArray[2]}`)
                //split the textcontent to get the park Name
                selectedParkName = parkNameEl.textContent.split('.')
                selectedParkName = selectedParkName[1].split(":")
                const addIteneraryEl = document.querySelector("#itenerary--park")
                addIteneraryEl.innerHTML = `Park : ${selectedParkName[0]}`
                parkInputEl.value = ""
                parkResultEl.innerHTML = ""
        }
})

// saveparkSearchButton = document.querySelectorAll("button[class^='save--button']")
// console.log(saveparkSearchButton)
// saveparkSearchButton.forEach((saveButton, index) => {
//         saveButton.addEventListener("click", function(event) {
//                 console.log("test")
//                 selectedSaveEl = document.querySelector(`.save--button--${index}`)
//                 console.log("selectedSaveEl")
//         });
// })
// s


// const filterData = (key) => {
//     fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
//         .then(parks => parks.json())
//         .then(all_parks => {
//             debugger
//             const selected_array = all_parks.filter(parks => parks[`${key}`] === "Yes")
//             console.log(selected_array)
//         })
// }



// const playgroundEL = document.querySelector("#playGround")
// playgroundEL.addEventListener("click", () => {
//     if (playgroundEL.checked) {
//         filterData("playground")
//         fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
//             .then(parks => parks.json())
//             .then(all_parks => {
//                 debugger
//                 const selected_array = all_parks.filter(parks => parks.playground === "Yes")
//                 console.log(selected_array)
//             })
//     }
// })
