<template>
    <div>
        <button class="btn btn-primary" @click="asyncIncrement({by: 2, delay:1000})">Increment</button>
        <button class="btn btn-primary" @click="asyncDecrement({by: 2, delay:1000})">Decrement</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        methods: {
                ...mapActions([
                    'increment',
                    'decrement',
                    'asyncIncrement',
                    'asyncDecrement'
                ])
        }
    }
</script>