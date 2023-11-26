export const useUserStore = defineStore('user', {
    state: () => ({
        id: "",
        name: "",
        email:"",
        password:""
    }),
    actions: {
        setId(data) {
            this.id = data
        },
        setName(data){
            this.name = data
        },
        setEmail(data){
            this.email = data
        },
        setPassword(data){
            this.password = data
        },
    },
  })