<!-- 
Nothing more than a container element for the note editor 
This could easily be refactored out
-->
<template>
	<div>
		<note-editor />
	</div>
</template>

<script>
import NoteEditor from './NoteEditor.vue';
export default {
	components: { NoteEditor },
};
</script>