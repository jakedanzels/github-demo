<template>
  <nav-bar></nav-bar>
  <router-view v-slot="slotProps">
    <transition name="fade" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <my-footer></my-footer>
</template>

<script>


import NavBar from './components/nav/NavBar.vue';
import myFooter from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    myFooter
  },
   created() {
    this.$store.dispatch('loadEntries');
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
.red{
  color: #c01e19
}
* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.fade-enter-active {
  /* animation: slide-scale 0.4s ease-out; */
 transition: opacity 0.5s ease-out;
}

.fade-leave-active {
  /* animation: slide-scale 0.4s ease-in; */
  transition: opacity 0.5s ease-in;
}

.fade-enter-to,
.fade-leave-from{
  opacity: 1;
}
</style>
