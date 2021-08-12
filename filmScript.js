function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });



const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

function filmCardDetails(e, condition) {

  e.querySelector(".filmMeta").style.opacity = condition;

  console.log(condition);


  if(condition == 0 ) {
    // element is being closed
    e.setAttribute("data-isOpen", "false");
  }
}


async function filmCardOpen(e, condition) {

  console.log("Is it opened?" , e.getAttribute("data-isOpen"));

    // first time tapping on same object -> do nothing
    // 2nd time -> go to "else"
  if(vw < 500 && e.getAttribute("data-isOpen") != "true") {
    console.log("first time")
    e.setAttribute("data-isOpen", "true");

  } 
  else 
  {
    // reset
    e.setAttribute("data-isOpen", "false");


    let popup = document.getElementById("filmPopup");
    let overlay = document.getElementById("overlay");
  
    if(condition == 1) {
        popup.style.display = "block";
        popup.style.opacity = condition;
        overlay.style.display = "block";
        overlay.style.opacity = condition;
    } 
  
  }

}

async function closeFilmCard(e, condition) {

  let popup = document.getElementById("filmPopup");
  let overlay = document.getElementById("overlay");

  popup.style.opacity = condition;
  overlay.style.opacity = condition;
  await sleep(500);
  popup.style.display = "none";
  overlay.style.display = "none";
}