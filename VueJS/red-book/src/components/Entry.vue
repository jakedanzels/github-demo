<template>
    <ul class="nostyle">
        <li v-if="entry.scene"><em>{{entry.scene}}{{entry.scene.includes('...') ? '' : '...'}}</em></li>
        <li v-for="(line,x) in entry.lines" :key="x">
            <span v-if="line.who"><strong>{{line.who}} - </strong></span>
            <span v-if="line.who">{{line.what}}</span>
            <span v-else><em>{{line.what}}{{line.what.includes('...') ? '' : '...'}}</em></span>
        </li>
        <br>
    </ul>
</template>

<script>
export default {
    props: {
        entry: {
            id: String,
            scene: String,
            lines: Array
        }
    }
}
</script>

<style scoped>

li {
  list-style-type: none;
}

ul {
  padding-left: 10px;
}
</style>