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
	current_password: null,

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
				'name', 'email'
			]), action, that = this;

		var edit = !!this.get('id');

		if (!edit) {
			fields.pushObject('password');
		} else if (this.get('password')) {
			fields.pushObjects(['password', 'current_password', 'password_confirm']);
		}

		$.each(fields, function(k, v) {
			obj.User[v] = that.get(v);
		});

		if (this.get('first')) {
			action = '/users/create_first';
		} else {
			action = edit ? '/admin/users/edit/'+this.get('id') : '/admin/users/add';
		}

		this.clearErrors();
		if (!this.validates(fields)) {
			return false;
		}

		delete obj['User']['password_confirm'];
		$.ajax({
			type: edit ? 'POST' : 'PUT',
			url: action,
			data: JSON.stringify(obj),
			beforeSend: function() {
				that.set('busy', true);
			},
			success: function(data) {
				if (data.status == 0) {
					if (typeof success == 'function') {
						success.call(that, data);
					}
				} else if (data.errors) {
					// Set validation errors
					that.set('errors', data.errors);
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
		return this.get('password') == this.get('password_confirm');
	}
});

// Implement the static find method
App.User.reopenClass({
	// Finds a user by ID
	find: function(id) {
		var user = App.User.create({isLoaded: false, id: id}),
			action = '/admin/users/view/'+id;
		$.getJSON(action, function(data) {
			user.setProperties(data.User);
			user.set('isLoaded', true);
		});
		return user;
	},

	// Finds a list of all users
	findAll: function() {
		var list = [];
		$.getJSON('/users/index', function(data) {
			$.each(data, function() {
				list.pushObject(App.User.create(this.User));
			});
			list.set('isLoaded', true);
		});
		return list;
	}
});
