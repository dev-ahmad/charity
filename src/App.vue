<template>
  <v-app>
    <div id="app">
      <Header v-if="$store.state.isLoggedIn == false" />
      <router-view />
      <Footer v-if="$store.state.isLoggedIn == false" />
    </div>
  </v-app>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
  created() {
    console.warn(this.$store.getters.isLoggedIn);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
