<template>
  <li>
    <h2>{{ name }}{{ isFavourite ? ' - Favourite' : '' }}</h2>
    <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show' }} Details</button>
    <button @click="toggleFavourite">Toggle Favourite</button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phoneNumber }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ emailAddress }}
      </li>
    </ul>
    <button @click="deleteFriend">Delete</button>
  </li>
</template>

<script>
export default {
  //props: ['name','phoneNumber','emailAddress'],
  props: {
    id: {
      type:String,
      Required: true
    },
    name: {
      type: String,
      Required: true
    },
    phoneNumber: {
      type: String,
      Required: true
    },
    emailAddress: {
      type: String,
      Required: true,
      // validator: function(value) {
      //   return value.includes("@");
      // }
    }
    , isFavourite: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-favourite','delete-friend'],
  // emits: {
  //   'toggle-favourite': function(id) {
  //       if (id) {
  //         return true;
  //       } else {
  //         console.warn('ID is missing!');
  //         return false;
  //       }
  //   }
  // },
  data () {
    return {
      detailsAreVisible: false
    }
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleFavourite() {
      this.$emit('toggle-favourite', this.id);
    },
    deleteFriend() {
      this.$emit('delete-friend', this.id);
    }
  }
};
</script>