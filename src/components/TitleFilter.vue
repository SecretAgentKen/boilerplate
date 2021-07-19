<!-- Component for doing title filters -->
<template>
	<div class="form-floating">
		<input
			type="text"
			id="titleFilter"
			class="form-control"
			v-model="input"
			@input="filterChanged"
		/>
		<label for="titleFilter">Title Filter</label>
	</div>
</template>

<script>
export default {
	data() {
		return {
			input: '',
		};
	},
	methods: {
		filterChanged: function () {
			this.$store.commit('setNoteFilter', this.input);
		},
	},
};
</script>