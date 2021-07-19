// This is the entry point for the ui. Webpack will use this file as the basis for the generated "main.js" that will go into public

// Import the bootstrap JavaScript. Webpack will look in the local directory as well as node_modules for things when referenced. See
// the webpack documentation for the order of reference resolving. 
import 'bootstrap';

// Import the bootstrap CSS. Webpack will compile this CSS into the generated JavaScript to be applied at runtime.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Vue and Vuex for refering to below.
import Vue from 'vue';
import Vuex from 'vuex';

// Import out primary single file component (SFC). This is what will be rendered in the HTML
import App from './components/App.vue';

// This injects the Vuex state management into Vue so that it is accessible in every component.
Vue.use(Vuex);

// Create the Vuex store. This store contains initial state and the mutations for updating the state.
// Since this is such a simple example, there are no actions created.
const store = new Vuex.Store({
	state: {
		// State will maintain the list of notes, the currently selected note, and the filter for which notes should be shown.
		notes: [],
		activeNoteId: null,
		noteFilter: ''
	},
	mutations: {
		addNote(state, note) {
			state.notes.push(note);
		},
		addNotes(state, notes) {
			state.notes = notes;
		},
		removeNote(state, noteId) {
			state.notes = state.notes.filter((n) => n.$loki !== noteId);
		},
		updateNote(state, note) {
			let idx = state.notes.findIndex((n) => n.$loki === note.$loki);
			// Vue is reactive, but it cannot tell when you update values inside a non-reactive object in an array. 
			// See the "reactivity" documentation in Vue for more info. 
			// We use Vue.set to overcome this.
			Vue.set(state.notes, idx, note);
		},
		setActiveNoteId(state, id) {
			state.activeNoteId = id;
		},
		setNoteFilter(state, filter) {
			state.noteFilter = filter;
		}
	}
});

// This is what binds Vue to our HTML. The purpose of using "render" here and not "template" is this prevents
// the need for including the Vue template compiler. Webpack has precompiled all of our templates already so
// this makes the necessary Javascript to deploy smaller
// This statement effectively says "Create a new Vue object where the render function is that of the App render. Bind the store
// above to every child, and mount the object to the id="app" element in the HTML"
new Vue({
	render: h => h(App),
	store: store
}).$mount('#app');