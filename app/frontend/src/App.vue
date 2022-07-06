<template>
  <div>
    <header>
      <HeaderNav />
    </header>
    <main>
      <div id="app">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";

export default {
  components: {
    HeaderNav, //読み込む際はここにも追記必要
  },
  name: "App",
};
</script>
