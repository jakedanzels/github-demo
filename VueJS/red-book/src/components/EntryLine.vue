/* eslint-disable vue/no-mutating-props */
<template>
    <input id="who" name="who" type="text" placeholder="Who?" v-model="who">
    <input id="what" name="what" type="text" placeholder="Said what?" v-model="what">
    <button v-if="lineNo > 0" type="button" class="sub right" @click="remove">Remove Line</button>
</template>

<script>
import { useModelWrapper } from '../utils/modelWrapper'
export default {
    name: 'EntryLine',
    emits: ['lineRemove', 'line-remove', 'update:modelValue', 'update:whatSaid'],
    props: {
        modelValue: String,
        whatSaid: String,
        lineNo: Number
    },
    setup(props, { emit }) { 
    return { 
      who: useModelWrapper(props, emit, 'modelValue'), 
      what: useModelWrapper(props, emit, 'whatSaid') 
    }
  },
  methods: {
      remove() {
          this.$emit('line-remove',this.lineNo);
      }
  }
}
</script>