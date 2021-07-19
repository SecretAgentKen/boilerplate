# Boilerplate

This is an example project for playing with Vue, Express, document stores, and other modern web development tools. It's meant to be a structured learning tool so that you have a working base application to use rather than just running "Hello World" style applications. If you're new to web development or the last time you worked on a website was with the *LAMP* stack, see the references at the bottom of this file first.

# Getting Started

    npm install
    npx webpack
    node app

Connect your browser to http://localhost:3000

# Structure

## Server

The server is an ExpressJS server found in `app.js`, the only file necessary for the backend. This runs using NodeJS with `node app`. It exposes port 3000 allowing a browser to connect to that port and interact with the website. It runs a LokiJS database which is a simple, in-memory document store that's going to host our notes.

## UI

The UI is a single-paged website. VueJS provides the data-binding framework while Bootstrap provides the look and feel. Vuex is used for state management. Webpack is used to generate all the assets from the HTML, CSS, JavaScript, and Vue components. The webpack configuration is found in `webpack.config.js`. The base HTML is located in `src/static/index.html` and the entry point for the JavaScript is in `src/ui.js`. The `ui.js` file then references a mixin in `src/helpers` as well as a number of Vue single-file-components (SFCs) in `src/components`. When webpack is finished, the results are put into the `public` folder with the server application hosts.

# Making Changes

The `npm install` run earlier downloaded all of the dependencies necessary for running the application. It shouldn't be necessary again. When making changes to the UI components, you will need to re-run `npx webpack`. You may wish to run `npx webpack -w` instead in a different terminal. This will *watch* the UI files for changes and auto-compile whenever one of them changes. For the server in `app.js` however, you will need to use Ctrl+C to kill the server and restart it with `node app` each time. You do not need to restart the server if your changes are only in the UI. Just refresh your browser and you'll see your new UI code.

# Tasks / Things to Do

As a teaching tool, the following tasks give you an opportunity to make changes throughout the application. These start easier and get more complex as they go.

## Prevent Blank Title's and Filters 

If you press *Space* in the Title Filter component, it will filter out any titles without a space. In addition, you can create a title with just spaces or no text at all. Prevent both of these cases from happening.

HINT: Edit `TitleFilter.vue` and `SidePanel.vue`. Make use of the `.trim()` JavaScript function for strings and `:disabled` for buttons.

## Add A Filter Icon

When a title filter is added, the list on the left only shows titles that match that filter. It may not be obvious that the values shown have been filtered. Provide a filter icon on the list to show that the results have been filtered.

HINT: Edit `NoteList.vue` and make use of the `funnel-fill` icon. See the use of the `trash-fill` icon to see how it's used.

## Allow Pressing Enter for the Add Title Modal

When you attempt to add a new note and are asked for a title, you cannot just press Enter when done typing. Add that ability.

HINT: Edit `SidePanel.vue`. You may need a `form` component and then make use of `@submit`

## Add Confirmation for Delete

If you click a trash icon, the note is removed permanently. Instead, show a modal to force the user to confirm removal.

HINT: Edit `NoteList.vue` and refer to the `SidePanel.vue` and Bootstrap documentation for how to use a modal.

## Refactor Components

Cleanup some of our code. Refactor the `ViewPort` component out. Instead of using `commit`, add *actions* to the Vuex store and switch to calling `dispatch`. 

HINT: Actions will be added to the `store` initialization in `ui.js`. When removing the `ViewPort`, be sure that the `NoteEditor` is imported into the container AND specified as a `component`.

## Fix Active Id With Title Filters

Click on a note, then add a Title Filter that does NOT include that note. The note contents will still be available in the editor even though the selected note isn't shown. Fix this issue.

HINT: Different options. Refactor so that the filtered notes are now in the state instead of generating them in the `computed` field in `NoteList.vue`. That allows the editor component to see if the current id is in the filtered notes and adjust accordingly. Another option is to do the same type of `computed` structure in the editor to also see if the note is in the filtered list. 

## Add a Clear All Capability

Add a button to the sidebar that will delete all notes.

HINT: Add a new route to `app.js`, an entry for it in `mixinServerApi.js`, a button to `SidePanel.vue`, and then update the store.

## Refactor out the $loki id

LokiJS uses $loki as the unique, auto-incrementing id for each record. This id is used both in the server and the UI for differentiating records. Unfortunately this ties the UI to LokiJS when it should be decoupled. Add a `uid` field to the note records and use that instead in the UI.

HINT: Loki doesn't allow you to rename the id, but that doesn't stop you from adding a new field to your document.

# References

* [Learn Web Development MDN](https://developer.mozilla.org/en-US/docs/Learn) - Start Here / Everything Web
* [NodeJS Intro](https://nodejs.dev/learn) - Introduction to NodeJS
* [VueJS Guide](https://vuejs.org/v2/guide/) - Guide to Vue and data-binding
* [Vuex](https://vuex.vuejs.org/) - Vue's state management
* [ExpressJS](https://expressjs.com/) - HTTP server based on Node
* [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - UI toolkit for CSS and JavaScript components with a consistent look and feel
* [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon library
* [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - MDN documentation on the fetch API now built into modern browsers
* [LokiJS](http://techfort.github.io/LokiJS/) - An in-memory document-object store
* [Webpack](https://webpack.js.org/concepts/) - Bundler and asset manager
* [ESLint](https://eslint.org/docs/user-guide/configuring/) - JavaScript linter
* [Babel](https://babeljs.io/docs/en/) - JavaScript transpiler