<!-- This module is the listing of existing notes in the sidebar -->

<template>
	<div class="list-group">
		<a
			href="#"
			class="list-group-item list-group-item-action"
			:class="{ active: $store.state.activeNoteId === note.$loki }"
			v-for="note in notes"
			:key="note.$loki"
			@click="$store.commit('setActiveNoteId', note.$loki)"
		>
			{{ note.title }}
			<i class="bi-trash-fill" @click="removeNote(note)"></i>
		</a>
		<a
			href="#"
			class="list-group-item list-group-item-action disabled"
			v-if="!notes.length"
			>No notes.</a
		>
	</div>
</template>

<script>
import ServerApi from '../helpers/mixinServerApi.js';
export default {
	methods: {
		removeNote(note) {
			this.apiDeleteNote(note).then(() => {
				this.$store.commit('removeNote', note.$loki);
				this.$store.commit('setActiveNoteId', null);
			});
		},
	},
	mixins: [ServerApi],
	// Computed values are reactive and bindable. They allow you to do
	// filters or modifications to other reactive values and then only update when the
	// reactive values change. In this case, the computed value should only update when noteFilter or notes changes.
	computed: {
		notes() {
			if (this.$store.state.noteFilter) {
				return this.$store.state.notes.filter((n) => {
					return !n.title.search(
						new RegExp(this.$store.state.noteFilter)
					);
				});
			} else return this.$store.state.notes;
		},
	},
};
</script>

<style scoped>
i {
	float: right;
}
</style>