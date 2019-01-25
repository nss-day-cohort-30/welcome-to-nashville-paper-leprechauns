
const fetchParkData = () => {
        return fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
                .then(parks => parks.json())
}

const inputEl = document.querySelector("#input--park")

const buttonEl = document.querySelector("#button--park")

const resultEl = document.querySelector("#section--results")

const addHtmlToResult = (...arg) => {
        resultEl.innerHTML += `<div class = "result--${arg[0]}"> ${arg[0]}. ${arg[1]} :  ${arg[2]}
        <button class = "save--button--${arg[0]}"> save </button>
        </div>`
}

const addHtmlToIteItenerary = (parkName) => {
        const iteneraryEl = document.querySelector("#section--itenerary")
        iteneraryEl.innerHTML += `<div id = "itenerary--park">parks: ${parkName} </div>`
}


buttonEl.addEventListener("click", () => {
        const parkData = fetchParkData()
                .then(events => {
                        resultEl.innerHTML= ""
                        e = Reflect.ownKeys(events[0]).filter(s => s.startsWith(inputEl.value))
                        inputEl.value = e[0]
                        const selected_parks = events.filter(parks => parks[`${e[0]}`] === "Yes")
                        console.log(selected_parks)
                        selected_parks.forEach((park, index) => {
                                addHtmlToResult(index+1, park.park_name, park.mapped_location_address)
                        });
                })
})


saveButtonEl = document.querySelectorAll([class ^= "save--button"])


inputEl.addEventListener("keyup", () => {
        const parkData = fetchParkData()
                .then(events => {
                        //console.log(events)
                        //debugger
                        e = Reflect.ownKeys(events[0]).filter(s => s.startsWith(inputEl.value))
                        inputEl.placeholder = e[0]
                })

})
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
