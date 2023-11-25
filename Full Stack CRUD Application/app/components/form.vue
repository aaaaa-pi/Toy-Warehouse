<template>
  <div id="form">
    <br />
    <h2>Form</h2>
    <v-form>
      <v-text-field v-model="id" label="Id"></v-text-field>
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" label="Password"></v-text-field>
      <v-btn @click="submit({ id, name, email, password })">{{
        id ? "Edit" : "Submit"
      }}</v-btn>
    </v-form>
  </div>
</template>

<script setup>
import {useUserStore} from "../store/user"
import {useUsers} from "../store/users"
const userStore = useUserStore();
const usersStore = useUsers();
const id = computed({
      get: () => userStore.id,
      set: (value) => userStore.setId(value),
});
const name = computed({
      get: () => userStore.name,
      set: (value) => userStore.setName(value),
});
const email = computed({
      get: () => userStore.email,
      set: (value) => userStore.setEmail(value),
});
const password = computed({
      get: () => userStore.password,
      set: (value) => userStore.setPassword(value),
});

const submit = async(user) => {
  if(user.id){
    await useFetch("http://localhost:4000/users/" + user.id,
    { 
      method: 'put',
      body:{
        name: user.name,
        email: user.email
      }
    })
  } else {
    await useFetch("http://localhost:4000/users/createUser",
    {
      method:'post',
      body:{
        name: user.name,
        email: user.email,
        password: user.password
      }
    })
  }
  resetUser({ id: 0, name: "", email: "", password: "" })
  loadData()
}
const resetUser = (user) => {
  userStore.setId(user.id)
  userStore.setName(user.name)
  userStore.setEmail(user.email)
  userStore.setPassword(user.password)
}
const loadData = async() => {
  const { data, execute } = useFetch("http://localhost:4000/users/",
    { 
      method: 'get',
    })
  await execute(); // 确保数据加载完成
  usersStore.storeData(JSON.stringify(data.value))
}
</script>

<style scoped></style>