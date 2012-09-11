/**
 * Users controller
 * @type {*}
 */
App.UsersController = Em.Controller.extend({
	validationErrors: {
		'User': {
			'name': []
		}
	},

	test: Em.A(['Dit is fout', 'Dit dus ook'])
});