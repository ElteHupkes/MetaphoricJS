/**
 * Application JavaScript for metaphoric.nl.
 * Contains the Application* classes.
 *
 * The actual initialization happens in init.js; all files
 * will be concatenated/minified in production.
 *
 * @author Elte Hupkes
 */
App = Em.Application.create();

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
