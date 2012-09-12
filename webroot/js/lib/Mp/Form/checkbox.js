/**
 * Checkbox for Mp.Form
 * @author Elte Hupkes
 */
Mp.Form.Checkbox = Mp.Form.Field.extend({
	// Just bind checked to value
	checkedBinding: 'value',

	inputView: Em.Checkbox.extend({
		checkedBinding: 'parentView.checked'
	})
});