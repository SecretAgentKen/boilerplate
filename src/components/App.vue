<!-- 
	Vue SFCs have multiple top-level tags that are available. 
	
	<template> is the HTML that you want rendered for the Vue object. It doesn't have to be strictly HTML. You can use Pug or other templating engines as well, 
	see the Vue-loader documentation for details.
    
	<script> is where your JavaScript lives. For Vue SFCs, the format is typically that of ES6 modules using import and export. Remember that all of our JavaScript
	will be passed through Babel first prior to making it to the browser, so you can use the latest and greatest JavaScript capabilities knowing that it will be translated
	into browser compatible JavaScript afterwards. Like <template>, you can also use TypeScript or other languages that can become JavaScript here.

	<style> is where any CSS goes for your module. Again, SASS and LESS are supported as well if Webpack is configured for them. One interesting thing here is
	the "scoped" keyword. This tells the compiler to ONLY apply the CSS to this component and its children. If not supplied, it applies to the entire page. 
-->

<template>
	<div>
		<nav class="navbar navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">Boilerplate Notes</a>
			</div>
		</nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-3">
					<side-panel />
				</div>
				<div class="col">
					<view-port />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// When using components, you MUST tell Vue that they exist by importing them and then referencing them in "components"
// If your component doesn't render, you most likely skipped that step.
import SidePanel from './SidePanel.vue';
import ViewPort from './ViewPort.vue';
// Here we bring in our server API. Rather than duplicating HTML calls across multiple modules, we consolidate them into a
// simple JS file and import it as a mixin here. See the Vue documentation on mixins. What's important is that any of the "methods"
// defined in ServerApi are now going to be available in our SFC.
import ServerApi from '../helpers/mixinServerApi.js';

export default {
	components: {
		// Here we specify the components that will be used above. Note that they are camel-cased here but are kebab-cased as tags.
		SidePanel,
		ViewPort,
	},
	// This binds ServerApi's methods with our own
	mixins: [ServerApi],
	// Created is one of the Vue lifecyle functions. This occurs once for this module, when it is initially created but prior to being
	// rendered. We'll use it to initialize our state from the server.
	created() {
		// Under the hood, our api calls are using the browser "fetch" method. See the MDN for more on fetch. Fetch returns a Promise
		// which we wait for with .then and then act on. The API call hides some of this so the result of this Promise is the full list of notes.
		this.apiGetAll().then((result) => {
			// See Vuex for details. Here we set the state by setting all of the notes to the array we just got back from the server.
			this.$store.commit('addNotes', result.notes);
		});
	},
};
</script>

<!-- As mentioned above, this is a scoped style tag so that it only applies to this module -->
<style scoped>
nav {
	margin-bottom: 1rem;
}
</style>

