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
        height="235vh" />
    <apexchart class="week-chart" type="area" :series="weekChartSeries" :options="weekChartOptions"
        :width="weekChartWidth" height="235vh" />
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
localStorage.clear()
const selectionMenu = ref(true)
const toggle = ref(0)
const dayWasherData = ref([])
const dayDryerData = ref([])
const customDate = ref(new Date())
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
    forecastDataPoints: {
        count: 23 - new Date().getHours()
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
            offsetX: -30,
            tools: {
                pan: false,
                download: false
            }
        },
        background: 'transparent'
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
        categories: [
    "12:00AM", "12:10AM", "12:20AM", "12:30AM", "12:40AM", "12:50AM",
    "1:00AM", "1:10AM", "1:20AM", "1:30AM", "1:40AM", "1:50AM",
    "2:00AM", "2:10AM", "2:20AM", "2:30AM", "2:40AM", "2:50AM",
    "3:00AM", "3:10AM", "3:20AM", "3:30AM", "3:40AM", "3:50AM",
    "4:00AM", "4:10AM", "4:20AM", "4:30AM", "4:40AM", "4:50AM",
    "5:00AM", "5:10AM", "5:20AM", "5:30AM", "5:40AM", "5:50AM",
    "6:00AM", "6:10AM", "6:20AM", "6:30AM", "6:40AM", "6:50AM",
    "7:00AM", "7:10AM", "7:20AM", "7:30AM", "7:40AM", "7:50AM",
    "8:00AM", "8:10AM", "8:20AM", "8:30AM", "8:40AM", "8:50AM",
    "9:00AM", "9:10AM", "9:20AM", "9:30AM", "9:40AM", "9:50AM",
    "10:00AM", "10:10AM", "10:20AM", "10:30AM", "10:40AM", "10:50AM",
    "11:00AM", "11:10AM", "11:20AM", "11:30AM", "11:40AM", "11:50AM",
    "12:00PM", "12:10PM", "12:20PM", "12:30PM", "12:40PM", "12:50PM",
    "1:00PM", "1:10PM", "1:20PM", "1:30PM", "1:40PM", "1:50PM",
    "2:00PM", "2:10PM", "2:20PM", "2:30PM", "2:40PM", "2:50PM",
    "3:00PM", "3:10PM", "3:20PM", "3:30PM", "3:40PM", "3:50PM",
    "4:00PM", "4:10PM", "4:20PM", "4:30PM", "4:40PM", "4:50PM",
    "5:00PM", "5:10PM", "5:20PM", "5:30PM", "5:40PM", "5:50PM",
    "6:00PM", "6:10PM", "6:20PM", "6:30PM", "6:40PM", "6:50PM",
    "7:00PM", "7:10PM", "7:20PM", "7:30PM", "7:40PM", "7:50PM",
    "8:00PM", "8:10PM", "8:20PM", "8:30PM", "8:40PM", "8:50PM",
    "9:00PM", "9:10PM", "9:20PM", "9:30PM", "9:40PM", "9:50PM",
    "10:00PM", "10:10PM", "10:20PM", "10:30PM", "10:40PM", "10:50PM",
    "11:00PM", "11:10PM", "11:20PM", "11:30PM", "11:40PM", "11:50PM"
],
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
    const BASE_URL = 'https://backend-1047148175119.us-central1.run.app';

    // Identify which localStorage keys to read based on `toggle.value`.
    const washerKey = toggle.value === 0 ? 'dayWasherDataOg' : 'dayWasherDataTr';
    const dryerKey = toggle.value === 0 ? 'dayDryerDataOg' : 'dayDryerDataTr';

    // 1. Fetch current usage data (for “right now”).
    const currentRes = await fetch(`${BASE_URL}/current/${toggle.value}`);
    const currentJson = await currentRes.json();
    const currentWash = currentJson['Washing Machines'];
    const currentDry = currentJson['Dryers'];

    // 2. Set up checks for new day or outdated data.
    const todayString = new Date().getDate().toString();   // e.g. "11"
    const storedDay = window.localStorage.getItem('currentDay');
    const currentHourIdx = new Date().getHours();

    // Pull existing data from localStorage (for whichever “hall” is in use).
    const storedWasherData = window.localStorage.getItem(washerKey)?.split(',') || [];
    const storedDryerData = window.localStorage.getItem(dryerKey)?.split(',') || [];

    // Decide if data must be re-fetched.
    const isNewDay = todayString !== storedDay;
    const isWashOutdated = currentWash != null && currentWash != storedWasherData[currentHourIdx];
    const isDryOutdated = currentDry != null && currentDry != storedDryerData[currentHourIdx];

    // Additionally, check if Og/Tr data is missing altogether for both "0" and "1".
    const missingDayWasherOg = !window.localStorage.getItem('dayWasherDataOg');
    const missingDayDryerOg = !window.localStorage.getItem('dayDryerDataOg');
    const missingDayWasherTr = !window.localStorage.getItem('dayWasherDataTr');
    const missingDayDryerTr = !window.localStorage.getItem('dayDryerDataTr');

    const isDataMissing = (
        missingDayWasherOg || missingDayDryerOg ||
        missingDayWasherTr || missingDayDryerTr
    );
    console.log(isNewDay + '\n' + isWashOutdated + '\n' + isDryOutdated + '\n' + isDataMissing)
    // 3. If day is new, data is outdated, or localStorage is missing daily data, 
    //    then fetch the day predictions (for both 0 and 1 toggles).
    if (isNewDay || isWashOutdated || isDryOutdated || isDataMissing) {
        // Clear reactive data.
        dayDryerData.value = [];
        dayWasherData.value = [];

        // --- Fetch + store "Og" predictions ---
        if (missingDayWasherOg || missingDayDryerOg || isNewDay || isWashOutdated || isDryOutdated) {
            const todayOgRes = await fetch(`${BASE_URL}/today/0`);
            const todayOgJson = await todayOgRes.json();

            window.localStorage.setItem('dayWasherDataOg',
                Object.values(todayOgJson['Washing Machines']['Predictions']).toString()
            );
            window.localStorage.setItem('dayDryerDataOg',
                Object.values(todayOgJson['Dryers']['Predictions']).toString()
            );
            window.localStorage.setItem('dayWashHighOg', todayOgJson['Washing Machines']['High']);
            window.localStorage.setItem('dayWashLowOg', todayOgJson['Washing Machines']['Low']);
            window.localStorage.setItem('dayDryHighOg', todayOgJson['Dryers']['High']);
            window.localStorage.setItem('dayDryLowOg', todayOgJson['Dryers']['Low']);
        }

        // --- Fetch + store "Tr" predictions ---
        if (missingDayWasherTr || missingDayDryerTr || isNewDay || isWashOutdated || isDryOutdated) {
            const todayTrRes = await fetch(`${BASE_URL}/today/1`);
            const todayTrJson = await todayTrRes.json();

            window.localStorage.setItem('dayWasherDataTr',
                Object.values(todayTrJson['Washing Machines']['Predictions']).toString()
            );
            window.localStorage.setItem('dayDryerDataTr',
                Object.values(todayTrJson['Dryers']['Predictions']).toString()
            );
            window.localStorage.setItem('dayWashHighTr', todayTrJson['Washing Machines']['High']);
            window.localStorage.setItem('dayWashLowTr', todayTrJson['Washing Machines']['Low']);
            window.localStorage.setItem('dayDryHighTr', todayTrJson['Dryers']['High']);
            window.localStorage.setItem('dayDryLowTr', todayTrJson['Dryers']['Low']);
        }

        // Update "currentDay" in local storage since we've confirmed a new fetch
        window.localStorage.setItem('currentDay', todayString);

        // Also update the current time in localStorage
        const timeRes = await fetch(`${BASE_URL}/currentTime`);
        const timeJson = await timeRes.json();
        window.localStorage.setItem('currentTime', timeJson['Time']);
    }

    // 4. Verify that the hour in localStorage time is still current.
    let currentHour = new Date().getHours() % 12;
    if (currentHour === 0) currentHour = 12;

    const storedTime = window.localStorage.getItem('currentTime') || '';
    const [, storedTimeHMS] = storedTime.split(' ') || []; // e.g. ["2025-01-11", "05:32:10"]
    const storedHour = storedTimeHMS ? storedTimeHMS.split(':')[0] : null;

    if (currentHour.toString() !== storedHour) {
        const timeRes = await fetch(`${BASE_URL}/currentTime`);
        const timeJson = await timeRes.json();
        window.localStorage.setItem('currentTime', timeJson['Time']);
    }

    // 5. Update the chart annotation for the current time
    const latestTime = (window.localStorage.getItem('currentTime') || '').split(' ')[1] || '';
    dayChartOptions.value.annotations.xaxis[0].x = latestTime;

    // 6. Populate chart data for whichever hall is in use
    if (hall === 0) {
        dayChartSeries.value[0].data = (window.localStorage.getItem('dayWasherDataOg') || '').split(',');
        dayChartSeries.value[1].data = (window.localStorage.getItem('dayDryerDataOg') || '').split(',');

        dayChartOptions.value.annotations.xaxis[1].x = window.localStorage.getItem('dayWashHighOg') || '';
        dayChartOptions.value.annotations.xaxis[2].x = window.localStorage.getItem('dayWashLowOg') || '';
        dayChartOptions.value.annotations.xaxis[3].x = window.localStorage.getItem('dayDryHighOg') || '';
        dayChartOptions.value.annotations.xaxis[4].x = window.localStorage.getItem('dayDryLowOg') || '';
    } else {
        dayChartSeries.value[0].data = (window.localStorage.getItem('dayWasherDataTr') || '').split(',');
        dayChartSeries.value[1].data = (window.localStorage.getItem('dayDryerDataTr') || '').split(',');

        dayChartOptions.value.annotations.xaxis[1].x = window.localStorage.getItem('dayWashHighTr') || '';
        dayChartOptions.value.annotations.xaxis[2].x = window.localStorage.getItem('dayWashLowTr') || '';
        dayChartOptions.value.annotations.xaxis[3].x = window.localStorage.getItem('dayDryHighTr') || '';
        dayChartOptions.value.annotations.xaxis[4].x = window.localStorage.getItem('dayDryLowTr') || '';
    }
}


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
    forecastDataPoints: {
        count: 167 - new Date().getHours()
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
    const BASE_URL = 'https://backend-1047148175119.us-central1.run.app';

    const washerKey = toggle.value === 0 ? 'dayWasherDataOg' : 'dayWasherDataTr';
    const dryerKey = toggle.value === 0 ? 'dayDryerDataOg' : 'dayDryerDataTr';

    const currentRes = await fetch(`${BASE_URL}/current/${toggle.value}`);
    const currentJson = await currentRes.json();
    const currentWash = currentJson['Washing Machines'];
    const currentDry = currentJson['Dryers'];

    const localWasherDataStr = window.localStorage.getItem(washerKey);
    const localDryerDataStr = window.localStorage.getItem(dryerKey);

    const storedWasherData = localWasherDataStr ? localWasherDataStr.split(',') : [];
    const storedDryerData = localDryerDataStr ? localDryerDataStr.split(',') : [];

    const currentHour = new Date().getHours();
    const storedWashForHour = storedWasherData[currentHour];
    const storedDryForHour = storedDryerData[currentHour];

    const isWashOutdated = (currentWash == null || currentWash != storedWashForHour);
    const isDryOutdated = (currentDry == null || currentDry != storedDryForHour);

    const missingOgData =
        !window.localStorage.getItem('weekWasherDataOg') ||
        !window.localStorage.getItem('weekDryerDataOg') ||
        !window.localStorage.getItem('weekWashHighOg') ||
        !window.localStorage.getItem('weekWashLowOg') ||
        !window.localStorage.getItem('weekDryHighOg') ||
        !window.localStorage.getItem('weekDryLowOg') ||
        !window.localStorage.getItem('weekChartLabels');

    const missingTrData =
        !window.localStorage.getItem('weekWasherDataTr') ||
        !window.localStorage.getItem('weekDryerDataTr') ||
        !window.localStorage.getItem('weekWashHighTr') ||
        !window.localStorage.getItem('weekWashLowTr') ||
        !window.localStorage.getItem('weekDryHighTr') ||
        !window.localStorage.getItem('weekDryLowTr');

    const isWeekDataMissing = (missingOgData || missingTrData);

    if (isWeekDataMissing || isWashOutdated || isDryOutdated) {
        weekChartSeries.value[0].data = [];
        weekChartSeries.value[1].data = [];
        if (missingOgData || isWashOutdated || isDryOutdated) {
            const weekOgRes = await fetch(`${BASE_URL}/week/0`);
            const weekOgJson = await weekOgRes.json();

            const weekOgWasherArr = Object.values(weekOgJson['Washing Machines']).slice(0, -2);
            const weekOgDryerArr = Object.values(weekOgJson['Dryers']).slice(0, -2);
            const weekChartLabelsArr = Object.keys(weekOgJson['Dryers']).slice(0, -2);

            window.localStorage.setItem('currentTime', weekOgJson['Current Time']);
            window.localStorage.setItem('weekWasherDataOg', weekOgWasherArr.toString());
            window.localStorage.setItem('weekDryerDataOg', weekOgDryerArr.toString());
            window.localStorage.setItem('weekChartLabels', weekChartLabelsArr.toString());
            window.localStorage.setItem('weekWashHighOg', weekOgJson['Washing Machines'].High);
            window.localStorage.setItem('weekWashLowOg', weekOgJson['Washing Machines'].Low);
            window.localStorage.setItem('weekDryHighOg', weekOgJson['Dryers'].High);
            window.localStorage.setItem('weekDryLowOg', weekOgJson['Dryers'].Low);
        }

        if (missingTrData || isWashOutdated || isDryOutdated) {
            const weekTrRes = await fetch(`${BASE_URL}/week/1`);
            const weekTrJson = await weekTrRes.json();

            const weekTrWasherArr = Object.values(weekTrJson['Washing Machines']).slice(0, -2);
            const weekTrDryerArr = Object.values(weekTrJson['Dryers']).slice(0, -2);

            window.localStorage.setItem('weekWasherDataTr', weekTrWasherArr.toString());
            window.localStorage.setItem('weekDryerDataTr', weekTrDryerArr.toString());
            window.localStorage.setItem('weekWashHighTr', weekTrJson['Washing Machines'].High);
            window.localStorage.setItem('weekWashLowTr', weekTrJson['Washing Machines'].Low);
            window.localStorage.setItem('weekDryHighTr', weekTrJson['Dryers'].High);
            window.localStorage.setItem('weekDryLowTr', weekTrJson['Dryers'].Low);
        }

        const timeRes = await fetch(`${BASE_URL}/currentTime`);
        const timeJson = await timeRes.json();
        window.localStorage.setItem('currentTime', timeJson['Time']);

        weekChartWidth.value = '101%';
    }

    {
        const timeFromStorage = window.localStorage.getItem('currentTime') || '';
        const [, storedTimeHMS] = timeFromStorage.split(' ');
        const storedHour = storedTimeHMS ? storedTimeHMS.split(':')[0] : '';

        let nowHour = new Date().getHours() % 12;
        if (nowHour === 0) nowHour = 12;

        if (nowHour.toString() !== storedHour) {
            const timeRes = await fetch(`${BASE_URL}/currentTime`);
            const timeJson = await timeRes.json();
            window.localStorage.setItem('currentTime', timeJson['Time']);
        }
    }

    weekChartOptions.value.annotations.xaxis[0].x = window.localStorage.getItem('currentTime') || '';

    const weekLabelsStr = window.localStorage.getItem('weekChartLabels') || '';
    weekChartOptions.value.xaxis.categories = weekLabelsStr.split(',');
    console.log(weekChartOptions.value.xaxis.categories)

    if (hall === 0) {
        weekChartSeries.value[0].data = (window.localStorage.getItem('weekWasherDataOg') || '').split(',');
        weekChartSeries.value[1].data = (window.localStorage.getItem('weekDryerDataOg') || '').split(',');

        weekChartOptions.value.annotations.xaxis[1].x = window.localStorage.getItem('weekWashHighOg') || '';
        weekChartOptions.value.annotations.xaxis[2].x = window.localStorage.getItem('weekWashLowOg') || '';
        weekChartOptions.value.annotations.xaxis[3].x = window.localStorage.getItem('weekDryHighOg') || '';
        weekChartOptions.value.annotations.xaxis[4].x = window.localStorage.getItem('weekDryLowOg') || '';
    } else {
        weekChartSeries.value[0].data = (window.localStorage.getItem('weekWasherDataTr') || '').split(',');
        weekChartSeries.value[1].data = (window.localStorage.getItem('weekDryerDataTr') || '').split(',');

        weekChartOptions.value.annotations.xaxis[1].x = window.localStorage.getItem('weekWashHighTr') || '';
        weekChartOptions.value.annotations.xaxis[2].x = window.localStorage.getItem('weekWashLowTr') || '';
        weekChartOptions.value.annotations.xaxis[3].x = window.localStorage.getItem('weekDryHighTr') || '';
        weekChartOptions.value.annotations.xaxis[4].x = window.localStorage.getItem('weekDryLowTr') || '';
    }
}
updateGraphs()

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
@media only screen and (max-width: 800px) {
    .toggle-div {
        margin-top: 3% !important;
        margin-bottom: 3%;
    }
}

.toggle-div {
    margin-top: 1.5%;
    display: flex;
    justify-content: center;
}

.dateSelect {
    width: fit-content;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
}
</style>