<script setup>
import { ref, onMounted } from "vue";

// Reactive state for sidebar collapse and screen size check
const isSidebarCollapsed = ref(false);
const isMobile = ref(false);

// Toggle sidebar collapse state
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

// Check if the screen is mobile size
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 960;
  if (isMobile.value) {
    isSidebarCollapsed.value = true;
  } else {
    isSidebarCollapsed.value = false;
  }
};

// Watch for window resize events to update the screen size state
onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});
</script>

<template>
  <nav :class="['sidebar', { collapsed: isSidebarCollapsed }]">
    <i
      class="material-icons menu-handlers"
      v-if="isMobile"
      @click="toggleSidebar"
      >{{ isMobile && !isSidebarCollapsed ? "close" : "menu" }}</i
    >
    <img
      v-if="!isSidebarCollapsed"
      src="@/assets/images/logo.png"
      alt="HN Logo"
      class="logo"
    />
    <ul v-if="!isSidebarCollapsed">
      <li>
        <router-link to="/" active-class="active-link">
          <i class="material-icons">insert_drive_file</i> All
        </router-link>
      </li>
      <li>
        <router-link to="/hot" active-class="active-link">
          <i class="material-icons">whatshot</i> Hot
        </router-link>
      </li>
      <li>
        <router-link to="/show" active-class="active-link">
          <i class="material-icons">volume_up</i> Show HN
        </router-link>
      </li>
      <li>
        <router-link to="/ask" active-class="active-link">
          <i class="material-icons">help</i> Ask HN
        </router-link>
      </li>
      <li>
        <router-link to="/polls" active-class="active-link">
          <i class="material-icons">lightbulb</i> Polls
        </router-link>
      </li>
      <li>
        <router-link to="/jobs" active-class="active-link">
          <i class="material-icons">receipt</i> Jobs
        </router-link>
      </li>
      <hr />
      <li>
        <router-link to="/shipow" active-class="active-link">
          <i class="material-icons">person</i> Shipow
        </router-link>
      </li>
      <li>
        <router-link to="/starred" active-class="active-link">
          <i class="material-icons">star_border</i> Starred
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.logo {
  max-width: 40px;
  height: auto;
  display: block;
  margin: 0 auto;
}
/* General Sidebar Styles */
.sidebar {
  width: 200px;
  padding: 10px;
  background: #f5f5f5;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 50px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #f03939;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #777575;
  display: flex;
  align-items: center;
  padding: 5px 0;
}

a i {
  margin-right: 8px;
  font-size: 20px;
}

a:hover {
  color: #555454;
}

.router-link-exact-active {
  font-weight: bold;
  background-color: #e9ecef;
  border-radius: 4px;
  padding: 5px;
}
.menu-handlers {
  cursor: pointer;
  color: #555454;
}
@media (max-width: 960px) {
  /* On mobile view, hide the title and collapse the sidebar */
  h2 {
    display: none;
  }
}
</style>
