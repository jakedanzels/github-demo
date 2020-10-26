<template>
  <nav-bar/>
  <router-view></router-view>
</template>

<script>
import NavBar from './components/nav/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
.red{
  color: #c01e19
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
.v-enter-from {
  opacity: 0;
  /* transform: translateY(-30px); */
}
.v-enter-active {
  transition: all 1s ease-out;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.v-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.v-leave-active {
  transition: all 1s ease-in;
}

.v-leave-to {
  opacity: 0;
  /* transform: translateY(30px); */
}

form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 1px solid #c01e19;
  background-color: #c01e19;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: darkred;
  background-color: darkred;
}

button.sub {
  padding: 0.5rem 1rem;
  border-radius: 15px;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

button.right {
    float: right;
}

ul.nostyle {
  list-style-type: none;
  padding: 0;
}

li.nostyle {
  list-style-type: none;
  list-style: none;
  padding-left:0;
}
</style>
