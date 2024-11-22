export function generateFilterQuery(filters) {
  let query = [];
  // Handle category filter
  if (filters.category === "stories") {
    query.push("tags=story");
  } else if (filters.category === "comments") {
    query.push("tags=comment");
  } else if (filters.category === "showhn") {
    query.push("tags=show_hn");
  } else if (filters.category === "askhn") {
    query.push("tags=ask_hn");
  } else if (filters.category === "polls") {
    query.push("tags=poll");
  } else if (filters.category === "jobs") {
    query.push("tags=job");
  }

  // Handle timestamp and popularityFilter combinations
  if (filters.timestamp && filters.popularityFilter) {
    query.push(
      `numericFilters=created_at_i>=${filters.timestamp},points${filters.popularityFilter}`
    );
  } else if (filters.timestamp) {
    query.push(`numericFilters=created_at_i>=${filters.timestamp}`);
  } else if (filters.popularityFilter) {
    query.push(`numericFilters=points${filters.popularityFilter}`);
  }

  // If no conditions met, default to "tags=story"
  if (query.length === 0) {
    query.push("tags=story");
  }
  if (filters.type === "Popularity") {
    query.unshift("search?");
  } else {
    query.unshift("search_by_date?");
  }
  return query.join("&");
}
