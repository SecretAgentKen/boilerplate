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
			class="form-control"
			v-model="contents"
			rows="20"
			:disabled="!$store.state.activeNoteId"
		></textarea>
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

<script>
import ServerApi from '../helpers/mixinServerApi.js';
export default {
	// See the Vue documentation for more. The data function provides us values that are reactive and bindable above. If you don't need reactivity or binding,
	// it doesn't have to be in data, you can just assign to "this".
	data() {
		return {
			contents: '',
			original: '',
		};
	},
	mixins: [ServerApi],
	methods: {
		updateContents(id) {
			this.contents = this.original = '';
			if (id) {
				let note = this.$store.state.notes.find((n) => n.$loki === id);
				this.contents = this.original = note.contents || '';
			}
		},
		save() {
			let note = this.$store.state.notes.find(
				(n) => n.$loki === this.$store.state.activeNoteId
			);
			this.apiSaveNote({ ...note, contents: this.contents }).then(
				(note) => {
					this.$store.commit('updateNote', note);
					this.updateContents(note.$loki);
				}
			);
		},
	},
	created() {
		const myself = this;
		// We are setting up a Vuex watch here (similar to a Vue watch). See the Vuex docs for more.
		// This watch is setup to wait for an activeNoteId change on the state (ie. someone has selected a different note).
		// When this happens, we want to reload the new note into the editor and not keep showing the old stuff.
		// This is one of the key uses of Vuex. Rather than having to listen for events in a chain and pass them to every node,
		// we can maintain a global state in the app and have nodes only listen to what they are interested in.
		this.unwatch = this.$store.watch(
			(state) => {
				return state.activeNoteId;
			},
			(newId) => {
				// Update contents based on the new active node
				myself.updateContents(newId);
			}
		);
		myself.updateContents(myself.$store.state.activeNoteId);
	},
	// Another lifecycle hook similar to created. This occurs then the module is destroyed (post unmount)
	destroyed() {
		this.unwatch();
	},
};
</script>

<style scoped>
textarea {
	margin-bottom: 1rem;
}
</style>