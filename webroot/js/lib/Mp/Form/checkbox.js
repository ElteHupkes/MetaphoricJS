/**
 * Checkbox for Mp.Form
 * @author Elte Hupkes
 */
Mp.Form.Checkbox = Mp.Form.Field.extend({
	inputView: Em.Checkbox.extend({
		checkedBinding: 'parentView.checked'
	})
});