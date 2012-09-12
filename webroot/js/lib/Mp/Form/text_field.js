/**
 * Text field implementation
 * @author Elte Hupkes
 */
var Mp = window.Mp;
Mp.Form.TextField = Mp.Form.Field.extend({
	inputView: Ember.TextField.extend(Mp.Form.InputSupport, Mp.Form.TextSupport, {
		typeBinding: 'parentView.type',
		sizeBinding: 'parentView.size'
	})
});