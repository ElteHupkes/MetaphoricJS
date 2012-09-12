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

	//
	save: function() {
		var obj = {User: {}},
			fields = Em.A([
				'id', 'name', 'email', 'password'
			]), action, that = this;

		fields.forEach(function(v) {
			obj[fields[v]] = that.get(fields[v]);
		});

		action = !!obj.id ? 'edit/'+obj.id : 'add';

		if (this.get('first')) {
			action = '/users/create_first';
		} else {
			action = '/users/'+action;
		}

		$.post({
			url: action,
			data: JSON.stringify(obj),
			success: function(data) {
				console.log(data);
			}
		});
	}
});
