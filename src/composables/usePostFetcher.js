import { ref, watch, nextTick } from "vue";
import { fetchData } from "../services/HNService";
import { generateFilterQuery } from "@/composables/generateFilterQuery";

export const usePostFetcher = (triggerScrollBottom, mainContent) => {
  const posts = ref([]);
  const loading = ref(true);
  const page = ref(0);
  const hasMorePosts = ref(true);
  const searchQuery = ref("");
  const queryParams = ref("");
  const responseInfo = ref("");
  // Fetch posts
  const millisecondsToSeconds = (milliseconds) => {
    if (milliseconds > 0) {
      return milliseconds / 1000;
    } else {
      return 0;
    }
  };
  const fetchPosts = async (query, querySearchTerm, pageNumber) => {
    loading.value = true;
    const currentScrollPosition = mainContent.value?.scrollTop || 0; // Save scroll position
    try {
      const res = await fetchData(query, querySearchTerm, pageNumber);
      responseInfo.value = `${res.nbHits} results (${millisecondsToSeconds(
        res.serverTimeMS
      )} seconds)`;
      if (res.hits.length === 0) {
        hasMorePosts.value = false;
      } else {
        posts.value = [...posts.value, ...res.hits];
      }
    } catch (error) {
      loading.value = false;
    } finally {
      loading.value = false;
      nextTick(() => {
        mainContent.value.scrollTop = currentScrollPosition;
      });
    }
  };

  // Watch scroll trigger
  watch(triggerScrollBottom, async (newVal) => {
    if (newVal && hasMorePosts.value) {
      page.value++;
      await fetchPosts(queryParams.value, searchQuery.value, page.value);
      triggerScrollBottom.value = false;
    }
  });

  // Handle searched data
  const searchedData = async (querySearchTerm) => {
    searchQuery.value = querySearchTerm;
    page.value = 0;
    posts.value = [];
    await fetchPosts(queryParams.value, searchQuery.value, page.value);
  };

  // Handle filter updates
  const updateFilters = async (filters) => {
    queryParams.value = generateFilterQuery(filters);
    posts.value = [];
    page.value = 0;
    hasMorePosts.value = true;
    await fetchPosts(queryParams.value, "", page.value);
  };

  return {
    posts,
    loading,
    fetchPosts,
    searchedData,
    updateFilters,
    page,
    hasMorePosts,
    searchQuery,
    queryParams,
    responseInfo,
  };
};
