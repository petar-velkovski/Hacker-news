<template>
  <div class="not-found">
    <h1>404</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}
.not-found h1 {
  font-size: 6rem;
  color: #ff6f61;
}
.not-found p {
  font-size: 1.5rem;
  margin: 20px 0;
}
.not-found a {
  color: #3498db;
  text-decoration: underline;
  font-size: 1.2rem;
}
</style>
