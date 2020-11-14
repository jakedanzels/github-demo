<template>
  <div class="welcome">
    <h1 v-if="welcomeMessage">{{welcomeMessage}}</h1>
    <h1>Welcome to the <span class="red">Red</span> Book</h1>
    <h2>Things we wish we hadn't said</h2>
    <h3><em>"That car in front is following us!"</em></h3>
    <router-link to="/random">
      <img  alt="Red Book logo" class="book" src="@/assets/red-book-cto.png" height="200" width="480"
      style="vertical-align:middle;margin:50px 0px"
      title="Open random page"
      >
    </router-link>
    
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    welcomeMessage() {
      var displayName = '';
      if(this.loggedIn){
          displayName = this.$store.getters.user.displayName;
          return displayName ? `Hello ${displayName}` : 'Hello Guest';
      }else{
        return null;
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome{
  text-align: center;
}
img.book {
  height: 50%;
  width: 50%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
