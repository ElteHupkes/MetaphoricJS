/**
 * This file contains all the classes for user views.
 *
 * @author Elte Hupkes
 */
App.UserFormView = Em.View.extend({
	tagName: 'form',
	templateName: 'users-form'
});

App.UserCreateFirstView = App.UserFormView.extend({
	// Submit as createFirst
	submit: function() {
		this.get('controller').createFirst();
	}
});

App.UserEditView = App.UserFormView.extend({
	// Submit as createFirst
	submit: function() {
		this.get('controller').edit();
	}
});