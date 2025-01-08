<template>
    <div class="toggle-div">
        <v-btn-toggle v-model="toggle" mandatory shaped color="lime-darken-4">
            <v-btn @click="updateGraphs()" :value="0">
                Oglesby
            </v-btn>
            <v-btn @click="updateGraphs()" :value="1">
                Trelease
            </v-btn>
        </v-btn-toggle>
    </div>
    <apexchart class="day-chart" type="area" :series="dayChartSeries" :options="dayChartOptions" width="100%"
        height="36%" />
    <apexchart class="week-chart" type="area" :series="weekChartSeries" :options="weekChartOptions"
        :width="weekChartWidth" height="36%" />
    <div class="d-flex justify-center ma-10">

        <v-dialog max-width="1000" persistent>
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn prepend-icon="mdi-chart-box-plus-outline" stacked color="lime-darken-4" v-bind="activatorProps"
                    @click="selectionMenu = true">
                    Custom Chart
                </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
                <v-card class="chartCard" rounded="xl" v-show="selectionMenu">
                    <div>
                        <div class="d-flex justify-center pa-8">
                            <v-date-picker v-model="customDate" color="lime-darken-4" elevation="15" rounded="xl"
                                show-adjacent-months width="1000">
                            </v-date-picker>
                        </div>
                        <div class="d-flex justify-center">
                            <v-btn color="lime-darken-4" elevation="15" rounded="pill" text="Get Forecast"
                                class="dateSelect" @click="updateCustomSeriesData()" :loading="loading"></v-btn>
                        </div>
                        <v-card-actions class="pa-3">
                            <v-spacer></v-spacer>

                            <v-btn text="Close" @click="isActive.value = false"></v-btn>
                        </v-card-actions>
                    </div>
                </v-card>

                <v-card v-show="!selectionMenu" class="graphCard pa-1" rounded="xl">
                    <apexchart class="custom-chart" type="area" :key="chartKey" :series="customChartSeries"
                        :options="customChartOptions" height="513" />

                    <div class="d-flex justify-center">
                        <v-btn color="lime-darken-4" elevation="15" rounded="pill" text="Pick another date"
                            class="dateSelect" @click="selectionMenu = true"></v-btn>
                    </div>
                    <v-card-actions class="pa-2">
                        <v-spacer></v-spacer>

                        <v-btn text="Close" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script setup>

const selectionMenu = ref(true)
const toggle = ref(0)
const dayWasherData = ref([])
const dayDryerData = ref([])
const customDate = ref()
const chartKey = ref(0)
const loading = ref(false)
const dayChartSeries = ref([
    {
        name: 'Washers',
        data: dayWasherData
    },
    {
        name: 'Dryers',
        data: dayDryerData
    }
])

