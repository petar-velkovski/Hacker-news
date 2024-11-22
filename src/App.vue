<script setup>
import { ref, onMounted, provide } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import ErrorAlert from "./components/ErrorAlert.vue";

const triggerScrollBottom = ref(false);
provide("triggerScrollBottom", triggerScrollBottom);

const mainContent = ref(null);
provide("mainContent", mainContent);

const errorMessage = ref(null);
const isLoading = ref(false);
const ongoingRequests = ref(0);

function handleScroll() {
  const container = mainContent.value;
  if (
    container.scrollHeight - container.scrollTop === container.clientHeight &&
    !errorMessage.value
  ) {
    triggerScrollBottom.value = true;
  }
}
provide("isLoading", isLoading);

const originalFetch = window.fetch;
window.fetch = async function (...args) {
  ongoingRequests.value++;
  isLoading.value = true;
  try {
    const response = await originalFetch(...args);
    return response;
  } catch (error) {
    isLoading.value = false;
    errorMessage.value = error.message;
    return null;
  } finally {
    ongoingRequests.value--;
    if (ongoingRequests.value === 0) {
      isLoading.value = false;
    }
  }
};

onMounted(() => {
  if (mainContent.value) {
    mainContent.value.addEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <div id="app" class="app-layout">
    <Loader />
    <Sidebar />
    <div ref="mainContent" class="main-content">
      <ErrorAlert v-if="errorMessage" :error="errorMessage" />
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
