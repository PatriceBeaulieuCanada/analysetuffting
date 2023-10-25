<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UseCallApi } from "./service/UseCallApi";
import { useToast } from "primevue/usetoast";
import "./assets/app.css";

const startDate = ref(new Date());
const endDate = ref(new Date());
const stopReasons = ref();
const chartData = ref();
const chartOptions = ref();
const chartData1 = ref();
const chartOptions1 = ref();
const tufter = ref();
const param = {action:"",date1:new Date,date2:new Date,tufter:""}
let data ={histstopReasons:[]}

const toast = useToast();

const handleClick = async () => {
  
  param.date1 = new Intl.DateTimeFormat('en-US').format(startDate.value) as any
  param.date2 = new Intl.DateTimeFormat('en-US').format(endDate.value) as any

  if(tufter!=null && tufter.value!= undefined){
    console.log("chus passer la: "+tufter)
    param.tufter = tufter.value.name as any;
  }else{
    param.tufter = "all"
    console.log("chus passer else: "+tufter.value)
  }  
  param.action = 'GetAnalyse'
  data= await UseCallApi(param)
  stopReasons.value = data.histstopReasons as any
  console.log(data)

};

const infoToast = () => {
  toast.add({
    severity: "success",
    summary: "PrimeTime",
    detail: "salut",
    life: 2000,
  });
};

onMounted(() => {
  // UseCallApi({action:'GetEmployee'}).then((data:any)=> (employees.value = data));
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  chartData1.value = setChartData1();
  chartOptions1.value = setChartOptions1();
});


const tufters = ref([
  { name: "T01", id: "1" },
  { name: "T04", id: "2" },
  { name: "T09", id: "3" },
  { name: "T21", id: "4" },
  { name: "T26", id: "5" },
  { name: "T27", id: "6" },
  { name: "T34", id: "7" },
  { name: "T43", id: "8" },
  { name: "T44", id: "9" },
  { name: "T48", id: "10" },
]);


const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};


const setChartData1 = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--teal-500')
            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: documentStyle.getPropertyValue('--orange-500'),
                tension: 0.4,
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    };
};
const setChartOptions1 = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>

<template>
  <Toast></Toast>
  <div class="app">
    <div class="mainContainer">
      <div class="mainHeader">
        <div class="item1">
          <Dropdown
            v-model="tufter"
            :options="tufters"
            optionLabel="name"
            placeholder="Choisir un touffeteur"
            class="w-full md:w-14rem"
          />
        </div>
        <div class="item">
          <label>Date Début</label>
          <Calendar v-model="startDate" dateFormat="yy/mm/dd" />
        </div>
        <div class="item">
          <label>Date fin</label>
          <Calendar v-model="endDate" dateFormat="yy/mm/dd" />
        </div>
        <Button
          class="bntCSS"
          label=" Validez"
          @click="handleClick"
          icon="pi pi-chart-bar"
        ></Button>
      </div>
      <div class="mainGrid1">        
          <DataTable class="gridCSS" :value="stopReasons" tableStyle="min-width: 50rem" scrollable scrollHeight="100%" showGridlines>
            <Column field="stopTime" header="Début arrêt">
              <template #body="{ data }">{{ new Date(data.stopTime).toLocaleString() }}</template>
            </Column>
            <Column field="restartTime" header="Fin arrêt">
              <template #body="{ data }">{{ new Date(data.restartTime).toLocaleString() }}</template>
            </Column>
            <Column field="category" header="Durée"></Column>
            <Column field="quantity" header="Opérateur"></Column>
            <Column field="humainStopReason.name" header="Raison"></Column>
            <Column field="comment" header="Commentaire"></Column>
          </DataTable>        
      </div>
      <div class="mainGrid2">
        <Chart type="pie" :data="chartData" :options="chartOptions" class="chartCSS" />
      </div>
      <div class="mainGrid3">
        <Chart type="line" :data="chartData1" :options="chartOptions1" class="chartCSS" />
      </div>
      <div class="mainGrid4">
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  grid-template-rows: 10% 25% 25% auto;
  row-gap: 3px;
}

.mainHeader {
  border: 2px solid black;
  border-radius: 5px;
  grid-column: 1/11;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mainHeader .item {
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.mainHeader .item1 {
  margin-right: 20px;
}

.bntCSS {
  width: 90px;
  height: 40px;
  padding: 5px;
  margin-left: 10px;
}

.mainGrid1 {
  border: 2px solid black;
  border-radius: 5px;
  grid-column: 1/7;
  grid-row: 2/4;
  padding: 5px;
}

.mainGrid1 .gridCSS{
  height: 100%;
  width: 100%;
}

.mainGrid2 {
  display: block;
  border: 2px solid black;
  border-radius: 5px;
  grid-column: 7/11;
  grid-row: 2/4;
  padding: 5px;
}

.chartCSS{
  height: 90%;
  width: 90%;
}

.mainGrid3 {
  display: block;
  border: 2px solid black;
  border-radius: 5px;
  grid-column: 1/8;
  grid-row: 4/6;
  padding: 5px;
}

.mainGrid4 {
  display: block;
  border: 2px solid black;
  border-radius: 5px;
  grid-column: 8/11;
  grid-row: 4/6;
  padding: 5px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
