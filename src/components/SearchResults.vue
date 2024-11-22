<template>
  <div class="search-results">
    <div class="search-container">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Search stories by title, URL, or author"
        class="search-input"
      />
      <span class="algolia"
        ><span class="by">by</span> Alg<span class="letter">o</span>lia</span
      >
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import debounce from "@/utils/debounce";

const searchQuery = ref("");
const error = ref(null);
const emit = defineEmits();

const fetchResults = async () => {
  error.value = null;
  emit("searchedData", searchQuery.value);
};

const handleSearch = debounce(fetchResults, 300);

watch(searchQuery, handleSearch);
</script>

<style scoped>
.search-results {
  padding: 20px;
}
.search-container {
  display: flex;
  align-items: center;
}
.search-input {
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;

  outline: none;
}
.algolia {
  margin-left: 20px;
  font-weight: 500;
  font-size: 18px;
}
.by {
  opacity: 0.3;
  font-size: 14px;
}
.letter {
  font-weight: 500;
  color: rgb(92, 143, 202);
}
.results-list {
  display: flex;
  flex-direction: column;
}

.result-item {
  padding: 15px;
  border: none;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.result-item:hover {
  background-color: #f9f9f9;
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #666;
  font-size: 14px;
}

.comments-section {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.comment {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.comment-meta {
  display: flex;
  gap: 10px;
  color: #666;
  font-size: 12px;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
}

.error {
  color: #ff0000;
  text-align: center;
  margin-top: 20px;
}
</style>
