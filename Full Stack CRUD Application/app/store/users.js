// export const state = () => ({
//     data: []
//  })
 
//  export const mutations = {
//      storeData: (state, data) => {
//          state.data = data
//      }
//  }
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