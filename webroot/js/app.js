/**
 * Application JavaScript for metaphoric.nl.
 * Contains the Application* classes.
 *
 * The actual initialization happens in init.js; all files
 * will be concatenated/minified in production.
 *
 * @author Elte Hupkes
 */
App = Em.Application.create({
	rootElement: $('#content-body'),

	titleElement : $('title'),
	setTitle: function(title) {
		this.titleElement.html(title + ' :: Metaphoric');
	},

	/**
	 * A list of static pages to us as an object
	 * for the action helper. This is sorta awkward,
	 * but you have to pass an object to the "action"
	 * helper, and otherwise I'd have to use a separate
	 * identical action for each page.
	 */
	pages: {
		about: {page : 'about'},
		media: {page: 'media'}
	}
});

/**
 * Application controller, currently does nothing special.
 * @type {*}
 */
App.ApplicationController = Em.Controller.extend({
	// Create a user data object for login
	messages: [],

	addMessage: function(text, type) {
		if (!type) {
			type = 'info';
		}
		this.messages.pushObject({type: type, text: text});
	}
});

/**
 * Application view. The "application" template is
 * contained in home.ctp.
 * @type {*}
 */
App.ApplicationView = Em.View.extend({
	templateName: 'application'
});
