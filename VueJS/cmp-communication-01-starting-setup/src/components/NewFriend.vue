<template>
    <form @submit.prevent="submitData">
        <div>
            <label>Name</label>
            <input type="text" v-model="friend.name">
        </div>
        <div>
            <label>Phone</label>
            <input type="tel" v-model="friend.phone">
        </div>
        <div>
            <label>E-mail</label>
            <input type="email" v-model="friend.email">
        </div>
        <div>
            <button>Add Contact</button>
        </div>
    </form>
</template>

<script>
export default {
    emits: ['add-contact'],
    data () {
        return {
            friend: {
                name: '',
                phone: '',
                email: '',
            }
        }
    },
    methods: {
        submitData() {
            //console.log(this.friend);
            this.$emit('add-contact', this.friend);
            this.friend.name = '';
            this.friend.phone = '';
            this.friend.email = '';
        }
    }
}
</script>