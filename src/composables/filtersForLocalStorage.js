import { ref } from "vue";

// Define the filter function
export function filtersForLocalStorage(posts) {
  const filteredPosts = ref(posts);

  // Apply filters based on the selected filters
  const applyFilters = (filters) => {
    let filteredResults = posts.value;

    // Handle category filter
    if (filters.category) {
      switch (filters.category) {
        case "stories":
          filteredResults = filteredResults.filter((post) =>
            post.tags.includes("story")
          );
          break;
        case "comments":
          filteredResults = filteredResults.filter((post) =>
            post.tags.includes("comment")
          );
          break;
        case "showhn":
          filteredResults = filteredResults.filter((post) =>
            post.tags.includes("show_hn")
          );
          break;
        case "askhn":
          filteredResults = filteredResults.filter((post) =>
            post.tags.includes("ask_hn")
          );
          break;
        case "polls":
          filteredResults = filteredResults.filter((post) =>
            post.tags.includes("poll")
          );
          break;
        case "jobs":
          filteredResults = filteredResults.filter((post) =>
            post.tags.includes("job")
          );
          break;
      }
    }

    // Handle timestamp filter
    if (filters.timestamp) {
      filteredResults = filteredResults.filter(
        (post) => post.created_at_i >= filters.timestamp
      );
    }

    // Handle popularity filter
    if (filters.popularityFilter) {
      filteredResults = filteredResults.filter((post) => {
        switch (filters.popularityFilter) {
          case ">":
            return post.points > 100; // Example logic: Adjust as needed
          case "<":
            return post.points < 100;
          case "=":
            return post.points === 100;
          default:
            return true;
        }
      });
    }

    // Update filteredPosts
    filteredPosts.value = filteredResults;
  };

  // Return the filtered posts and the applyFilters method
  return {
    filteredPosts,
    applyFilters,
  };
}
