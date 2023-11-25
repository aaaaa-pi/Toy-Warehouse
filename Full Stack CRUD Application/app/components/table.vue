<template>
    <div>
      <h2>Table</h2>
      <v-data-table :headers="headers" :items="items">
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
    { title: "Id", value: "id" },
    { title: "Name", value: "name" },
    { title: "Email", value: "email" },
    { title: "edit", value: "edit" },
    { title: "delete", value: "delete" },
]
const items = [
    {
      name: 'African Elephant',
      species: 'Loxodonta africana',
      diet: 'Herbivore',
      habitat: 'Savanna, Forests',
    },
]
const users = computed(() => {return usersStore.data})
const loadData = async() => {
  const data = await useFetch("http://localhost:4000/users/",
    { 
      method: 'get',
    }).data
  usersStore.storeData(data)
}
const deleteItem = async(id) => {
    await useFetch("http://localhost:4000/users/deleteUser/" + id,
    { 
      method: 'delete',
    })
}
const editItem = async(user) => {
  userStore.setId(user.id)
  userStore.setName(user.name)
  userStore.setEmail(user.email)
  userStore.setPassword(user.password)
}
</script>