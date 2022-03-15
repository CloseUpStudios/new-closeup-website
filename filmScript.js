function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const HOST = "https://www.cr4yfish.digital:8443";
//const HOST = "http://localhost:8443";

// get description for title film 


(function getInitFilmInfo() {

  getFilmByName("Fear the night")
  .then(function (response) {

    const meta = document.getElementById("meta");

    if(response.length > 0) {
      
      const film = response[0];

      meta.querySelector("h1").textContent = film.name;
      meta.querySelector("span").textContent = film.desc;
      meta.querySelector(".btn-secondary").setAttribute("id", film._id);
      meta.querySelector(".btn-primary").setAttribute("onclick", `window.open('${film.link}', 'blank')`)


    } else {
      // no film returned
      meta.querySelector("h1").textContent = "No film info found";
      meta.querySelector("span").innerHTML = "This could be a result of either: <ol><li>Bakend server down</li><li>No film by that name has been found</li><li>Javascript just doesn't feel like it today</li></ol>"
    }

  })

})();

//

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
  

  if(condition == 0 ) {
    // element is being closed
    e.setAttribute("data-isOpen", "false");
  }
}

async function filmCardOpen(e, condition) {

    // first time tapping on same object -> do nothing
    // 2nd time -> go to "else"
  if(vw < 500 && e.getAttribute("data-isOpen") != "true")  {
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

        // fill in content

        const filmId = e.getAttribute("id");

        getFilmByID(filmId)
        .then(function (project) {

          popup.setAttribute("data-id", project._id);

          popup.querySelector(".title").textContent = project.name;
          popup.querySelector("#director").textContent = project.director;
          popup.querySelector("#cast").textContent = project.cast;
          getImage(project.imageName)
          .then(function (imgUrl) {
            popup.querySelector("#imgsrc").setAttribute("src", imgUrl);
          })
          // tags

            const tags = [project.date, project.projectType]

            tags.forEach(tag => {
              let span = document.createElement("span");
                span.setAttribute("class", "tag is-dark");
                span.textContent = tag;
                popup.querySelector(".filmMetaTags").appendChild(span);
            })

          //

          // links

            const links = project.extraLinks;
            links.unshift(project.link);

            links.forEach(link => {
              let span = document.createElement("span");
                span.setAttribute("class", "tag is-light is-link");
              popup.querySelector(".filmMetaLinks").appendChild(span);

                let anchor = document.createElement("a");
                  anchor.textContent = "YouTube";
                  anchor.setAttribute("href", link);
                span.appendChild(anchor);
            })
            
          //

          popup.querySelector(".content").textContent = project.desc;


        })
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

  // remove old data

  let tags = document.querySelector(".filmMetaTags").childNodes

  for(let i = tags.length-1; i >= 0 ; i--) {
    tags[i].remove();
  }

  let links = document.querySelector(".filmMetaLinks").childNodes;

  for(let i = links.length-1; i >= 0 ; i--) {
    links[i].remove();
  }
}

/*
<div  :id=filmTitle onclick="filmCardOpen(this, 1)" onmouseenter="filmCardDetails(this, 1)" onmouseleave="filmCardDetails(this, 0)" class="filmCard">
<figure class="image is-9by16">
    <div class="filmMeta">
        <h2 class="filmMetaTitle vollkorn">{{filmTitle}}</h2>
        <div class="filmMetaTags">
            <span class="tag is-dark">Tag1</span>
            <span class="tag is-dark">Tag2</span> 
            <span class="tag is-dark">Tag3</span>
        </div>
    </div>
    <img :src="'images/thumbnails/'+filmTitle+'.png'" :alt=filmTitle>
</figure>
</div>
*/

function makeFilmCard(title, tags, imageSrc, id, reqParent) {
  let parent = document.getElementById(`${reqParent}`);
  
  // make wrapper
  let cardWrapper = document.createElement("div");
    cardWrapper.setAttribute("class", "filmCard");
    cardWrapper.setAttribute("onclick","filmCardOpen(this,1)");
    cardWrapper.setAttribute("onmouseenter", "filmCardDetails(this,1)");
    cardWrapper.setAttribute("onmouseleave", "filmCardDetails(this,0)");
    cardWrapper.setAttribute("id", id);
  parent.appendChild(cardWrapper);

    let figure = document.createElement("figure");
      figure.setAttribute("class", "image is-9by16");
    cardWrapper.appendChild(figure);

      let filmMeta = document.createElement("div");
        filmMeta.setAttribute("class","filmMeta");
      figure.appendChild(filmMeta);

        let titleH2 = document.createElement("h2");
          titleH2.setAttribute("class", "filmMetaTitle vollkorn");
          titleH2.textContent = title;
        filmMeta.appendChild(titleH2);

        let tagsWrapper = document.createElement("div");
          tagsWrapper.setAttribute("class", "filmMetaTags");
        filmMeta.appendChild(tagsWrapper);

          // tags
          tags.forEach(tag => {
            let singleTag = document.createElement("span");
              singleTag.setAttribute("class", "tag is-dark");
              singleTag.textContent = tag;
              tagsWrapper.appendChild(singleTag);
          })
          //

      let image = document.createElement("img");
          image.setAttribute("loading", "lazy");
          getImage(imageSrc)
          .then(function (imageURL) {
            image.src = imageURL;
          })
        
        image.setAttribute("alt", title);
      figure.appendChild(image);
}



function fetchFilm(titleOrId, whatToGet, projectType) {

  clearFilms();

  const getAllFilms = "projectDetails/film/all/all"
  const getFilmByTitle = `projectDetails/film/${titleOrId}/all`


  let url;

  switch (whatToGet) {
    case "all":
      url = getAllFilms;
      break;
    case "film":
      url = getFilmByTitle;
      break;
    case "action":
      url = "projectDetails/film/all/action";
      break;
    case "drama":
      url = "projectDetails/film/all/drama";
      break;
  }

  const fetchOptions = {
    method: "GET"
  }

  fetch(`${HOST}/${url}`, fetchOptions)
  .then(res => res.json())

  .then(function(response) {
    //console.log(response);
    response.forEach(item => {
      makeFilmCard(item.name, [item.date, item.projectType], item.imageName, item._id, projectType);
    })
  })
}

function getFilmByName(name) {
  return new Promise(function (resolve, reject) {
    const url = `projectDetails/film/${name}/all`

    const fetchOptions = {
      method: "GET"
    }
  
    fetch(`${HOST}/${url}`, fetchOptions)
    .then(res => res.json())
  
    .then(function(response) {
      //console.log(response);
      resolve(response)
    })
  })
}

function getFilmByID(id) {
  return new Promise(function (resolve, reject) {
    const url = `getProjectById/${id}`

    const fetchOptions = {
      method: "GET"
    }
  
    fetch(`${HOST}/${url}`, fetchOptions)
    .then(res => res.json())
  
    .then(function(response) {
      //console.log(response);
      resolve(response)
    })
  })
}


function getImage(imageName) {

  return new Promise(function (resolve, reject) {
      //console.log(imageName)
      if(imageName == "") {
          resolve(imageName)
      }

      const url = `getImage/${imageName}`;
      const requestUrl = `${HOST}/${url}`
  
      const options = {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      }
      
      fetch(requestUrl, options)
  
      .then(response => response.blob())
  
      .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          //console.log(imageUrl);
          resolve(imageUrl);
      })
  })
}

