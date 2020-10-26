<template>
  <form @submit.prevent="submitForm">
    <div class="new-entry">
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
      <button type="button" class="sub" @click="addLine">Add Line</button>
    </div>
    <hr>
    <div>
      <button>Save</button>
      <transition>
        <h3 v-if="saveFeedback">{{saveFeedback}}</h3>
      </transition>
    </div>
  </form>
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
  methods: {
    submitForm() {
      fetch('https://the-red-book-jd.firebaseio.com/entries.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.entry)
      });

      this.entry.scene = '';
      this.entry.lines = [{
        lineNo: 0,
        who: '',
        what: ''
      }]
      this.saveFeedback = "Saved!";
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

<style>

h1 {
  margin:0;
}

</style>