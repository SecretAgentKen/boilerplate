<!-- Side panel container with the add button, filter, and note list -->
<template>
  <div class="d-flex flex-column side-panel">
    <button
      class="btn btn-primary"
      @click="modal.show()"
    >
      Add Note
    </button>
    <title-filter />
    <note-list />
    <div
      ref="newNoteModal"
      class="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Add Note
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            />
          </div>
          <div class="modal-body">
            <div class="form-floating">
              <input
                v-model="newTitle"
                type="text"
                class="form-control"
                autofocus
              >
              <label>New Note Title</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-primary"
              @click="create"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TitleFilter from './TitleFilter.vue';
import NoteList from './NoteList.vue';
// bootstrap has already been imported, but we want access to the Modal portion below
import { Modal } from 'bootstrap';
import { ref, onMounted } from 'vue';
import { useServerApi } from '../helpers/composableServerApi';
import { useStore } from '../helpers/store';

// Instead of this.$refs, now ref= will be assigned to the same named ref you declare locally
const newNoteModal = ref(null);
const modal = ref(null);
const newTitle = ref(null);
const server = useServerApi();
const store = useStore();

// Same as the mounted() {} options API
onMounted(() => {
	modal.value = new Modal(newNoteModal.value);
});

function create() {
	modal.value.hide();
	server.apiCreateNote(newTitle.value).then((data) => {
		//store.state.notes.push(data);
		//An example of something you CAN'T do. state is readonly from Vue, so any manipulation
		// of it outside of the mutators won't work. Instead we...
		store.addNote(data);

		newTitle.value = ''; // Again, note that you have to use .value when dealing with ref's in the script section
	});
}
</script>

<style scoped>
.side-panel > * {
	margin-bottom: 1rem;
}
</style>