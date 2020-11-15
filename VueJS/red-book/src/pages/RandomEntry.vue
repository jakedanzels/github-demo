<template>
  <div @click="getRandomEntry" class="randomEntry">
    <transition name="fade" mode="out-in">
      <h3 @click="getRandomEntry" v-if="hint">{{hint}}</h3>
    </transition>
    <div class="paper">
      <h1 title="Click for another one"><span class="red">Random</span> Entry</h1>
      <entry class="paper-content" v-if="!isLoading" :entry="entry"></entry>
    </div>
  </div>
</template>

<script>
//import UnderConstruction from '@/components/UnderConstruction.vue';
import Entry from '@/components/Entry.vue';
export default {
  data() {
    return {
      entry: {
            id: String,
            scene: String,
            lines: Array
      }
      , isLoading: true
      , hint: ''
    }
  },
  components: {
    Entry
  },
  methods: {
    getRandomEntry() {
      this.hint = null;
      var entries = this.$store.getters.allEntries;
      this.entry = entries[Math.floor(Math.random() * entries.length)].entry;
    }
  },
  async mounted() {
    this.getRandomEntry();
    this.isLoading = false;
    var hintSeen = this.$store.getters.randomEntryHintSeen;
    this.hint = hintSeen ? null : 'Hint: Click or Tap anywhere to see another Random Entry'
    if(!hintSeen) this.$store.dispatch('randomEntryHintSeen');
  },
  watch: {
    hint() {
        if(this.hint)
        setTimeout(() => {
          this.hint = null;
        },3000)
      }
  }
}
</script>


<style scoped>

h1 {
  cursor: pointer;
  margin-left: 70px;
}
h3 {
  margin-left: 75px;
}

h1:hover {
  text-decoration: underline;
  text-decoration-color: blue;
}

@import url(https://fonts.googleapis.com/css?family=Roboto);
@import url(https://fonts.googleapis.com/css?family=Handlee);

body {
    margin: 40px 0 0;
    background: #91D1D3;
    font-family: 'Roboto', sans-serif;
}

.paper {
    position: relative;
    width: 90%;
    max-width: 800px;
    min-width: 375px;
    height: 480px;
    margin: 0 auto;
    background: #fafafa;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,.3);
    overflow: hidden;
}
.paper:before {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 0;
    width: 60px;
    background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
    background-size: 30px 30px;
    border-right: 3px solid #D44147;
    box-sizing: border-box;
}

.paper-content {
    position: absolute;
    top: 60px; right: 0; bottom: 30px; left: 70px;
    background: linear-gradient(transparent, transparent 28px, #91D1D3 28px);
    background-size: 30px 30px;
}

.paper-content textarea,
ul,
li
 {
    width: 90%;
    max-width: 80%;
    height: 100%;
    max-height: 100%;
    line-height: 30px;
    padding: 0 10px;
    border: 0;
    outline: 0;
    background: transparent;
    color: darkblue;
    font-family: 'Handlee', cursive;
    font-weight: bold;
    font-size: 18px;
    box-sizing: border-box;
    z-index: 1;
}

footer {
    margin-top: 30px;
    text-align: center;
    font-size: 12px;
    color: rgba(0,0,0,.6);
}
footer a {
    color: rgba(255,255,255,.8);
}
</style>