<script setup>
import { ref } from "vue";
import SearchResults from "@/components/SearchResults.vue";
import Filters from "@/components/Filters.vue";
import PostList from "@/components/PostList.vue";

// States to manage posts and loading
const posts = ref([]);
const allPosts = ref([]); // Store all posts for filtering
const loading = ref(true);

// Filters state
const filters = ref({}); // Example filters object

// Fetch posts from localStorage
const fetchPostsFromLocalStorage = () => {
  const favoritesKey = "favorites";
  const savedPosts = JSON.parse(localStorage.getItem(favoritesKey)) || [];
  allPosts.value = savedPosts; // Save all posts for reference
  posts.value = savedPosts; // Initially display all posts
  loading.value = false; // Mark loading as complete
};

// Update filters and apply filtering
const updateFilters = (newFilters) => {
  filters.value = newFilters;
  applyFilters();
};

// Apply filters to the posts
const applyFilters = () => {
  // First, filter the posts
  let filteredPosts = allPosts.value.filter((post) => {
    let matches = true;

    // Filter by timestamp
    if (filters.value.timestamp) {
      matches = matches && post.created_at_i >= filters.value.timestamp;
    }

    // Filter by popularityFilter
    if (filters.value.popularityFilter) {
      const popularityValue = parseInt(
        filters.value.popularityFilter.slice(1),
        10
      ); // Extract the number from the filter, e.g. ">50" -> 50
      const comparisonOperator = filters.value.popularityFilter[0]; // Extract the operator, e.g. ">" or "<"

      // Apply the filter based on the comparison operator
      switch (comparisonOperator) {
        case ">":
          matches = matches && post.points > popularityValue;
          break;
        case "<":
          matches = matches && post.points < popularityValue;
          break;
        case "=":
          matches = matches && post.points === popularityValue;
          break;
        default:
          break;
      }
    }
    if (filters.value.category) {
      let category;
      if (filters.value.category === "stories") {
        category = "story";
      } else {
        category = "comment";
      }
      matches = matches && post.type === category;
    }

    return matches; // Return whether the post matches the filter conditions
  });

  // Then, apply sorting based on the selected type
  if (filters.value.type) {
    if (filters.value.type === "Date") {
      // Sort by `created_at_i` from newest to oldest
      filteredPosts.sort((a, b) => b.created_at_i - a.created_at_i);
    } else if (filters.value.type === "Popularity") {
      // Sort by `points` from highest to lowest
      filteredPosts.sort((a, b) => b.points - a.points);
    }
  }

  // Update the posts with the filtered and sorted result
  posts.value = filteredPosts;
};

// Search results handler (e.g., for a search bar)
const searchedData = (searchQuery) => {
  posts.value = allPosts.value.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
};

// Fetch posts when the component is mounted
fetchPostsFromLocalStorage();
</script>

<template>
  <div>
    <SearchResults @searchedData="searchedData" />
    <Filters @update:filters="updateFilters" />
    <PostList :posts="posts" v-if="!loading" />
    <div v-else>Loading...</div>
  </div>
</template>
