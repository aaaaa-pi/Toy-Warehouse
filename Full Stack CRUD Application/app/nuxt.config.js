export default defineNuxtConfig({
    buildModules:[
        "@nuxtjs/vuetify"
    ],
    modules: [
        "@nuxtjs/axios",
        "@pinia/nuxt",
        {
            autoImports: ['defineStore'],
        },
    ],
    components: true
})