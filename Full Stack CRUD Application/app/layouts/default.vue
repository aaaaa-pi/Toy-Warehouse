<template>
    <div>
        <v-app>
      <v-main>
        <v-app-bar>
          <v-app-bar-title> Home </v-app-bar-title>
        </v-app-bar>
        <v-container justify="center" align="center">
          <slot />
        </v-container>
      </v-main>
    </v-app>
    </div>
</template>

<script setup>

</script>

<style>

</style>