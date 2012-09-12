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

	roles: ['a', 'b', 'c'],

	doSomething: function() {
		console.log('Meh');
	}
});