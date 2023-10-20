<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UseCallApi } from "./service/UseCallApi";

onMounted(() => {
  // UseCallApi({action:'GetEmployee'}).then((data:any)=> (employees.value = data));
});

</script>

<template>
  <div class="container">
<h1>premier prog vue</h1>
<Button>click</Button>
  </div>
</template>

<style scoped>

.container{
  display: flex;
  align-items: center;
  justify-content: center;
}
.mainContainer {
  background-color: #fff;
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
