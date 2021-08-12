let member = "test"

Vue.component("member-card", {
    props: [ "member", "social", "about" ],
    data() {
        return {

        }
    },
    template: `                        
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image">
                        <img :src="'images/member/'+member+'.png'">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="title">{{member}}</div>
                    <div class="subtitle">@{{social}}</div>
                </div>
            </div>

            <div class="content">
                {{about}}
            </div>
        </div>
    </div>`
})

var core = new Vue({
    el: "#core-team"
})

var extended = new Vue({
    el: "#extended-team"
})