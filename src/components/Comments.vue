<script setup>
import { useTimeAgo } from "@/composables/useTimeAgo";

const props = defineProps(["comments"]);
const { timeAgo } = useTimeAgo();

// Helper function to generate a color from text (based on user's name)
function generateColorFromString(str) {
  let hash = 0;
  if (str && str.length > 0) {
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 70%)`; // Generate a color based on string
    return color;
  }
}
</script>

<template>
  <div v-if="comments && comments.length > 0" class="comments-list">
    <div
      v-for="(comment, index) in comments"
      :key="comment.id"
      class="comment-wrapper"
    >
      <p v-if="comment.author">
        <span
          class="user-square"
          :style="{ backgroundColor: generateColorFromString(comment.author) }"
        >
          {{ comment.author.slice(0, 1) }}
        </span>
        <span class="author">{{ comment.author }}</span> -
        <span class="time-info">{{ timeAgo(comment.created_at_i) }}</span>
      </p>
      <p v-if="comment.text" class="comment">
        <span v-html="comment.text"></span>
      </p>

      <!-- Recursive rendering for nested comments -->
      <div
        v-if="comment.children && comment.children.length > 0"
        class="nested-comments"
      >
        <Comments :comments="comment.children" />
      </div>

      <!-- Only render <hr> if the comment is not the last one -->
      <hr v-if="index < comments.length - 1" />
    </div>
  </div>
  <div v-else>No comments</div>
</template>

<style scoped>
.comments-list {
  padding: 20px;
  margin-top: 10px;
  border-top: 1px solid #ddd;
}
.comment-wrapper {
  margin-bottom: 10px;
}
.author {
  color: #d4cbcb;
}
.time-info {
  color: rgb(64, 64, 245);
  font-size: 13px;
}
.comment {
  margin-top: 10px;
  font-size: 14px;
  word-wrap: break-word;
  word-break: break-word;
}
.user-square {
  min-width: 15px;
  min-height: 15px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
}
.nested-comments {
  margin-left: 20px;
  border-left: 1px solid #ddd;
  padding-left: 10px;
}
hr {
  opacity: 0.6;
  margin: 20px 0px;
}
</style>
