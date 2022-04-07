// This is designed to be a Vue composable. It provides all of the API calls to the server. The values returned from here are simple functions
// to fetch and return data. Composables would typically include other Vue-specific calls but we don't need them in this simple a case.
// This makes use of fetch (see the MDN on fetch for details)
// The jsonFetch call acts as a wrapper around it and returns the JSON data coming from any particular call, and expects to send
// JSON as the body.

export function useServerApi() {
	return {
		apiCreateNote(title) {
			return post('/notes', { title: title });
		},
		apiGetAll() {
			// Note that this isn't using jsonFetch since there is no body for the GET calls.
			return fetch('/notes').then((resp) => resp.json());
		},
		apiSaveNote(note) {
			return put('/notes', note);
		},
		apiDeleteNote(note) {
			return del('/notes', note);
		}
	};
}

function post(url, obj) {
	return jsonFetch(url, 'POST', obj);
}

function put(url, obj) {
	return jsonFetch(url, 'PUT', obj);
}

function del(url, obj) {
	return jsonFetch(url, 'DELETE', obj);
}

function jsonFetch(url, method, obj) {
	return fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	}).then(resp => resp.json());
}