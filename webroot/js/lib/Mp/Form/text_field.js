/**
 * Text field implementation
 * @author Elte Hupkes
 */
var Mp = window.Mp;
Mp.Form.TextField = Mp.Form.Field.extend({
	type: 'text',

	inputView: Ember.TextField.extend(Mp.Form.TextSupport, {
		typeBinding: 'parentView.type',
		sizeBinding: 'parentView.size'
	})
});