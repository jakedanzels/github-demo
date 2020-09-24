<template>
<div>
    <p>Double Counter is: {{ doubleCounter }}</p>
    <p>This is {{ stringCounter }}</p>
</div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        ////props: ['counter']

        // // doubleCounter() {
        // //         return this.$store.getters.doubleCounter;
        // //     }

        //this is valid but doesn't allow for your own computed properties
        //computed: mapGetters(['doubleCounter','stringCounter'])
            
        computed: {
            ...mapGetters([
                'doubleCounter',
                'stringCounter'
            ]),
            ourOwnComputedProperty (){
                
            }
        }
        
    }
</script>