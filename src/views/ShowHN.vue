<script setup>
import { inject, onMounted } from "vue";
import { usePostFetcher } from "@/composables/usePostFetcher";
import SearchResults from "@/components/SearchResults.vue";
import Filters from "@/components/Filters.vue";
import PostList from "@/components/PostList.vue";

// Inject scroll-related props
const triggerScrollBottom = inject("triggerScrollBottom");
const mainContent = inject("mainContent");

// Use composable
const { posts, loading, searchedData, updateFilters } = usePostFetcher(
  triggerScrollBottom,
  mainContent
);
onMounted(() => {
  triggerScrollBottom.value = false;
});
</script>

<template>
  <div>
    <SearchResults @searchedData="searchedData" />
    <Filters @update:filters="updateFilters" />
    <PostList :posts="posts" v-if="!loading" />
  </div>
</template>
