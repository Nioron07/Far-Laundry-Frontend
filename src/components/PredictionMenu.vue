<template>
    <div class="text-center">
        <v-btn-toggle v-model="toggle" mandatory shaped color="cyan-darken-4">
            <v-btn @click="changeHall('Oglesby')" :value="0">
                Oglesby
            </v-btn>
            <v-btn @click="changeHall('Trelease')" :value="1">
                Trelease
            </v-btn>
        </v-btn-toggle>
    </div>
    <div class="prediction-card">
        <v-card variant="outlined" color="cyan-accent-2">
            <div class="prediction-card-title">
                <v-card-title>Current Availability: {{ hall }}</v-card-title>
                <v-card-text style="justify-self: center;">As of {{ timestamp }}</v-card-text>
            </div>
            <div class="numDiv justify-space-evenly">
                <div class="card">
                    <div class="pred-header">
                        <h1 style="font-size: 20px;">Number of Washers:</h1>
                    </div>
                    <v-skeleton-loader v-if="loading" type="article" :loading="loading"></v-skeleton-loader>
                    <v-card v-if="!loading" variant="outlined" class="pred-card">
                        <v-card-title class="pred-number">{{ washerPred }}</v-card-title>
                    </v-card>
                </div>
                <div class="card">
                    <div class="pred-header">
                        <h1 style="font-size: 20px;">Number of Dryers:</h1>
                    </div>
                    <v-skeleton-loader v-if="loading" type="article" :loading="loading"></v-skeleton-loader>
                    <v-card v-if="!loading" variant="outlined" class="pred-card">
                        <v-card-title class="pred-number">{{ dryerPred }}</v-card-title>
                    </v-card>
                </div>
            </div>
        </v-card>

    </div>
</template>

<script setup>
import { ref } from 'vue';
const toggle = ref(0)
const hall = ref('Oglesby')
const hallsDict = { "Oglesby": 0, "Trelease": 1 }

const timestamp = ref('')
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
            timestamp.value = data['Timestamp']
            loading.value = false
        }
    )
}
getPrediction()
</script>

<style scoped>
@media only screen and (max-width: 800px) and (min-width: 450px) {
    .prediction-card {
        margin-left: 7% !important;
        margin-right: 7% !important;
        margin-top: 5% !important;
    }
}

@media only screen and (max-width: 450px) {
    .prediction-card {
        margin-left: 3% !important;
        margin-right: 3% !important;
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
        font-size: 23px !important;
    }

    .pred-number {
        font-size: 40px !important;
    }
}

.numDiv {
    display: flex;
}

.prediction-card {
    margin-left: 20%;
    margin-right: 20%;
    justify-content: center;
    margin-top: 1%;
}

.prediction-card-title {
    justify-content: center;
    display: grid;
    font-size: 30px;
    font-family: Oxanium, sans-serif;
}

.hall-selector {
    justify-content: center;
    font-family: Oxanium, sans-serif;
}

.text-center {
    margin-top: 2%;
}

.pred-number {
    font-size: 75px;
    font-family: Oxanium, sans-serif;
    padding-bottom: 0px;
}

.pred-header {
    display: grid;
    justify-content: center;
}

.pred-card {
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;
}

.card {
    margin-top: 1%;
    margin-bottom: 5%;
}
</style>