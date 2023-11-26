<template>
    <div>
      <h2>Table</h2>
      <v-data-table :headers="headers" :items="users">
        <template v-slot:[`item.edit`]="{ item }">
          <v-btn color="success" @click="editItem(item)"> Edit </v-btn>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-btn color="danger" @click="deleteItem(item)"> Delete </v-btn>
        </template>
      </v-data-table>
    </div>
  </template>
<script setup>
import {useUserStore} from "../store/user"
import {useUsers} from "../store/users"
const userStore = useUserStore();
const usersStore = useUsers();
const headers = [
    { title: "Id", value: "_id" },
    { title: "Name", value: "name" },
    { title: "Email", value: "email" },
    { title: "edit", value: "edit" },
    { title: "delete", value: "delete" },
]

const users = computed(() => {return JSON.parse(JSON.stringify(usersStore.data))})
const loadData = async() => {
  useFetch("http://localhost:4000/users/",
    { 
      method: 'get',
    }).then((res) => {
      usersStore.storeData(res.data.value)
    })
}
const deleteItem = async(item) => {
    await useFetch("http://localhost:4000/users/deleteUser/" + item._id,
    { 
      method: 'delete',
    })
    loadData();
}
const editItem = async(user) => {
  userStore.setId(user._id)
  userStore.setName(user.name)
  userStore.setEmail(user.email)
  userStore.setPassword(user.password)
}
onMounted(async() => {
  await nextTick();
  loadData();
});
</script>