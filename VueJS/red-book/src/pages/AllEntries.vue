<template>
<base-card>
  <div class="all-entries">
    <h1><span class="red">{{((search || selectedPerson) && selectedPerson != 'All') ? 'Filtered' : 'All'}}</span> Entries ({{entries.length}})</h1>
    <ul>
      <li v-for="person in people" 
      class="person"
      :key="person" 
      :class="{ 'active': person === selectedPerson }"
      @click="selectedPerson = person">
        <a class="link-person">{{person}}</a>
      </li>
    </ul>
    <input id="search" name="search" type="text" placeholder="Search" v-model.trim="search"/>
   <ul>
     <li v-for="(entry,x) in entries" :key="x">
       <entry :entry="entry.entry"></entry>
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
      selectedPerson: ''
    }
  },
  components: {
    Entry
  },
  methods: {
    toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  },
  computed: {
    entries(){
      if(this.search || this.selectedPerson){
        var query = this.search || this.selectedPerson;
        query = query.toLowerCase();
        var items = this.$store.getters.allEntries;
        if(this.selectedPerson === 'All') return items;
        var results = [];
        for(let i = 0; i < items.length; i++) {
          if(items[i].entry.scene) {
            if(items[i].entry.scene.toLowerCase().includes(query) && items[i].entry.scene){
              results.push(items[i]);
              continue;
            } 
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
    },
    people(){
        var items = this.$store.getters.allEntries;
        var results = [];
        var person = '';
        results.push('All');
        for(let i = 0; i < items.length; i++) {  
          for(let j = 0; j < items[i].entry.lines.length; j++){
            person = this.toTitleCase(items[i].entry.lines[j].who).trim();
            // todo control these exclusions with an array changable by admins in the app itself
            if( person.length === 0 || 
                person.includes('(') || 
                person.includes(`'`) ||
                person === 'Ray Newton' ||
                person === 'Server' ||
                person === 'Waiter' ||
                person === 'Customer' ||
                person === 'Waitress' ||
                person === 'Quizmaster' ||
                person === 'Manager') continue;
                //now just the first name
                person = person.split(' ')[0];
            if(!results.includes(person)){
              results.push(person);
            }
          }
        }
        return results.sort();
    }
  },
  created() {
      this.$store.dispatch('loadEntries');
  },
  watch: {
    selectedPerson() {
      if(this.selectedPerson){
        this.search = null;
      }
    },
    search() {
      if(this.search){
        this.selectedPerson = null;
      }
    }
  }
}
</script>

<style scoped>
h1 {
  margin-left: 10px;
}
ul {
  list-style-type: none;
  padding-left: 6px;
}

.person {
  display: inline-block;
}

li {
    padding-left: 10px;
    display: inline;
    cursor: pointer;
}
input {
  margin-left: 10px;
}
.active {
  font-weight: bold;
}
.link-person {
  color: #c01e19;
  padding-left: 2px;

}
.link-person:hover,
.link-person:active,
.link-person.router-link-active,
.link-person.router-link-hover {
    font-weight: bold;
}
</style>