<script setup>
import { login } from "@/service";
login().then((res) => {
  console.log(res);
});
</script>

<template>
  <div id="app">App</div>
</template>

<style scoped>
#app {
  font-size: 20px;
  font-weight: bold;
}
</style>
