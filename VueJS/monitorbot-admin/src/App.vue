<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <section>
      <h2>Monitoring Items</h2>
      <ul>
        <monitoring-list-item></monitoring-list-item>
        <monitoring-list-item></monitoring-list-item>

      </ul>
    </section>
  </div>
  <!-- <router-view/> -->
</template>

<script>
export default {
  data() {
    return{
      monitoringItems: [
        {
          id: 1,
          name: 'Check 1',
          description: 'Checks the thing',
          SQLStatement: 'SELECT Problem FROM dbo.Table Where Problem = Problem;'
        },
        {
          id: 2,
          name: 'Check 2',
          description: 'Checks the other thing',
          SQLStatement: 'SELECT DifferentProblem FROM dbo.Table Where AnotherProblem = AnotherProblem;'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
