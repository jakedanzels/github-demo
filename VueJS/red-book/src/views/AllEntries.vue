<template>
  <div class="all-entries">
    <h1><span class="red">All</span> Entries</h1>
   <button @click="loadEntries">Load</button>
   <ul>
     <li v-for="entry in entries" :key="entry">
       <keep-alive>
       <entry :scene="entry.scene" :lines="entry.lines"></entry>
       </keep-alive>
     </li>
   </ul>
  </div>
</template>

<script>
import Entry from '@/components/Entry.vue';
export default {
  data() {
    return {
      entries: []
    }
  },
  components: {
    Entry
  },
  methods: {
    loadEntries() {
      fetch('https://the-red-book-jd.firebaseio.com/entries.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const results = [];
        for (const id in data) {
          results.push({
            id: id,
            scene: data[id].scene,
            lines: data[id].lines
          });
        }
        this.entries = results;
      });
    }
  }
}
</script>
