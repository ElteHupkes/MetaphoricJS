/**
 * Text field mixin
 * @author Elte Hupkes
 */
var Mp = window.Mp;
Mp.Form.TextSupport = Ember.Mixin.create({
	valueBinding: 'parentView.value',
	placeholderBinding: 'parentView.placeholder',
	disabledBinding: 'parentView.disabled',
	maxlengthBinding: 'parentView.maxlength',
	readonlyBinding: 'parentView.readonly',
	autocompleteBinding: 'parentView.autocomplete',

	// HTML5
	multipleBinding: 'parentView.multiple',
	patternBinding: 'parentView.pattern',

	// Attributes that aren't defined by Ember.TextView
	attributeBindings: ['name', 'readonly', 'multiple', 'pattern', 'autocomplete']
});