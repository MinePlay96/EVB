<template>
  <div id="app">
    <TitleBar :title="app.getName() + ' /' + this.$router.currentRoute.name"></TitleBar>
    <main>
      <div class="container">
          <MainMenu/>
          <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
    import TitleBar from "./components/TitleBar";
    import MainMenu from "./components/MainMenu";
    import {remote} from "electron";

    export default {
        data: function() {
          return {
            app: remote.app
          }
        },
        components: {MainMenu, TitleBar},
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-flow: column;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html, body {
  height: 100%;
}

main {
  overflow: auto;
}
</style>
