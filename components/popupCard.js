Vue.component("popup-card", {
    props: ["filmTitle"],
    data() {
        return {

        }
    },
    template: `                    
    <div id="filmPopup" class="card">
        <div class="card-image">
            <figure class="image">
                <img src="images/thumbnails/Fear the Night.png" alt="">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p style="margin-bottom: .5rem;" class="title vollkorn">filmTitle</p>
                    <div class="filmMetaTags">
                        <span class="tag is-dark">Tag1</span>
                        <span class="tag is-dark">Tag2</span> 
                        <span class="tag is-dark">Tag3</span>
                    </div>
                    <div class="filmMetaInfoWrapper">
                        <span class="filmMetaInfoCard">
                            <p class="filmMetaInfoTitle roboto-bold">Regie</p>
                            <p class="filmMetaInfoDesc roboto-light">Hannes</p>
                        </span>
                        <span class="filmMetaInfoCard">
                            <p class="filmMetaInfoTitle roboto-bold">Cast</p>
                            <p class="filmMetaInfoDesc roboto-light">Efe, Hannes</p>
                        </span>
                    </div>

                    <div class="filmMetaLinks">
                        <span class="tag is-light is-link"><a href="">YouTube</a></span>
                        <span class="tag is-light is-link"><a href="">Vimeo</a></span>
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