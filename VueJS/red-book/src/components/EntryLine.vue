/* eslint-disable vue/no-mutating-props */
<template>
    <input id="who" name="who" type="text" placeholder="Who? (Leave Blank for Scene update!)" v-model="who">
    <input id="what" name="what" type="text" placeholder="What?" v-model="what">
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
</style>