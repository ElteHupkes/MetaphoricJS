/**
 * Users controller
 * @type {*}
 */
App.UsersController = Em.Controller.extend({
	data: {
		User: {
			name: null
		}
	},

	doSomething: function() {
		console.log('Meh');
	}
});