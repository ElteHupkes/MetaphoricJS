/**
 * User model
 * @type {*}
 */
App.User = Em.Object.extend({
	id: null,
	name: null,
	email: null,
	password: null,

	// Attempt to create first record?
	first: false,

	// A map of keyname => validation errors
	errors: {},

	//
	save: function() {
		var obj = {User: {}},
			fields = Em.A([
				'id', 'name', 'email', 'password'
			]), action, that = this;

		$.each(fields, function(k, v) {
			obj.User[v] = that.get(v);
		});

		action = !!obj.id ? 'edit/'+obj.id : 'add';

		if (this.get('first')) {
			action = '/users/create_first';
		} else {
			action = '/users/'+action;
		}

		$.ajax({
			type: 'POST',
			url: action,
			data: JSON.stringify(obj),
			success: function(data) {
				if (data.status == 0) {

				} else if(data.errors) {
					// Set validation errors
					that.set('errors', data.errors);
				}
			},
			contentType: 'application/json'
		});
	}
});
