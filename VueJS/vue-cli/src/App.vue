<template>
    <div class="container">
        <app-header></app-header>
        <div class="row">
            <servers></servers>
            <app-server-details></app-server-details>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from './components/Shared/Header.vue'
import Footer from './components/Shared/Footer.vue'
import Servers from './components/Server/Servers.vue'
import ServerDetails from './components/Server/ServerDetails.vue'
export default {
    components: {
      appFooter: Footer,//this works too, without needing to change html
      'app-header': Header,
      Servers, //and this, but you have to lose the app- prefix in html, could lead to problems with uniqueness
      'app-server-details': ServerDetails
    }
}
</script>

<style>

</style>