const dayChartOptions = ref({
    noData: {
        text: "Retrieving Data...",
        offsetY: -40,
        style: {
            color: '#EEFF41',
            fontSize: '50px',
            fontFamily: 'Oxanium'
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#EEFF41', '#FFAB00'],
    stroke: {
        curve: 'straight'
    },
    chart: {
        toolbar: {
            show: false
        },
        background: 'transparent',
        zoom: {
            enabled: false
        }
    },
    title: {
        text: 'Full Day Forecast',
        align: 'left',
        style: {
            fontFamily: 'Oxanium',
            color: '#827717'
        }
    },
    grid: {
        row: {
            colors: ['#242424', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: ["12:00AM", "1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM", "10:00PM", "11:00PM",],
        labels: {
            style: {
                fontFamily: 'Oxanium',
                fontSize: '8px',
                colors: '#827717'
            }
        },
        tooltip: {
            enabled: false
        }
    },
    yaxis: {
        min: 0,
        max: 15,
        labels: {
            style: {
                fontFamily: 'Oxanium',
                colors: '#827717'
            }
        }
    },
    legend: {
        fontFamily: 'Oxanium',
        labels: {
            useSeriesColors: true
        },
        markers: {
            strokeWidth: 0,
            size: 8
        }
    },
    tooltip: {
        followCursor: true,
        theme: true,
        style: {
            fontFamily: 'Oxanium'
        }
    },
    theme: {
        mode: 'dark'
    },
    annotations: {
        xaxis: [{
            x: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, }).replace(/:\d{2}/, ":00").toUpperCase().replace(" ", ""),
            strokeDashArray: 7,
            borderColor: '#E65100',
            label: {
                borderColor: '#E65100',
                style: {
                    color: '#fff',
                    background: '#E65100',
                    fontFamily: 'Oxanium'
                },
                text: 'Current Time',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#4A148C',
            label: {
                borderColor: '#4A148C',
                style: {
                    color: '#fff',
                    background: '#4A148C',
                    fontFamily: 'Oxanium'
                },
                text: 'Washer High',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#EA80FC',
            label: {
                borderColor: '#EA80FC',
                style: {
                    color: '#fff',
                    background: '#EA80FC',
                    fontFamily: 'Oxanium'
                },
                text: 'Washer Low',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#1B5E20',
            label: {
                borderColor: '#1B5E20',
                style: {
                    color: '#fff',
                    background: '#1B5E20',
                    fontFamily: 'Oxanium'
                },
                text: 'Dryer High',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#43A047',
            label: {
                borderColor: '#43A047',
                style: {
                    color: '#fff',
                    background: '#43A047',
                    fontFamily: 'Oxanium'
                },
                text: 'Dryer Low',
            }
        }]
    }
})

async function updateDaySeriesData(hall) {
    var currentDay = new Date().getDate().toString()
    if (currentDay != window.localStorage.getItem("currentDay")) {
        dayDryerData.value = []
        dayWasherData.value = []
        await (await fetch(`https://backend-1047148175119.us-central1.run.app/today/0`)).json().then(
            (data) => {
                window.localStorage.setItem("dayWasherDataOg", Object.values(data['Washing Machines']['Predictions']).toString())
                window.localStorage.setItem("dayDryerDataOg", Object.values(data['Dryers']['Predictions']).toString())
                window.localStorage.setItem("dayWashHighOg", data['Washing Machines']["High"])
                window.localStorage.setItem("dayWashLowOg", data['Washing Machines']["Low"])
                window.localStorage.setItem("dayDryHighOg", data['Dryers']["High"])
                window.localStorage.setItem("dayDryLowOg", data['Dryers']["Low"])
            }
        )
        await (await fetch(`https://backend-1047148175119.us-central1.run.app/today/1`)).json().then(
            (data) => {
                window.localStorage.setItem("dayWasherDataTr", Object.values(data['Washing Machines']['Predictions']).toString())
                window.localStorage.setItem("dayDryerDataTr", Object.values(data['Dryers']['Predictions']).toString())
                window.localStorage.setItem("dayWashHighTr", data['Washing Machines']["High"])
                window.localStorage.setItem("dayWashLowTr", data['Washing Machines']["Low"])
                window.localStorage.setItem("dayDryHighTr", data['Dryers']["High"])
                window.localStorage.setItem("dayDryLowTr", data['Dryers']["Low"])
            }
        )
        await (await fetch(`https://backend-1047148175119.us-central1.run.app/currentTime`)).json().then(
            (data) => {
                window.localStorage.setItem("currentTime", data["Time"])
            }
        )
    }
    var currentHour = new Date().getHours().toString() % 12
    if (currentHour == 0) {
        currentHour = 12
    }
    if (currentHour != window.localStorage.getItem("currentTime").split(" ")[1].split(":")[0]) {
        await (await fetch(`https://backend-1047148175119.us-central1.run.app/currentTime`)).json().then(
            (data) => {
                window.localStorage.setItem("currentTime", data["Time"])
            }
        )
    }
    dayChartOptions.value["annotations"].xaxis[0].x = window.localStorage.getItem("currentTime").split(" ")[1]

    if (hall == 0) {
        dayChartSeries.value[0]['data'] = window.localStorage.getItem("dayWasherDataOg").split(",")
        dayChartSeries.value[1]['data'] = window.localStorage.getItem("dayDryerDataOg").split(",")
        dayChartOptions.value["annotations"].xaxis[1].x = window.localStorage.getItem("dayWashHighOg")
        dayChartOptions.value["annotations"].xaxis[2].x = window.localStorage.getItem("dayWashLowOg")
        dayChartOptions.value["annotations"].xaxis[3].x = window.localStorage.getItem("dayDryHighOg")
        dayChartOptions.value["annotations"].xaxis[4].x = window.localStorage.getItem("dayDryLowOg")
    } else {
        dayChartSeries.value[0]['data'] = window.localStorage.getItem("dayWasherDataTr").split(",")
        dayChartSeries.value[1]['data'] = window.localStorage.getItem("dayDryerDataTr").split(",")
        dayChartOptions.value["annotations"].xaxis[1].x = window.localStorage.getItem("dayWashHighTr")
        dayChartOptions.value["annotations"].xaxis[2].x = window.localStorage.getItem("dayWashLowTr")
        dayChartOptions.value["annotations"].xaxis[3].x = window.localStorage.getItem("dayDryHighTr")
        dayChartOptions.value["annotations"].xaxis[4].x = window.localStorage.getItem("dayDryLowTr")
    }
}
updateDaySeriesData(toggle.value)

const weekChartSeries = ref([
    {
        name: 'Washers',
        data: []
    },
    {
        name: 'Dryers',
        data: []
    }
])

const weekChartOptions = ref({
    noData: {
        text: "Retrieving Data...",
        offsetY: -30,
        style: {
            color: '#EEFF41',
            fontSize: '50px',
            fontFamily: 'Oxanium'
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#EEFF41', '#FFAB00'],
    stroke: {
        curve: 'straight'
    },
    chart: {
        background: 'transparent',
        toolbar: {
            offsetX: -30,
            tools: {
                pan: false,
                download: false
            }
        }
    },
    title: {
        text: '7-Day Forecast',
        align: 'left',
        style: {
            fontFamily: 'Oxanium',
            color: '#827717'
        }
    },
    grid: {
        row: {
            colors: ['#242424', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: [],
        labels: {
            show: false
        },
        labels: {
            rotate: 0,
            style: {
                fontFamily: 'Oxanium',
                fontSize: '8px',
                colors: '#827717'
            }
        },
    },
    yaxis: {
        min: 0,
        max: 15,
        labels: {
            style: {
                fontFamily: 'Oxanium',
                colors: '#827717'
            }
        }
    },
    legend: {
        fontFamily: 'Oxanium',
        labels: {
            useSeriesColors: true
        },
        markers: {
            strokeWidth: 0,
            size: 8
        }
    },
    tooltip: {
        followCursor: true,
        theme: true,
        style: {
            fontFamily: 'Oxanium'
        }
    },
    theme: {
        mode: 'dark'
    },
    annotations: {
        xaxis: [{
            x: '',
            strokeDashArray: 7,
            borderColor: '#E65100',
            label: {
                borderColor: '#E65100',
                style: {
                    color: '#fff',
                    background: '#E65100',
                    fontFamily: 'Oxanium'
                },
                text: 'Current Time',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#4A148C',
            label: {
                borderColor: '#4A148C',
                style: {
                    color: '#fff',
                    background: '#4A148C',
                    fontFamily: 'Oxanium'
                },
                text: 'Washer High',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#EA80FC',
            label: {
                borderColor: '#EA80FC',
                style: {
                    color: '#fff',
                    background: '#EA80FC',
                    fontFamily: 'Oxanium'
                },
                text: 'Washer Low',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#1B5E20',
            label: {
                borderColor: '#1B5E20',
                style: {
                    color: '#fff',
                    background: '#1B5E20',
                    fontFamily: 'Oxanium'
                },
                text: 'Dryer High',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#43A047',
            label: {
                borderColor: '#43A047',
                style: {
                    color: '#fff',
                    background: '#43A047',
                    fontFamily: 'Oxanium'
                },
                text: 'Dryer Low',
            }
        }]
    }
})

function updateGraphs() {
    updateDaySeriesData(toggle.value)
    updateWeekSeriesData(toggle.value)
}
const weekChartWidth = ref('100%')
async function updateWeekSeriesData(hall) {
    var currentDay = new Date().getDate().toString()
    if (currentDay != window.localStorage.getItem("currentDay")) {
        weekChartSeries.value[0]['data'] = []
        weekChartSeries.value[1]['data'] = []
        await (await fetch("https://backend-1047148175119.us-central1.run.app/week/0")).json().then(
            (data) => {
                window.localStorage.setItem("currentDay", new Date().getDate().toString())
                window.localStorage.setItem("currentTime", data['Current Time'])
                window.localStorage.setItem("weekWasherDataOg", Object.values(data['Washing Machines']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
                window.localStorage.setItem("weekDryerDataOg", Object.values(data['Dryers']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
                window.localStorage.setItem("weekChartLabels", Object.keys(data['Dryers']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
                window.localStorage.setItem("weekWashHighOg", data['Washing Machines']["High"])
                window.localStorage.setItem("weekWashLowOg", data['Washing Machines']["Low"])
                window.localStorage.setItem("weekDryHighOg", data['Dryers']["High"])
                window.localStorage.setItem("weekDryLowOg", data['Dryers']["Low"])
            }
        )
        await (await fetch("https://backend-1047148175119.us-central1.run.app/week/1")).json().then(
            (data) => {
                window.localStorage.setItem("weekWasherDataTr", Object.values(data['Washing Machines']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
                window.localStorage.setItem("weekDryerDataTr", Object.values(data['Dryers']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
                window.localStorage.setItem("weekWashHighTr", data['Washing Machines']["High"])
                window.localStorage.setItem("weekWashLowTr", data['Washing Machines']["Low"])
                window.localStorage.setItem("weekDryHighTr", data['Dryers']["High"])
                window.localStorage.setItem("weekDryLowTr", data['Dryers']["Low"])
            }
        )
        await (await fetch(`https://backend-1047148175119.us-central1.run.app/currentTime`)).json().then(
            (data) => {
                window.localStorage.setItem("currentTime", data["Time"])
            }
        )
        weekChartWidth.value = '101%'
    }
    var currentHour = new Date().getHours().toString() % 12
    if (currentHour == 0) {
        currentHour = 12
    }
    if (currentHour != window.localStorage.getItem("currentTime").split(" ")[1].split(":")[0]) {
        await (await fetch(`https://backend-1047148175119.us-central1.run.app/currentTime`)).json().then(
            (data) => {
                window.localStorage.setItem("currentTime", data["Time"])
            }
        )
    }
    weekChartOptions.value["annotations"].xaxis[0].x = window.localStorage.getItem("currentTime")
    weekChartOptions.value['xaxis'].categories = window.localStorage.getItem("weekChartLabels").split(",")
    if (hall == 0) {
        weekChartSeries.value[0]['data'] = window.localStorage.getItem("weekWasherDataOg").split(",")
        weekChartSeries.value[1]['data'] = window.localStorage.getItem("weekDryerDataOg").split(",")
        weekChartOptions.value["annotations"].xaxis[1].x = window.localStorage.getItem("weekWashHighOg")
        weekChartOptions.value["annotations"].xaxis[2].x = window.localStorage.getItem("weekWashLowOg")
        weekChartOptions.value["annotations"].xaxis[3].x = window.localStorage.getItem("weekDryHighOg")
        weekChartOptions.value["annotations"].xaxis[4].x = window.localStorage.getItem("weekDryLowOg")
    } else {
        weekChartSeries.value[0]['data'] = window.localStorage.getItem("weekWasherDataTr").split(",")
        weekChartSeries.value[1]['data'] = window.localStorage.getItem("weekDryerDataTr").split(",")
        weekChartOptions.value["annotations"].xaxis[1].x = window.localStorage.getItem("weekWashHighTr")
        weekChartOptions.value["annotations"].xaxis[2].x = window.localStorage.getItem("weekWashLowTr")
        weekChartOptions.value["annotations"].xaxis[3].x = window.localStorage.getItem("weekDryHighTr")
        weekChartOptions.value["annotations"].xaxis[4].x = window.localStorage.getItem("weekDryLowTr")
    }
}
updateWeekSeriesData(toggle.value)

const customChartSeries = ref([
    {
        name: 'Washers',
        data: []
    },
    {
        name: 'Dryers',
        data: []
    }
])

const customChartOptions = ref({
    noData: {
        text: "Retrieving Data...",
        offsetY: -40,
        style: {
            color: '#EEFF41',
            fontSize: '50px',
            fontFamily: 'Oxanium'
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#EEFF41', '#FFAB00'],
    stroke: {
        curve: 'straight'
    },
    chart: {
        toolbar: {
            show: false
        },
        background: 'transparent',
        zoom: {
            enabled: false
        }
    },
    title: {
        text: '',
        align: 'left',
        style: {
            fontFamily: 'Oxanium',
            color: '#827717'
        }
    },
    grid: {
        row: {
            colors: ['#242424', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: ["12:00AM", "1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM", "10:00PM", "11:00PM",],
        labels: {
            style: {
                fontFamily: 'Oxanium',
                fontSize: '8px',
                colors: '#827717'
            }
        },
        tooltip: {
            enabled: false
        }
    },
    yaxis: {
        min: 0,
        max: 15,
        labels: {
            style: {
                fontFamily: 'Oxanium',
                colors: '#827717'
            }
        }
    },
    legend: {
        fontFamily: 'Oxanium',
        labels: {
            useSeriesColors: true
        },
        markers: {
            strokeWidth: 0,
            size: 8
        }
    },
    tooltip: {
        followCursor: true,
        theme: true,
        style: {
            fontFamily: 'Oxanium'
        }
    },
    theme: {
        mode: 'dark'
    },
    annotations: {
        xaxis: [{
            x: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, }).replace(/:\d{2}/, ":00").toUpperCase().replace(" ", ""),
            strokeDashArray: 7,
            borderColor: '#E65100',
            label: {
                borderColor: '#E65100',
                style: {
                    color: '#fff',
                    background: '#E65100',
                    fontFamily: 'Oxanium'
                },
                text: 'Current Time',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#4A148C',
            label: {
                borderColor: '#4A148C',
                style: {
                    color: '#fff',
                    background: '#4A148C',
                    fontFamily: 'Oxanium'
                },
                text: 'Washer High',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#EA80FC',
            label: {
                borderColor: '#EA80FC',
                style: {
                    color: '#fff',
                    background: '#EA80FC',
                    fontFamily: 'Oxanium'
                },
                text: 'Washer Low',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#1B5E20',
            label: {
                borderColor: '#1B5E20',
                style: {
                    color: '#fff',
                    background: '#1B5E20',
                    fontFamily: 'Oxanium'
                },
                text: 'Dryer High',
            }
        },
        {
            x: '',
            strokeDashArray: 7,
            borderColor: '#43A047',
            label: {
                borderColor: '#43A047',
                style: {
                    color: '#fff',
                    background: '#43A047',
                    fontFamily: 'Oxanium'
                },
                text: 'Dryer Low',
            }
        }]
    }
})

async function updateCustomSeriesData() {
    
    loading.value = true
    let date = customDate.value
    let day = date.getDate()
    let month = date.getMonth() + 1
    await (await fetch(`https://backend-1047148175119.us-central1.run.app/day/${toggle.value}/dayOfMonth/${day}/month/${month}`)).json().then(
        (data) => {
            customChartSeries.value[0]['data'] = Object.values(data['Washing Machines']['Predictions'])
            customChartSeries.value[1]['data'] = Object.values(data['Dryers']['Predictions'])
            customChartOptions.value["annotations"].xaxis[1].x = data['Washing Machines']['High']
            customChartOptions.value["annotations"].xaxis[2].x = data['Washing Machines']['Low']
            customChartOptions.value["annotations"].xaxis[3].x = data['Dryers']['High']
            customChartOptions.value["annotations"].xaxis[4].x = data['Dryers']['Low']
        }
    )
    customChartOptions.value.title.text = `Forecast for ${customDate.value.toString().slice(0, 15)}`
    chartKey.value = chartKey.value + 1
    loading.value = false
    selectionMenu.value = false

}
</script>

<style scoped>
.toggle-div {
    margin-top: 1.5%;
    display: flex;
    justify-content: center;
}

.dateSelect {
    width: 20%;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
}
</style>