<template>
    <ul class="nostyle">
        <li v-if="scene"><em>{{scene}}</em></li>
        <li v-for="line in lines" :key="line">
            <strong>{{line.who}} -</strong> {{line.what}}
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
