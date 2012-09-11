/**
 * Text field mixin
 * @author Elte Hupkes
 */
var Mp = window.Mp;
Mp.Form.TextSupport = Ember.Mixin.create({
	valueBinding: 'parentView.value',
	placeholderBinding: 'parentView.placeholder',
	placeholderTranslationBinding: 'parentView.placeholderTranslation',
	disabledBinding: 'parentView.disabled',
	maxlengthBinding: 'parentView.maxlength',
	classNameBindings: 'parentView.inputClassNames',
	attributeBindings: ['name'],
	name: Ember.computed(function() {
		return Ember.get(this, 'parentView.name') || Ember.get(this, 'parentView.label');
	}).property('parentView.name', 'parentView.label').cacheable()
});