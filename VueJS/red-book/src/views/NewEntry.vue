<template>
  <div class="new-entry">
    <h1><span class="red">New</span> Entry</h1>
    <under-construction></under-construction>
  </div>
</template>

<script>
import UnderConstruction from '@/components/UnderConstruction.vue';
export default {
  components: {
    UnderConstruction
  }
}
</script>