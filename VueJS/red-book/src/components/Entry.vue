<template>
    <ul class="nostyle">
        <li v-if="scene"><em>{{scene}}</em></li>
        <li v-for="line in lines" :key="line">
            <span v-if="line.who"><strong>{{line.who}} - </strong></span>
            <span v-if="line.who">{{line.what}}</span>
            <span v-else><em>{{line.what}}</em></span>
        </li>
        <br>
    </ul>
</template>

<script>
export default {
    props: {
        scene: String,
        lines: Array
    }
}
</script>

<style scoped>
italic {
    font-style: italic;
}

li {
  list-style-type: none;
}

ul {
  padding-left: 0;
}
</style>