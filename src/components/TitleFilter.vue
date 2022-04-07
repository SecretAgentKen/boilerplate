<!-- Component for doing title filters -->
<template>
  <div class="form-floating">
    <input
      id="titleFilter"
      v-model="input"
      type="text"
      class="form-control"
      @input="filterChanged"
    >
    <label for="titleFilter">Title Filter</label>
  </div>
</template>

<script setup>
import { useStore } from '../helpers/store';
import { ref } from 'vue';
// Vue supports "reactive" objects, but if you're using a basic type,
// you have to use "ref" instead. It's transparent in the template
// but be sure to reference ".value" if you use it in methods like below!
const input = ref(''); // equivalent to data() { return { input: '' } }
const store = useStore();

function filterChanged() {
	store.setNoteFilter(input.value);
}
</script>