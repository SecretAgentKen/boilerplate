// This is the entry point for the ui. Webpack will use this file as the basis for the generated "main.js" that will go into public

// Import the bootstrap JavaScript. Webpack will look in the local directory as well as node_modules for things when referenced. See
// the webpack documentation for the order of reference resolving. 
import 'bootstrap';

// Import the bootstrap CSS. Webpack will compile this CSS into the generated JavaScript to be applied at runtime.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import createApp to create our application below.
import { createApp } from 'vue';

// Import out primary single file component (SFC). This is what will be rendered in the HTML
import App from './components/App.vue';

// This creates the Vue application, specifying that App from App.vue will be our main page
const app = createApp(App);
// Mount the App to the id="app" element in the HTML
app.mount('#app');
