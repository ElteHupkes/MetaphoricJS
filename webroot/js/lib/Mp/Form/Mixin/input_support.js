/**
 * Input field mixin to fill the blanks of the
 * default Ember field behaviors.
 * @author Elte Hupkes
 */
var Mp = window.Mp;
Mp.Form.InputSupport = Ember.Mixin.create({
	nameBinding: 'parentView.name',
	disabledBinding: 'parentView.disabled',
	autofocusBinding: 'parentView.autofocus',

	// HTML5 support
	requiredBinding: 'parentView.required',

	classNameBindings: 'parentView.inputClassNames',

	attributeBindings: ['required', 'autocomplete', 'autofocus', 'disabled']
});