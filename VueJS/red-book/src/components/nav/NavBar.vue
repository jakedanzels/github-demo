<template>
  <div class="nav-bar">
    <header>
        <nav>
            <ul>
                <li>
                    <router-link to="/"><img alt="Red Book logo" class="logo" src="@/assets/logo.png" height="30" width="60"
                    title="Welcome">
                    </router-link>
                </li>
                <li v-if="loggedIn">
                    <base-button @click="logout">Logout</base-button>
                </li>
                <li v-else>
                    <router-link to="/auth">Login/Register</router-link>
                </li>
                 <li v-if="loggedIn">
                    <router-link to="/new">Add New</router-link>
                </li>
                <li v-if="loggedIn">
                    <router-link to="/random">Random Entry</router-link>
                </li>
                <li v-if="loggedIn">
                    <router-link to="/all">All</router-link>
                </li>
            </ul>
        </nav>
    </header>
    <hr>
  </div>
</template>

<script>
export default {
    computed: {
        loggedIn() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.replace('/home');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
    float:left;
    vertical-align: middle;
}
ul {
  list-style-type: none;
  padding-left: 6px;
}
li {
    padding-left: 10px;
    display: inline;
}
a {
  color: #c01e19;
  padding-left: 2px;
}
a:hover,
a:active,
a.router-link-active,
a.router-link-hover {
    font-weight: bold;
}

</style>
