<template>
    <div class="text-center">
        <v-btn-toggle
        v-model="toggle"
        mandatory
        shaped
        color="cyan-darken-4"
        >
            <v-btn @click="changeHall('Oglesby')" :value="0">
                Oglesby
            </v-btn>
            <v-btn @click="changeHall('Trelease')" :value="1">
                Trelease
            </v-btn>
        </v-btn-toggle>
    </div>
    <v-card class="prediction-card" variant="outlined" color="cyan-accent-2">
        <v-card-title class="prediction-card-title">Current Prediction: {{ hall }}</v-card-title>
        <div class="numDiv justify-space-evenly">
            <div class="card">
                <h1 class="pred-header">Number of Washers:</h1>
                <v-skeleton-loader v-if="loading" type="article" :loading="loading"></v-skeleton-loader>
                <v-card v-if="!loading" variant="outlined" class="pred-card">
                    <v-card-title class="pred-number">{{ washerPred }}</v-card-title>
                </v-card>
            </div>
            <div class="card">
                <h1 class="pred-header">Number of Dryers:</h1>
                <v-skeleton-loader v-if="loading" type="article" :loading="loading"></v-skeleton-loader>
                <v-card v-if="!loading" variant="outlined" class="pred-card">
                    <v-card-title class="pred-number">{{ dryerPred }}</v-card-title>
                </v-card>
            </div>
        </div>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';
const toggle = ref(0)
const hall = ref('Oglesby')
const hallsDict = {"Oglesby": 0, "Trelease": 1}

const loading = ref(true)
const dryerPred = ref("")
const washerPred = ref("")
function changeHall(value) {
    hall.value = value
    getPrediction()
}
async function getPrediction() {
    await (await fetch(`https://backend-1047148175119.us-central1.run.app/current/${hallsDict[hall.value]}`)).json().then(
        (data) => {
            dryerPred.value = data['Dryers']
            washerPred.value = data['Washing Machines']
            loading.value = false
        }
    )
}
getPrediction()
</script>

<style scoped>
@media only screen and (max-width: 800px) and (min-width: 450px) {
  .prediction-card {
    width: 90% !important;
    margin-top: 5% !important;
  }
}

@media only screen and (max-width: 450px) {
  .prediction-card {
    width: 90% !important;
    margin-top: 5% !important;
  }
.numDiv {
    display: inline !important;
}
.card {
    margin-left: 5%;
    margin-right: 5%;
}
.prediction-card-title {
    font-size: 20px !important;
}
.pred-number {
    font-size: 50px !important;
}
}
.numDiv {
    display: flex;
}
.prediction-card {
    width: 60%;
    justify-self: center;
    margin-top: 1%;
}
.prediction-card-title {
    justify-self: center;
    font-size: 30px;
    font-family: Oxanium, sans-serif;
}
.hall-dropdown {
    justify-content: center;
}
.hall-selector {
    justify-content: center;
    font-family: Oxanium, sans-serif;
}
.text-center {
    margin-top: 2%;
}
.hall-button-list {
    justify-self: center;
}
.pred-number {
    font-size: 75px;
    font-family: Oxanium, sans-serif;
    padding-bottom: 0px;
}
.pred-header {
    display: flex;
    font-size: 20px;
    justify-self: center;
}
.pred-card {
    display: flex;
    justify-content: center;
}
.card {
    margin-top: 1%;
    margin-bottom: 5%;
}
</style>