/**
 * Users controller
 * @type {*}
 */
App.UsersController = Em.Controller.extend(App.BaseControllerMixin, {
	data: {
		User: App.User.create()
	},

	content: {},

	// Create first calls "save", but sets the "first" attribute
	// to fix the URL.
	createFirst: function() {
		var User = this.get('data.User'), router = App.get('router');
		User.set('first', true);
		User.save(function() {
			router.get('applicationController').addMessage(Em.I18n.t('user.saved'), 'success');
			router.transitionTo('users.index');
		});
	},

	// Just calls save
	save: function() {
		var router = App.get('router');
		this.get('data.User').save(function() {
			router.get('applicationController').addMessage(Em.I18n.t('user.saved'), 'success');
			router.transitionTo('users.index');
		});
	}
});