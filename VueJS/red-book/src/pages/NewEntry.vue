<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <h1 v-if="isGuest">
        Guests cannot add entries, sorry.
      </h1>
      <div v-else class="new-entry">
        <h1><span class="red">New</span> Entry</h1>
        <div class="form-control">
          <label for="scene">Scene</label>
          <input id="scene" name="scene" type="text" placeholder="Optional" v-model="entry.scene">
        </div>
        <hr>
        <div class="form-control">
          <!-- <ul class="nostyle"> -->
            <transition-group tag="ul" class="nostyle">
            <li class="nostyle" v-for="item in entry.lines" :key="item.lineNo">
              <entry-line v-model="item.who" 
              v-model:whatSaid="item.what" 
              v-model:lineNo="item.lineNo"
              v-on:line-remove="removeLine"
              ></entry-line>
            </li>
            </transition-group>
          <!-- </ul> -->

          <!-- <entry-line v-model="EntryLine.who" v-model:whatSaid="EntryLine.what"></entry-line> -->
        </div>
        <button type="button" class="sub" @click="addLine" :disabled="isGuest">Add Line</button>
      </div>
      <hr>
      <div v-if="!isGuest">
        <base-button>Save</base-button>
        <transition>
          <h3 v-if="saveFeedback">{{saveFeedback}}</h3>
        </transition>
      </div>
    </form>
  </base-card>
</template>

<script>
import EntryLine from '@/components/EntryLine.vue';
export default {
  data() {
    return {
      entry: {
        scene: '',
        lines: [{
                lineNo: 0,
                who: '',
                what: ''
              }]
      },
      saveFeedback: null
    };
  },
  computed: {
    isGuest() {
      return this.$store.getters.isGuest;
    }
  },
  methods: {
    async submitForm() {
      this.saveFeedback = null;
      await this.$store.dispatch("refreshToken");
      const token = this.$store.getters.token;
      await fetch(`https://the-red-book-jd.firebaseio.com/entries.json?auth=${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.entry)
      }).then(response => {
        if (response.ok){
          this.entry.scene = '';
          this.entry.lines = [{
            lineNo: 0,
            who: '',
            what: ''
          }]
          this.saveFeedback = "Saved!";
        } else {
          throw new Error(`Could not save data! ${response.statusText}`)
        }
      })      
      .catch((error) => {
          console.log(error);
          this.saveFeedback = error.message;
      });
    },
    addLine() {
      var nextLine = Math.max(...this.entry.lines.map(item => item.lineNo)) + 1;
      this.entry.lines.push({ lineNo: nextLine, who:'',what:''});
    },
    removeLine(lineNo){
      this.entry.lines = this.entry.lines.filter(item => item.lineNo !== lineNo);
    }
  },
  components: {
    EntryLine
  },
  watch: {
    saveFeedback() {
        if(this.saveFeedback)
        setTimeout(() => {
          this.saveFeedback = null;
        },2000)
      }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

li {
  list-style-type: none;
}

ul {
  padding-left: 0;
}

h1 {
  margin: 0;
}
</style>