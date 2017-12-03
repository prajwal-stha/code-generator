import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VuePrism from 'vue-prism'

/* eslint-disable no-new */
import 'prismjs/themes/prism.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue.js'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.use(BootstrapVue)
Vue.use(VuePrism)
Vue.component('icon', Icon)
Vue.config.productionTip = false
Vue.mixin({
    methods: {
        /*
        * https://codepen.io/tatthien/pen/xVBxZQ
        */
        generateSlug: function (title) {
            let slug = ''
            const titleLower = title.toLowerCase()
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
            slug = slug.replace(/đ/gi, 'd')
            slug = slug.replace(/\s*$/g, '')
            slug = slug.replace(/\s+/g, '-')
            return slug
        },
        generateLabelSlug: function (title) {
            let slug = ''
            const titleLower = title.toLowerCase()
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
            slug = slug.replace(/đ/gi, 'd')
            slug = slug.replace(/\s*$/g, '')
            slug = slug.replace(/\s+/g, '_')
            return slug
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#wpd-app',
    template: '<App/>',
    components: { App }
})
