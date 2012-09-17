App.AuthUser = App.Model.extend({
	// Fields
	id: null,
	name: null,
	email: null,
	password: null,

	// Logged in flag.
	loggedIn: false,

	/**
	 * Logs the user in using the provided
	 * credentials.
	 */
	login: function() {
		var that = this;
		this.set('loginError', null);
		$.ajax({
			type: 'POST',
			url: '/users/login',
			success: function(data) {
				if (data.status == 0) {
					this.setProperties(data.user);
				} else if (data.error) {
					that.set('loginError', data.error);
				}
			},
			contentType: 'application/json'
		});
	},

	/**
	 * Logs out this user
	 */
	logout: function() {
		var that = this;
		$.get('/users/logout', function(data) {
			that.set('loggedIn', false);
		});
	},

	checkLogin: function() {
		$.get('/users/user_info', function(data) {
			if (data.status == 0) {
				this.set('loggedIn', true);
				this.setProperties(data.user);
			}
		});
	}
});