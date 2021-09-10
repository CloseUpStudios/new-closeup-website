Vue.component("popup-card", {
    props: ["filmTitle"],
    data() {
        return {

        }
    },
    template: `                    
    <div id="filmPopup" class="card">
        <div onmouseenter="cardPlayBtnHover(1);" onmouseleave="cardPlayBtnHover(0);" onclick="cardPlayBtnClick(this);" class="card-image">
            <svg id="playerBtn" xmlns="http://www.w3.org/2000/svg" width="136.738" height="136.738" viewBox="0 0 136.738 136.738"><path d="M70.619,2.25a68.369,68.369,0,1,0,68.369,68.369A68.369,68.369,0,0,0,70.619,2.25Zm36.529,72.667-53.719,29.3a4.789,4.789,0,0,1-7.228-4.3v-58.6a4.834,4.834,0,0,1,7.275-4.2l53.719,29.3a4.884,4.884,0,0,1,0,8.595Z" transform="translate(-2.25 -2.25)"/></svg>
            <div id="cardPlayBtnOverlay" > </div>
            <figure class="image">
                <img id="imgsrc" src="images/thumbnails/Fear the Night.png" alt="">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p style="margin-bottom: .5rem;" class="title vollkorn">filmTitle</p>
                    <div class="filmMetaTags">
                    </div>
                    <div class="filmMetaInfoWrapper">
                        <span class="filmMetaInfoCard">
                            <p class="filmMetaInfoTitle roboto-bold">Regie</p>
                            <p id="director" class="filmMetaInfoDesc roboto-light">Hannes</p>
                        </span>
                        <span class="filmMetaInfoCard">
                            <p class="filmMetaInfoTitle roboto-bold">Cast</p>
                            <p id="cast" class="filmMetaInfoDesc roboto-light">Efe, Hannes</p>
                        </span>
                    </div>

                    <div class="filmMetaLinks">
                    </div>
                </div>
            </div>

            <div class="content">Der erste Kurzfilm von Hannes Seebeck. Durch diesen brillant durchdachten Psycho-Thriller beweist der junge Regisseur sein enormes Potenzial. Um die wahre Bedeutung der Handlung wird ein Geheimnis gemacht, wofür der renommierte Schauspieler Efecan Yar und die Catering-Legenden Aitor und Eenko Holtkamp den Filmemacher lobten.</div>
            <button onclick="closeFilmCard(this, 0)" class="btn btn-tertiary"><a>close</a></button>
        </div>

    </div>
    `
})

var card = new Vue({
    el: "#mainView"
})