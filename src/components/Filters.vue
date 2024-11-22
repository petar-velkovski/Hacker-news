<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits(["update:filters"]);

const categories = ref(["Stories", "Comments"]);
const types = ref(["Popularity", "Date"]);
const timeRanges = ref(["Last 24h", "Past Week", "Past Month", "All Time"]);

const route = useRoute();

const filters = ref({
  category: "Stories",
  type: "Date",
  timeRange: "Last 24h",
  timestamp: 0,
  tag: "",
  popularityFilter: route.name === "Hot" ? ">100" : "",
});

// Function to map timeRange to actual timestamp in seconds
const getTimestampForRange = (range) => {
  const now = Date.now() / 1000;
  switch (range) {
    case "Last 24h":
      return now - 24 * 60 * 60;
    case "Past Week":
      return now - 7 * 24 * 60 * 60;
    case "Past Month":
      return now - 30 * 24 * 60 * 60;
    case "All Time":
      return 0;
    default:
      return 0;
  }
};

// Prepare filters object for emission
const prepareFiltersObject = (filters) => ({
  category: filters.category.toLowerCase(),
  type: filters.type,
  timeRange: filters.timeRange,
  timestamp: filters.timestamp || null,
  tag: filters.tag || null,
  popularityFilter: filters.popularityFilter || null,
});

// Emit updated filters as an object
const updateFilters = () => {
  filters.value.timestamp = getTimestampForRange(filters.value.timeRange);
  const transformedFilters = prepareFiltersObject(filters.value);
  emit("update:filters", transformedFilters);
};

const onFilterChange = () => {
  updateFilters();
};

// Watch for time range changes
watch(
  () => filters.value.timeRange,
  () => {
    if (route.name === "Hot") {
      filters.value.popularityFilter = ">100";
    } else if (route.name === "AskHN") {
      categories.value = ["AskHN"];
      filters.value.category = "AskHN";
    } else if (route.name === "ShowHN") {
      categories.value = ["ShowHN"];
      filters.value.category = "ShowHN";
    } else if (route.name === "Polls") {
      categories.value = ["Polls"];
      filters.value.category = "Polls";
    } else if (route.name === "Jobs") {
      categories.value = ["Jobs"];
      filters.value.category = "Jobs";
    } else {
      categories.value = ["Stories", "Comments"];
    }
    filters.value.timestamp = getTimestampForRange(filters.value.timeRange);
    updateFilters();
  },
  { immediate: true }
);
</script>

<template>
  <div class="filters">
    <select
      v-model="filters.category"
      @change="onFilterChange"
      :disabled="
        route.name === 'ShowHN' ||
        route.name === 'AskHN' ||
        route.name === 'Polls' ||
        route.name === 'Jobs'
      "
    >
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <select v-model="filters.type" @change="onFilterChange">
      <option v-for="type in types" :key="type" :value="type">
        {{ type }}
      </option>
    </select>

    <select v-model="filters.timeRange" @change="onFilterChange">
      <option v-for="range in timeRanges" :key="range" :value="range">
        {{ range }}
      </option>
    </select>

    <select v-model="filters.popularityFilter" @change="onFilterChange">
      <option value="">Popularity</option>
      <option value=">50">More than 50 points</option>
      <option value="<=50">Less than or equal to 50 points</option>
      <option value=">100">More than 100 points</option>
    </select>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-left: 20px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
