<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
  <v-card
    class="title-card"
    variant="plain"
    color="cyan-accent-2"
  >
    <v-card-title class="page-title">FAR Laundry Tool</v-card-title>
    <v-card-subtitle class="page-subtitle">Created by Matthew Hirstius</v-card-subtitle>
  </v-card>
  <PredictionMenu />
  <div style="display: grid; justify-content: center;">
  <v-card variant="outlined" color="cyan-accent-2" class="d-flex justify-center align-center pa-2 ma-5" style="width: fit-content;" rounded="pill">
      <v-card-text>
        Numbers incorrect? Try
        <a href="/contribute">contributing!</a>
      </v-card-text>
  </v-card>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 800px) and (min-width: 450px) {
  .page-title {
    font-size: 50px !important;
  }
}
@media only screen and (max-width: 450px) {
  .page-title {
    font-size: 30px !important;
  }
}
.page-title {
  font-family: Oxanium, sans-serif;
  font-size: 75px;
  padding-bottom: 0px;
}
.page-subtitle {
  font-family: Oxanium, sans-serif;
  justify-self: center;
  font-size: 12px;
}
.title-card {
  display: grid;
  justify-content: center;
}
</style>
