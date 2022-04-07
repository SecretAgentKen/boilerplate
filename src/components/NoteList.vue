<!-- This module is the listing of existing notes in the sidebar -->

<template>
  <div class="list-group">
    <a
      v-for="note in notes"
      :key="note.$loki"
      href="#"
      class="list-group-item list-group-item-action"
      :class="{ active: store.state.activeNoteId === note.$loki }"
      @click="store.setActiveNoteId(note.$loki)"
    >
      {{ note.title }}
      <i
        class="bi-trash-fill"
        @click="removeNote(note)"
      />
    </a>
    <a
      v-if="!notes.length"
      href="#"
      class="list-group-item list-group-item-action disabled"
    >No notes.</a>
  </div>
</template>

<script setup>
import { useServerApi } from '../helpers/composableServerApi.js';
import { useStore } from '../helpers/store';
import { computed } from 'vue';

const store = useStore();
const server = useServerApi();

// Computed values are reactive and bindable. They allow you to do
// filters or modifications to other reactive values and then only update when the
// reactive values change. In this case, the computed value should only update when noteFilter or notes changes.
const notes = computed(() => {
	if (store.state.noteFilter) {
		return store.state.notes.filter((n) => {
			return !n.title.search(new RegExp(store.state.noteFilter));
		});
	} else return store.state.notes;
});

function removeNote(note) {
	server.apiDeleteNote(note).then(() => {
		store.removeNote(note.$loki);
		store.setActiveNoteId(null);
	});
}
</script>

<style scoped>
i {
	float: right;
}
</style>