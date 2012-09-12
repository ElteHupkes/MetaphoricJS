/**
 * Users controller
 * @type {*}
 */
App.UsersController = Em.Controller.extend(App.BaseControllerMixin, {
	data: { User: App.User.create() },

	roles: ['a', 'b', 'c'],

	createFirst: function() {
		var User = this.get('data.User');
		User.set('first', true);
		User.save();
	}
});