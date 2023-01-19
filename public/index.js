let buttonArray = document.querySelectorAll("button")  //get all the buttons currently in the DOM and throw them in an array
buttonArray.forEach((el,i) => {  //put an event listener on all of them; it activates the toggle function
  el.addEventListener("click", toggleIMG)
})


function toggleIMG(event) {
  let imgArr = document.querySelectorAll("img")  //get all img elements currently in the DOM; they will be stored in an array
  for (let i = 0; i < imgArr.length; i++) {  //looping through that array of img elements
    if (imgArr[i].classList.contains(event.target.id)) {  //if the img element currently being looked at by the loop contains a class that is identical to the ID of the button pressed
      imgArr[i].classList.toggle('hidden')  //switch that particular img element from hidden to visible and vice versa
  }
}
}

/*
Optimizations:
The toggle image function is way too narrow.  It currently only works with Anthuria because her ID is hardcoded into it with getElementById.  
  SOLVED!  1/18/23
It still has the problem of only working with characters that have exactly two pictures.  More than that and this falls apart.
Dynamic Character selection:  
  Can I use App.get(/:characterID)?  Using the character's individual ID as a query parameter might be how I can dynamically create a new element with their data.
    tried it but ejs kept giving me constant trouble.  need to explore this more
    React might be better?
*/