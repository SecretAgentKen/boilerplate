// Create a store for global state management. This would typically be done by Flux/Redux/Vuex/Pinia but there's no need with Vue 3.
// This store contains initial state and the mutations for updating the state.
import { reactive, readonly } from 'vue';

const state = reactive({
	// State will maintain the list of notes, the currently selected note, and the filter for which notes should be shown.
	notes: [],
	activeNoteId: null,
	noteFilter: ''
});

// This is our export. We export all of the functions for mutation and a readonly, reactive version of our state
// This means the use can use state in their template without issue but if they try to modify anything, it will fail
// UNLESS they use the mutators
export function useStore() {
	return {
		state: readonly(state),
		addNote,
		addNotes,
		removeNote,
		updateNote,
		setActiveNoteId,
		setNoteFilter
	};
}

function addNote(note) {
	state.notes.push(note);
}

function addNotes(notes) {
	state.notes = notes;
}

function removeNote(noteId) {
	state.notes = state.notes.filter((n) => n.$loki !== noteId);
}

function updateNote(note) {
	let idx = state.notes.findIndex((n) => n.$loki === note.$loki);
	state.notes[idx] = note;
	// In Vue 2, we had to use Vue.set because array index values like this aren't reactive
	// Not a problem in Vue 3!!
}

function setActiveNoteId(id) {
	state.activeNoteId = id;
}

function setNoteFilter(filter) {
	state.noteFilter = filter;
}
