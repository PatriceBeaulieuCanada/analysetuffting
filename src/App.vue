<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UseCallApi } from "./service/UseCallApi";
import { useToast } from "primevue/usetoast";
import "./assets/app.css";

const startDate = ref(new Date());
const endDate = ref(new Date());
const stopReasons = ref();
const infoTuffter = ref();
const gip800 = ref();
const tufterAction = ref();
const chartData = ref();
const chartOptions = ref();
const chartData1 = ref();
const chartOptions1 = ref();
const tufter = ref();
const dt1 = ref();
const dt2 = ref();
const dt3 = ref();
const dt4 = ref();
const param = { action: "", date1: new Date(), date2: new Date(), tufter: "" };
let data = { histStopInfosEntities: [],tufterInfoBalleEntities:[],gip800entities:[],tufterActionEntities:[]};

const toast = useToast();

const handleClick = async () => {
  param.date1 = new Intl.DateTimeFormat("en-US").format(startDate.value) as any;
  param.date2 = new Intl.DateTimeFormat("en-US").format(endDate.value) as any;

  if (tufter != null && tufter.value != undefined) {
    //console.log("chus passer la: " + tufter);
    param.tufter = tufter.value.name as any;
  } else {
    param.tufter = "all";
    //console.log("chus passer else: " + tufter.value);
  }
  param.action = "GetAnalyse";
  data = await UseCallApi(param);
  stopReasons.value = data.histStopInfosEntities;
  infoTuffter.value = data.tufterInfoBalleEntities;
  gip800.value = data.gip800entities;
  tufterAction.value = data.tufterActionEntities
  console.log(data);
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
  { name: "all", id: "1" },
  { name: "T01", id: "2" },
  { name: "T04", id: "3" },
  { name: "T09", id: "4" },
  { name: "T21", id: "5" },
  { name: "T26", id: "6" },
  { name: "T27", id: "7" },
  { name: "T34", id: "8" },
  { name: "T43", id: "9" },
  { name: "T44", id: "10" },
  { name: "T48", id: "11" },
  { name: "T50", id: "12" },
  { name: "T53", id: "13" },
  { name: "T54", id: "14" },
  { name: "T55", id: "15" },
  { name: "T56", id: "16" },
  { name: "T57", id: "17" },
  { name: "T62", id: "18" },
  { name: "T64", id: "19" },
  { name: "T65", id: "20" },
  { name: "T66", id: "21" },
  { name: "T67", id: "22" },
  { name: "T69", id: "23" },
  { name: "T70", id: "23" }
]);

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue("--blue-500"),
          documentStyle.getPropertyValue("--yellow-500"),
          documentStyle.getPropertyValue("--green-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--blue-400"),
          documentStyle.getPropertyValue("--yellow-400"),
          documentStyle.getPropertyValue("--green-400"),
        ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  };
};

const setChartData1 = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderDash: [5, 5],
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--teal-500"),
      },
      {
        label: "Third Dataset",
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: true,
        borderColor: documentStyle.getPropertyValue("--orange-500"),
        tension: 0.4,
        backgroundColor: "rgba(255,167,38,0.2)",
      },
    ],
  };
};
const setChartOptions1 = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const exportCSV1 = () => {
    dt1.value.exportCSV();
};

const exportCSV2 = () => {
    dt2.value.exportCSV();
};

const exportCSV3 = () => {
    dt3.value.exportCSV();
};