let timeout = null;

function initSearch() {
  document.getElementById("filmsearch").addEventListener("input", function(e) {

    clearTimeout(timeout)
    timeout = setTimeout(function() {
  
        // check if input is empty, if so just call all projects, will throw error otherwise
        if(e.target.value == "") {
          fetchFilm("x", "all", "films");
        } else {
          console.log("fetching " + e.target.value);
          fetchFilm(e.target.value , "film", "films");
        }
    }, 500);
  })
}

// only clears films
function clearFilms() {
  let films = document.getElementById("films").childNodes;

  for(let i = films.length - 1; i >= 0; i--) {
    films[i].remove();
  }
}

function cardPlayBtnHover(condition) {
  // 1 -> hover in
  // 0 -> hover out

  if(condition == 1) {
    // hover in
    document.getElementById("cardPlayBtnOverlay").style.opacity = "0"
    document.getElementById("playerBtn").style.fill = "white";
  }
  else if(condition == 0) {
    // hover in
    document.getElementById("cardPlayBtnOverlay").style.opacity = "0.75"
    document.getElementById("playerBtn").style.fill = "rgba(255, 255, 255, 0.705)";
  }
}

function cardPlayBtnClick(element) {
  const id = element.parentNode.getAttribute("data-id");
  const url = element.parentNode.querySelector(".is-link a").getAttribute("href");

  console.log(id, url);

  window.open(url, "_blank");
}


// fetch all films
fetchFilm("x", "all", "films");
fetchFilm("x", "action", "action");
fetchFilm("x", "drama", "drama");
