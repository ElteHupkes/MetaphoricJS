/**
 * This file contains all the classes for user views.
 *
 * @author Elte Hupkes
 */
App.UserLoginView = Em.View.extend({
	tagName: 'div',
	templateName: 'users-login'
});

App.UserCreateView = Em.View.extend({
	tagName: 'form',
	templateName: 'users-create'
});

App.UserCreateFirstView = App.UserCreateView.extend({
	// Submit as createFirst
	submit: function() {
		this.get('controller').createFirst();
	}
});

App.UserIndexView = Em.View.extend({
	templateName: 'users-index'
});