const exportCSV4 = () => {
    dt4.value.exportCSV();
};

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
        <DataTable
          class="gridCSS"
          :value="stopReasons"
          tableStyle="min-width: 50rem"
          scrollable
          scrollHeight="95%"
          showGridlines
          ref="dt1"
        >
          <template #header>
            <div style="text-align: left">
              <Button
                id="grid1"
                icon="pi pi-external-link"
                label="Export"
                @click="exportCSV1()"
              />
            </div>
          </template>
          <Column field="machine.name" header="Touffeteur" :style="{textAlign: 'left'}"></Column>
          <Column field="stopTime" header="Début arrêt" :style="{textAlign: 'center' }">
            <template #body="{ data }">{{
              new Date(data.stopTime).toLocaleString()
            }}</template>
          </Column>
          <Column field="restartTime" header="Fin arrêt" :style="{textAlign: 'center' }">
            <template #body="{ data }">{{
              new Date(data.restartTime).toLocaleString()
            }}</template>
          </Column>
          <Column field="elapsedTime" header="Durée (minutes)" :style="{textAlign: 'center' }">
            <template #body="{ data }">{{
              parseFloat(data.elapsedTime).toFixed(2)
            }}</template>
          </Column>
          <Column field="stopReason" header="Raison" :style="{textAlign: 'center' }"></Column>
          <Column field="comment" header="Commentaire" :style="{textAlign: 'left'}"></Column>
        </DataTable>
      </div>
      <div class="mainGrid2">
        <DataTable
          class="gridCSS"
          :value="infoTuffter"
          tableStyle="min-width: 1rem"
          scrollable
          scrollHeight="95%"
          showGridlines
          ref="dt2"
        >
          <template #header>
            <div style="text-align: left">
              <Button
                id="grid2"
                icon="pi pi-external-link"
                label="Export"
                @click="exportCSV2()"
              />
            </div>
          </template>
          <Column field="dateTime" header="Date" :style="{textAlign: 'center'}">
            <template #body="{ data }">{{
              new Date(data.dateTime).toLocaleString()
            }}</template>
          </Column>       
          <Column field="machine" header="Touffeteur" :style="{textAlign: 'center'}"></Column>
          <Column field="tufftinginfo.name" header="Nom" :style="{textAlign: 'center'}"></Column>
          <Column field="value" header="Valeur" :style="{textAlign: 'center',alignHeader:'center' }"></Column>
        </DataTable>
      </div>
      <div class="mainGrid3">
        <DataTable
          class="gridCSS"
          :value="gip800"
          tableStyle="min-width: 1rem"
          scrollable
          scrollHeight="95%"
          showGridlines
          ref="dt3"
        >
          <template #header>
            <div style="text-align: left">
              <Button
                id = 'grid3'
                icon="pi pi-external-link"
                label="Export"
                @click="exportCSV3()"
              />
            </div>
          </template>          
          <Column field="dateTime" header="Date" :style="{textAlign: 'center'}">
              <template #body="{ data }">{{
                new Date(data.dateTime).toLocaleString()
              }}</template>
          </Column>
          <Column field="machine" header="Touffeteur" :style="{textAlign: 'center',alignHeader:'center' }"></Column>
          <Column field="operator" header="Opérateur" :style="{textAlign: 'center',alignHeader:'center' }"></Column>
          <Column field="noRoll" header="No Rouleau" :style="{textAlign: 'center',alignHeader:'center' }"></Column>
          <Column field="style" header="Style" :style="{textAlign: 'center',alignHeader:'center' }"></Column>
          <Column field="lenght" header="Longueur" :style="{textAlign: 'center',alignHeader:'center' }"></Column>
        </DataTable>
      </div>
      <div class="mainGrid4">
        <DataTable
          class="gridCSS"
          :value="tufterAction"
          tableStyle="min-width: 1rem"
          scrollable
          scrollHeight="95%"
          showGridlines
          ref="dt4"
        >
          <template #header>
            <div style="text-align: left">
              <Button
                id = 'grid4'
                icon="pi pi-external-link"
                label="Export"
                @click="exportCSV4()"
              />
            </div>
          </template>          
          <Column field="dateTime" header="Date" :style="{textAlign: 'center'}">
              <template #body="{ data }">{{
                new Date(data.dateTime).toLocaleString()
              }}</template>
          </Column>
          <Column field="tuffter" header="Touffeteur" :style="{textAlign: 'center',alignHeader:'center' }"></Column>
          <Column field="tufterAction" header="Action" :style="{textAlign: 'center',alignHeader:'center' }"></Column>          
        </DataTable>
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
  grid-column: 1/8;
  grid-row: 2/4;
  padding: 5px;
}

.mainGrid2 {
  display: block;
  border: 2px solid black;
  border-radius: 5px;
  grid-column: 8/11;
  grid-row: 2/4;
  padding: 5px;
}

.chartCSS {
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

.gridCSS {
  height: 100%;
  width: 100%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
