<template>
<base-card>
  <div class="all-entries">
    <h1><span class="red">All</span> Entries</h1><input id="search" name="search" type="text" placeholder="Search" v-model="search"/>

   <ul>
     <li v-for="item in entries" :key="item">
       <entry :scene="item.entry.scene" :lines="item.entry.lines"></entry>
     </li>
   </ul>
  </div>
</base-card>
</template>

<script>
import Entry from '@/components/Entry.vue';
export default {
  data() {
    return {
      search: '',
      displayEntries: []
    }
  },
  components: {
    Entry
  },
  computed: {
    entries(){
      if(this.search){
        var query = this.search.toLowerCase();
        var items = this.$store.getters.allEntries;
        var results = [];
        for(let i = 0; i < items.length; i++) {
          if(items[i].entry.scene.toLowerCase().includes(query)){
            results.push(items[i]);
            continue;
          }      
          for(let j = 0; j < items[i].entry.lines.length; j++){
            if(items[i].entry.lines[j].who.toLowerCase().includes(query) ||
              items[i].entry.lines[j].what.toLowerCase().includes(query)){
              results.push(items[i]);
              break;
            }
          }
        }
        return results;
      }else{
        return this.$store.getters.allEntries;
      }
    }
  },
  created() {
      this.$store.dispatch('loadEntries');
      //console.log(this.$store.getters.allEntries)
  }
}
</script>