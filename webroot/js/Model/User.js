/**
 * User model
 * @type {*}
 */
App.User = App.Model.extend({
	// Fields
	id: null,
	name: null,
	email: null,
	password: null,
	password_confirm: null,

	// Attempt to create first record?
	first: false,

	/**
	 * Local validation rules.
	 */
	validationRules : {
		password: {
			'rule': 'passwordMatches',
			'message': Ember.I18n.t('user.errors.password_match')
		},
		password_confirm: {
			'rule': 'passwordMatches',
			'message': Ember.I18n.t('user.errors.password_match')
		}
	},

	/**
	 * Saves user data to backend storage.
	 * @param success Extra success callback, gets called with user context
	 * @return {Boolean}
	 */
	save: function(success) {
		if (this.get('busy')) {
			return true;
		}

		var obj = {User: {}},
			fields = Em.A([
				'id', 'name', 'email', 'password'
			]), action, that = this;

		$.each(fields, function(k, v) {
			obj.User[v] = that.get(v);
		});

		action = !!obj.id ? 'edit/'+obj.id : 'add';

		this.clearErrors();
		if (!this.validates()) {
			return false;
		}

		if (this.get('first')) {
			action = '/users/create_first';
		} else {
			action = '/users/'+action;
		}

		$.ajax({
			type: 'POST',
			url: action,
			data: JSON.stringify(obj),
			beforeSend: function() {
				that.set('busy', true);
			},
			success: function(data) {
				if (data.status == 0) {

				} else if (data.errors) {
					// Set validation errors
					that.set('errors', data.errors);
				}
				if (typeof success == 'function') {
					success.call(that, data);
				}
			},
			complete: function() {
				that.set('busy', false);
			},
			contentType: 'application/json'
		});

		return true;
	},

	/**
	 * Validation rule to match password.
	 * @return {Boolean}
	 */
	passwordMatches: function() {
		return this.get('password') === this.get('password_confirm');
	}
});

// Implement the static find method
App.User.reopenClass({
	// Finds a user by ID
	find: function(id) {
		var user = App.User.create({loaded: false}),
			action = '/admin/users/view/'+id;
		$.getJSON(action, function(data) {
			user.set('loaded', true);
			user.set('data', data.User);
		});
		return user;
	},

	// Finds a list of all users
	findAll: function() {
		var list = Ember.ArrayProxy.create({
			loaded: false,
			content: []
		});
		$.getJSON('/users/index', function(data) {
			list.set('content', data);
			list.set('loaded', true);
		});
		return list;
	}
});
