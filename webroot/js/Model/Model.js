/**
 * Base model
 *
 * @author Elte Hupkes
 */
App.Model = Em.Object.extend({
	/**
	 * A fieldName => error message array map.
	 */
	errors: {},

	/**
	 * Busy flag can be used to check if
	 * the model is currently saving.
	 */
	busy: false,

	/**
	 * Used to check if the request to load this
	 * user's data has been completed.
	 */
	loaded: false,

	/**
	 * Validation rules, override in child model. Since local
	 * validation provides no actual security,
	 * these are usually rules for things that aren't
	 * checked server-side.
	 */
	validationRules: {},

	/**
	 * Adds one or more errors to the validation
	 * error list. You can either supply an entire
	 * object {field: ['err', 'err'], field2: ['err']},
	 * or a field/error pair.
	 * @param field
	 * @param err
	 */
	addError: function(field, err) {
		if (typeof field == 'object') {
			for (var k in field) {
				if (field.hasOwnProperty(k)) {
					this.addError(k, field[k]);
				}
			}
		} else {
			if (!(field in this.errors)) {
				this.set('errors.'+field, []);
			}
			var that = this;
			$.each(Em.makeArray(err), function(k) {
				that.errors[field].pushObject(this);
			});
		}
	},

	/**
	 * Clears all errors.
	 */
	clearErrors: function() {
		this.set('errors', {});
	},

	/**
	 * Processes validation rules and adds the appropriate
	 * errors.
	 */
	validates: function() {
		var result = true;
		for (var k in this.validationRules) {
			if (this.validationRules.hasOwnProperty(k)) {
				var vRule = this.validationRules[k],
					fn = typeof vRule.rule == 'string' ? this[vRule.rule] : vRule.rule;

				if (!fn.call(this, k, this.get(k))) {
					result = false;
					this.addError(k, vRule.message);
				}
			}
		}
		return result;
	}
});