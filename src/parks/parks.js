
const fetchData = () => {
    return fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
        .then(parks => parks.json())
}

const parkData = fetchData().then (events => {
console.log(events)
})



//     str = "comm"
//     //console.log(events)
//     parkData.forEach(elt => {
        e = Reflect.ownKeys(elt).filter(s => s.startsWith(str))
//         console.log(e)
//     });
// })

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
