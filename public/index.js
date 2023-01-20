/***** Image Toggle Functionality *****/

let buttonArray = document.querySelectorAll("button")  //get all the buttons currently in the DOM and throw them in an array
console.log(buttonArray)
buttonArray.forEach((el,i) => {  //put an event listener on all of them; it activates the toggle function
  el.addEventListener("click", toggleIMG)
})

//Dependency:  the following function only works due to how the home.ejs is currently set.  Buttons are set to have an ID of that character's ID in the database.  The images also have a CLASS equal to their ID in the database.  It is by comparing the ID and class numbers to ensure they're the same that each character can have a unique toggle button to themselves.
function toggleIMG(event) {
  let imgArr = document.querySelectorAll("img")  //get all img elements currently in the DOM; they will be stored in an array
  for (let i = 0; i < imgArr.length; i++) {  //looping through that array of img elements
    if (imgArr[i].classList.contains(event.target.id)) {  //if the img element currently being looked at by the loop contains a class that is identical to the ID of the button pressed
      imgArr[i].classList.toggle('hidden')  //switch that particular img element from hidden to visible and vice versa
    }
  }
}


/****** QUERY DATABASE FOR CHARACTER DATA ******/

//Put event listeners on all <li>s that have the "result" class
let resultArray = document.querySelectorAll(".result")
console.log(resultArray)
resultArray.forEach((el,i) => {
  el.addEventListener("click", getCharData)
})
//when those listeners hear a click, they send a request for data to the database
async function getCharData(event) {
  const res = await fetch(`localhost:3000/api/${event.target.dataset.charId}`)
  const data = await res.json()
  console.log(data)
}

/*
Optimizations:
More Images! - It still has the problem of only working with characters that have exactly two pictures.  More than that and this falls apart.

Dynamic Character selection:  
  Can I use App.get(/:characterID)?  Using the character's individual ID as a query parameter might be how I can dynamically create a new element with their data.
    tried it but ejs kept giving me constant trouble.  need to explore this more
    React might be better?
    Use fetches on client-side?
    !  I think client side fetches have solved this, but I won't know until I get the site hosted.  localhost prevents me from testing it fully.
    
Enhance! - When character images are clicked, you get a full size version in-window.  Kinda like clicking the magnifying glass in GBF itself.

Solved Issues:
The toggle image function is way too narrow.  It currently only works with Anthuria because her ID is hardcoded into it with getElementById.  
  SOLVED! - Now all character entries on the page should have their own img toggler 1/18/23

*/


/* TEST AREA



*/

