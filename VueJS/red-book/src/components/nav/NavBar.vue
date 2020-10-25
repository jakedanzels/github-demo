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
                <li>
                    <router-link to="/New">New</router-link>
                </li>
                <li>
                    <router-link to="/Random">Random</router-link>
                </li>
                <li>
                    <router-link to="/All">All</router-link>
                </li>
            </ul>
        </nav>
    </header>
    <hr>
  </div>
</template>

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
