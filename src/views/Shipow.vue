<script setup>
import { ref, onMounted } from "vue";
import { fetchShipowData } from "../services/HNService";

const user = ref(null);
const loading = ref(true);
onMounted(async () => {
  user.value = await fetchShipowData();
  loading.value = false;
});
</script>

<template>
  <div>
    <div v-if="user" class="profile-card">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Karma:</strong> {{ user.karma }}</p>
      <p><strong>About:</strong> {{ user.about }}</p>
    </div>
  </div>
</template>
<style scoped>
.profile-card {
  max-width: 400px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.profile-card h2 {
  margin-top: 0;
  color: #333;
}

.profile-card p {
  margin: 5px 0;
  color: #555;
}

.profile-card strong {
  color: #000;
}
</style>
