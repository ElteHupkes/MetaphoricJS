App.AuthUser = App.Model.extend({
	// Fields
	id: null,
	name: null,
	email: null,
	password: null,

	// Logged in flag.
	loggedIn: false,

	// Loaded flag
	isLoaded: false,

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
			data: JSON.stringify({User: {
				email: this.get('email'),
				password: this.get('password')
			}}),
			success: function(data) {
				if (data.status == 0) {
					that.set('loggedIn', true);
					that.setProperties(data.User);
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
		var that = this;
		$.get('/users/user_info', function(data) {
			if (data.status == 0) {
				that.set('loggedIn', true);
				that.setProperties(data.User);
			}
			that.set('isLoaded', true);
		});
	}
});