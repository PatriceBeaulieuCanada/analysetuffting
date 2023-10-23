<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UseCallApi } from "./service/UseCallApi";
import { useToast } from "primevue/usetoast";
import "./assets/app.css";

const toast = useToast();
const handleClick = () => {
  toast.add({
    severity: "success",
    summary: "PrimeTime",
    detail: "salut",
    life: 2000,
  });
};

onMounted(() => {
  // UseCallApi({action:'GetEmployee'}).then((data:any)=> (employees.value = data));
});
</script>

<template>
  <Toast></Toast>
    <div class="app">
      <div class="mainContainer">
        
        <div class="mainHeader">
          <Button class="bntCSS" label="Validez" @click="handleClick" icon="pi pi-user"></Button>
        </div>
        <div class="mainGrid">

        </div>
      </div>
    </div>
</template>

<style scoped>

.mainContainer {
  background-color:#fff;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  grid-template-rows: 10% 25% 25% auto;
  row-gap: 10px;
}

.mainHeader {
  border: 2px solid black;
  border-radius: 5px;
  grid-column: 1/11;
  padding: 10px;
}

.bntCSS{
  width: 85px;
  height: 40px;
  padding: 5px;
}

.mainGrid {
  border: 2px solid black;
  border-radius: 5px;
  grid-column: 1/11;
  grid-row: 2/3;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
