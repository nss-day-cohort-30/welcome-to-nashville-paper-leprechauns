//Varible For Api Key
const restaurantsKey = config.restaurantsKey
const restaurantSection = document.querySelector("#section--results")
let cuisine=document.querySelector("#input--restaurant")
//Gives value of input
    document.getElementById("button--restaurant").addEventListener("click", function () {
    fetch (`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&apikey=${restaurantsKey}&q=${cuisine.value}`) 
    //take response and store it in JSON (calling parsing)
    .then (response => response.json())
    .then (parsedData => {
        console.log(parsedData)
        const restaurantSearchResults = parsedData.restaurants
        // console.log(restaurantSearchResults.restaurants[2].restaurant.name)
        // console.log(restaurantSearchResults.restaurants[2].restaurant.location.address)

        

        
        const restaurantSaveButton= document.querySelector("#resultButton--")

            
            let restaurantResultsHTML = ""   
            for (i = 0; i< restaurantSearchResults.length; i++) {
                let currentRestaurants = restaurantSearchResults[i]
                // console.log(currentRestaurants.restaurant.name)
                // console.log(currentRestaurants.restaurant.location.address)
                restaurantSection.innerHTML += `<div class = "result--${i}"> ${currentRestaurants.restaurant.name}: ${currentRestaurants.restaurant.location.address}</div> <button class = "resultButton--${i}">Save</button>`
            }
        })
    })

            restaurantSection.addEventListener("click", event => {
                const saveButtonArray = event.target.className.split("--")
                console.log(saveButtonArray)
                const restaurantNameAddress =document.querySelector(`.result--${saveButtonArray[1]}`)
                console.log(restaurantNameAddress.textContent)
                const restaurantNameSplit = restaurantNameAddress.textContent.split(":")
                console.log(restaurantNameSplit)
                const addRestaurantInt = document.querySelector("#itenerary--restaurant")    
                addRestaurantInt.innerHTML= `Restaurant ${restaurantNameSplit[0]}`     
                cuisine.value =""
                restaurantSection.innerHTML=""
             })
        // restaurantseResultsComponent(restaurantsSearchResults)
    
   

    //Global Variables 
    let restaurantInput = document.querySelector("#input--restaurant")
    let restaurantSearch = document.querySelector("#button--restaurant")
    // // let restaurantName = restaurantSearchResults.restaurants[i].restaurant.name
    // let restaurantAddress = restaurantSearchResults.restaurants[i].restaurant.location.address
    // let restaurantFoodType = restaurantSearchResults.restaurants[i].restaurant.cuisines
     


//     function restaurantsResultsComponent() { 

        
//         let restaurantResultsHTML = ""   
//         for (i = 0; i< restaurantsSearchResults.length; i++) {
//             let currentRestaurants = restaurantSearchResults.restaurants[i]
//             console.log(currentRestaurants)
//             // let restaurantName = currentRestaurants.restaurant.name
//             // let restaurantAddress = currentRestaurants.restaurant.location.address
//             // let restaurantFoodType = currentRestaurants.restaurant.cuisines

            
//             if(currentRestaurants.restaurant.cuisine === restaurantFoodType){
//                 restaurantResultsHTML += `<section id="section--results${i}">${restaurants[0].restaurant.name}, ${restaurants[0].restaurant.address}</section>`
                
//         }
//                 restaurantResult.innerHTML = restaurantResultsHTML
//     }
// }