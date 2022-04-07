<!-- This module is the note content editor found in the view port -->
<template>
  <div>
    <label class="form-lable">Note Contents</label>
    <!-- 
			Note something about the controls below. With Vue we can act directly on our data components with events. 
			We don't always need a method. We can set contents to an a string, or the original value, etc. Save does use
			a method since it's more involved.
			Also, see the Vue documentation about some of the short-hands below. :disabled is the same thing as v-bind:disabled (colon being a short hand for v-bind)
			and @click is the same as v-on:click (@ being a shorthand for v-on)
		-->
    <textarea
      v-model="contents"
      class="form-control"
      rows="20"
      :disabled="!store.state.activeNoteId"
    />
    <div class="text-end">
      <button
        class="btn btn-danger"
        :disabled="!contents"
        @click="contents = ''"
      >
        Clear
      </button>
      <button
        class="btn btn-secondary"
        :disabled="contents === original"
        @click="contents = original"
      >
        Revert
      </button>
      <button
        class="btn btn-primary"
        :disabled="contents === original"
        @click="save"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
// See the Vue documentation for more. We are defining reactive elements here, the same as the "data" block from the Vue 2 Options API.
import { ref, watch } from 'vue';
import { useStore } from '../helpers/store';
import { useServerApi } from '../helpers/composableServerApi';

const contents = ref('');
const original = ref('');

const store = useStore();
const server = useServerApi();

// We are setting up a watch here. See the Vue docs for more.
// This watch is setup to wait for an activeNoteId change on the state (ie. someone has selected a different note).
// When this happens, we want to reload the new note into the editor and not keep showing the old stuff.
// This is one of the key uses of Vue reactivity on our state. Rather than having to listen for events in a chain and pass them to every node,
// we can maintain a global state in the app and have nodes only listen to what they are interested in.
watch(
	() => store.state.activeNoteId,
	(newId) => {
		// Update contents based on the new active node
		updateContents(newId);
	}
);

updateContents(store.state.activeNoteId);

function updateContents(id) {
	contents.value = original.value = '';
	if (id) {
		let note = store.state.notes.find((n) => n.$loki === id);
		contents.value = original.value = note.contents || '';
	}
}
function save() {
	let note = store.state.notes.find(
		(n) => n.$loki === store.state.activeNoteId
	);
	server.apiSaveNote({ ...note, contents: contents.value }).then((note) => {
		store.updateNote(note);
		updateContents(note.$loki);
	});
}
</script>

<style scoped>
textarea {
	margin-bottom: 1rem;
}
</style>