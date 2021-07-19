<!-- Side panel container with the add button, filter, and note list -->
<template>
	<div class="d-flex flex-column side-panel">
		<button class="btn btn-primary" @click="modal.show()">Add Note</button>
		<title-filter />
		<note-list />
		<div class="modal" ref="newNoteModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Add Note</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						/>
					</div>
					<div class="modal-body">
						<div class="form-floating">
							<input
								type="text"
								class="form-control"
								v-model="newTitle"
								autofocus
							/>
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
						<button class="btn btn-primary" @click="create">
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TitleFilter from './TitleFilter.vue';
import NoteList from './NoteList.vue';
// bootstrap has already been imported, but we want access to the Modal portion below
import { Modal } from 'bootstrap';
import ServerApi from '../helpers/mixinServerApi.js';

export default {
	components: {
		NoteList,
		TitleFilter,
	},
	mixins: [ServerApi],
	mounted() {
		// Mounted is another lifecycle method. This is called whenever the module is attached to the DOM. This
		// gives us access to our DOM elements which we can access with $ref. See the Vue docs for more info.
		// The key thing here is we want to make a bootstrap Modal out of our generated DOM elements. See the
		// ref attribute on the modal above.
		this.modal = new Modal(this.$refs.newNoteModal);
	},
	data() {
		return {
			modal: null,
			newTitle: '',
		};
	},
	methods: {
		create() {
			this.modal.hide();
			this.apiCreateNote(this.newTitle).then((data) => {
				this.$store.commit('addNote', data);
				this.newTitle = '';
			});
		},
	},
};
</script>

<style scoped>
.side-panel > * {
	margin-bottom: 1rem;
}
</style>