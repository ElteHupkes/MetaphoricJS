/**
 * Users controller
 * @type {*}
 */
App.UsersController = Em.ArrayController.extend(App.BaseControllerMixin, {
	data: {
		user: App.User.create()
	},

	// Create first calls "save", but sets the "first" attribute
	// to fix the URL.
	createFirst: function() {
		var user = this.get('data.user'), router = App.get('router');
		user.set('first', true);
		user.save(function() {
			router.get('applicationController').addMessage(Em.I18n.t('user.saved'), 'success');
			router.transitionTo('users.index');
		});
	},

	// Just calls save
	save: function() {
		var router = App.get('router');
		this.get('data.user').save(function() {
			router.get('applicationController').addMessage(Em.I18n.t('user.saved'), 'success');
			router.transitionTo('users.index');
		});
	}
});