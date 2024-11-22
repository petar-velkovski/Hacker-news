<script setup>
import PostItem from "./PostItem.vue";

const props = defineProps(["posts"]);
</script>
<template>
  <div ref="listContainer" class="post-list-wrapper">
    <div v-if="props.posts.length > 0" class="post-list">
      <PostItem
        v-for="post in props.posts"
        :key="post"
        :post="post"
        class="post-item"
      />
    </div>
    <div v-else class="no-data">No data</div>
  </div>
</template>

<style scoped>
.post-list-wrapper {
  height: 100vh;
  margin: 0 auto;
  width: 100%;
}

.post-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.post-item {
  padding: 15px;
  border: none;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
.no-data {
  margin: 100px auto;
  text-align: center;
  font-size: 30px;
  opacity: 0.5;
}
</style>
