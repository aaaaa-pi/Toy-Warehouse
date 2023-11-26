export const useUsers = defineStore('users', {
    state: () => ({
        data: []
    }),
    actions: {
        storeData(data) {
             this.data = data
        }
    },
})