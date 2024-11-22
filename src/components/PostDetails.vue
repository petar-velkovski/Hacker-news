<script setup>
import { ref, watch, inject } from "vue";
import { useRouter, useRoute } from "vue-router"; // Import useRoute from Vue Router
import { fetchItemDetails } from "../services/HNService";
import { useTimeAgo } from "@/composables/useTimeAgo";
import Comments from "./Comments.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";

const router = useRouter();
const route = useRoute(); // Initialize the route object
const post = ref(null);
const comments = ref([]);
const isLoading = inject("isLoading", true);
const { timeAgo } = useTimeAgo();

const goBack = () => {
  router.back();
};

const trimUrl = (url) => {
  return url.length > 50 ? url.substring(0, 50) + "..." : url;
};
// Watch the route params for changes and fetch data
watch(
  () => route.params.id,
  async (newPostId) => {
    if (newPostId) {
      try {
        if (route.query?.starred) {
          // If the route name is "Starred", get the item from localStorage
          const favoritesKey = "favorites";
          const favorites =
            JSON.parse(localStorage.getItem(favoritesKey)) || [];
          const favoritePost = favorites.find(
            (item) => String(item.id) === newPostId
          );

          if (favoritePost) {
            post.value = favoritePost;
            comments.value = favoritePost.children || []; // Assuming the favorite post contains `children` for comments
          } else {
            post.value = null;
            comments.value = [];
          }
        } else {
          // Otherwise, fetch the item details
          post.value = await fetchItemDetails(newPostId);
          comments.value = post.value?.children || []; // Assuming `children` contains the comments
        }
      } catch (error) {
        post.value = null;
        comments.value = [];
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div v-if="post && post.type" class="post-details">
      <div class="info">
        <div class="post-header">
          <h3>{{ post.type === "comment" ? post.text : post.title }}</h3>
          <i class="material-icons" @click="goBack">close</i>
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
              @click.stop="openUrl(post.url)"
            >
              {{ trimUrl(post.url) }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="post.children && post.children.length > 0" class="comments">
        <Comments :comments="post.children" />
      </div>
      <div v-else>No comments</div>
    </div>
    <div v-if="!isLoading && post && post.error" class="post-details">
      <div class="post-header">
        <ErrorAlert error="Post not found" />
        <i class="material-icons" @click="goBack">close</i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-details {
  padding: 20px;
  margin-top: 10px;
  border: 1px solid #ddd;
}
.user-square {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 12px;
}
hr {
  opacity: 0.6;
  margin: 20px 0px;
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
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}
.comments {
  margin-left: 50px;
}
.post-meta {
  display: flex;
  justify-content: space-between;
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
  gap: 5px;
}

i {
  font-size: 16px;
  cursor: pointer;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
@media (max-width: 900px) {
  .meta-left {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
