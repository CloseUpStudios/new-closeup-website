Vue.component("film-card", {
    props: ["filmTitle"],
    data() {
        return {

        }
    },
    template: `                    
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
    `
})

var card = new Vue({
    el: "#films"
})