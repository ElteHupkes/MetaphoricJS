/**
 * Text area implementation for Mp.Form
 * @author Elte Hupkes
 */
var Mp = window.Mp;
Mp.Form.TextArea = Mp.Form.Field.extend({
	inputView: Ember.TextArea.extend(Mp.Form.InputSupport, Mp.Form.TextSupport, {
		rowsBinding: 'parentView.rows',
		colsBinding: 'parentView.cols'
	})
});