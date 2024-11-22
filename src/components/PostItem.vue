<script setup>
import { ref, onMounted } from "vue";
import { fetchItemDetails } from "../services/HNService";
import { useTimeAgo } from "@/composables/useTimeAgo";
import { useRouter, useRoute } from "vue-router";
import Comments from "./Comments.vue";

const router = useRouter();
const route = useRoute();
const props = defineProps(["post"]);
const post = ref(null);
const toggleComments = ref(false);
const comments = ref([]);
const isFavorited = ref(false); // Track if the post is favorited
const { timeAgo } = useTimeAgo();

function openPostDetails() {
  router.push({
    name: "PostDetails",
    params: { id: post.value.id || post.value.objectID },
    query: {
      starred: route.name === "Starred" ? true : undefined,
    },
  });
}

async function showComments() {
  try {
    toggleComments.value = !toggleComments.value;
    if (toggleComments.value) {
      if (route.name !== "Starred") {
        // If the route is not "Starred", fetch from the API
        let response = await fetchItemDetails(post.value.objectID);
        comments.value = response.children;
      } else {
        // If the route is "Starred", retrieve from localStorage
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const favoritePost = favorites.find(
          (item) => item.id === post.value.id
        );

        if (favoritePost) {
          // Assuming that the favoritePost has a "comments" property or similar
          comments.value = favoritePost.children || []; // Fallback to empty array if no comments
        } else {
          comments.value = []; // Fallback to empty array if post is not found in favorites
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function openPostUrl(val) {
  if (val) {
    window.open(val, "_blank");
  }
}

function trimUrl(url, maxLength = 30) {
  if (url.length > maxLength) {
    return url.slice(0, maxLength) + "..."; // Trim the URL and add ellipsis
  }
  return url;
}

async function toggleFavorite() {
  const favoritesKey = "favorites";
  const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  const index = favorites.findIndex(
    (item) => item.objectID === post.value.objectID
  );

  if (index !== -1) {
    // Item already exists in favorites, remove it
    favorites.splice(index, 1);
    isFavorited.value = false;
  } else {
    try {
      // Fetch the item details using the provided method
      const response = await fetchItemDetails(post.value.objectID);

      // Add the fetched item to the favorites
      favorites.push(response);
      isFavorited.value = true;

      // Save the updated favorites list to localStorage
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error fetching the item:", error);
    }
  }
}

onMounted(() => {
  post.value = props.post;

  // Check if the post is already in localStorage favorites
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  isFavorited.value = favorites.some(
    (item) => item.objectID === post.value.objectID
  );
});
</script>

<template>
  <div v-if="post" @click="openPostDetails">
    <div class="info">
      <div class="post-header">
        <h3>{{ post.title ? post.title : post.story_title || post.text }}</h3>
      </div>
      <div class="post-meta">
        <div class="meta-left">
          <span v-if="post.points" class="wrapper">
            <i class="material-icons">favorite_border</i>
            {{ post.points }} points
          </span>
          <span class="wrapper">
            <i class="material-icons">person</i> {{ post.author }}
          </span>
          <span class="wrapper">
            <i class="material-icons">access_time</i>
            {{ timeAgo(post.created_at_i) }}
          </span>
          <div
            v-if="post.url"
            class="wrapper"
            @click.stop="openPostUrl(post.url)"
          >
            {{ trimUrl(post.url) }}
          </div>
          <div
            v-if="post.story_url"
            class="wrapper"
            @click.stop="openPostUrl(post.story_url)"
          >
            {{ trimUrl(post.story_url) }}
          </div>
        </div>
        <div class="actions">
          <div
            v-if="post.children"
            class="svg-wrapper"
            @click.stop="showComments"
          >
            <svg
              viewBox="0 0 24 24"
              style="height: 23px; width: 23px; opacity: 0.3"
            >
              <path
                d="M22,4C22,2.89 21.1,2 20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4Z"
              ></path>
            </svg>
            <div class="number">{{ post.children.length }}</div>
          </div>
          <div
            v-if="!post.children && !post.comment_text"
            class="svg-wrapper"
            @click.stop="showComments"
          >
            <svg
              viewBox="0 0 24 24"
              style="height: 23px; width: 23px; opacity: 0.3"
            >
              <path
                d="M22,4C22,2.89 21.1,2 20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4Z"
              ></path>
            </svg>
            <div class="number">0</div>
          </div>
          <span @click.stop><i class="material-icons disabled">share</i></span>
          <span @click.stop="toggleFavorite">
            <i class="material-icons" :class="{ active: isFavorited }">
              {{ isFavorited ? "star" : "star_border" }}
            </i>
          </span>
        </div>
      </div>
    </div>
    <Comments v-if="toggleComments" :comments="comments" />
  </div>
</template>

<style scoped>
i.active {
  color: gold; /* Highlight the star icon */
}
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.svg-wrapper {
  position: relative;
  display: inline-block;
}
.number {
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white; /* Color of the number */
  font-size: 10px; /* Size of the number */
  font-weight: bold; /* Make the number bold */
}
.post-header {
  margin-bottom: 10px;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
}
.post-meta {
  display: flex;
  justify-content: space-between; /* Space between left and right sides */
  align-items: center;
  gap: 10px;
  color: #aca8a8;
  font-size: 14px;
}
.meta-left {
  display: flex;
  gap: 20px;
}
.wrapper {
  display: flex;
  align-items: center;
  gap: 5px; /* Space between icon and text */
}
i {
  font-size: 16px; /* Adjust icon size */
}
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
@media (max-width: 900px) {
  /* On mobile view, hide the title and collapse the sidebar */
  .meta-left {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
