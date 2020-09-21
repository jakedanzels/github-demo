<template>
<div>
    <hr>
    <p> Server Status: {{ status }} </p>
    <button @click="changeStatus">Change Status</button>
</div>
</template>

<script>
export default {
    data: function() {
        return {
            status: 'Critial'
        }
    },
    methods: {
        changeStatus() {
            this.status = 'Normal';
        }
    }
}
</script>