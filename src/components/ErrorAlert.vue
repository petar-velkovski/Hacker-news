<script setup>
const props = defineProps(["error"]);
</script>
<template>
  <div class="error">{{ props.error }}</div>
</template>
<style scoped>
.error {
  margin: 0 auto;
  max-width: 50%;
  width: 100%;
  padding: 10px;
  background: rgb(235, 54, 54);
  color: white;
  text-align: center;
}
</style>
