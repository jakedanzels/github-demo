<template>
  <li>
    <h4>{{ topicName }}</h4>
    <span>{{ description }}</span>
    <button @click="selectTopic(id)" width="20px">Edit</button>
  </li>
</template>

<script>
export default {
  inject: ['selectTopic'],
  props: ['id', 'topicName', 'description'],
  emits: ['select-topic'],
};
</script>