/**
 * General form field, inspired by ember-bootstrap.
 * See the attached MIT license.
 *
 * @see https://github.com/emberjs-addons/ember-bootstrap
 * @author Elte Hupkes
 */
var Mp = window.Mp;
Mp.Form.Field = Ember.View.extend({
	tagName: 'div',
	className: ['input'],

	classNameBindings: ['hasErrors:error'],

	// Boolean property that tells the view whether there are any errors.
	hasErrors: function() {
		return !!this.get('errors.length');
	}.property('errors'),

	// The template consists of a label, input and error view
	template: Ember.Handlebars.compile(
		'{{view view.labelView viewName="labelViewInstance"}}'+
		'{{view view.inputView viewName="inputViewInstance"}}'+
		'{{#if view.hasErrors}}{{view view.errorsView}}{{/if}}'
	),

	labelView: Ember.View.extend({
		tagName: 'label',
		template: Ember.Handlebars.compile('{{view.value}}'),

		value: Ember.computed(function(k, v) {
			var parent = this.get('parentView');

			if (v && v !== parent.get('label')) {
				parent.set('label', v);
			} else {
				v = parent.get('label');
			}

			return v;
		}).property('parentView.label'),

		classNameBinding: 'parentView.labelClassNames',

		// Required for setting the "for" attribute on element insertion
		forBinding : 'inputFieldId',
		inputFieldId: 'for',
		attributeBindings: ['for']
	}),

	// Maybe just use a text field by default?
	inputView: Ember.View.extend({
		tagName: 'div',
		template: Ember.Handlebars.compile('This class needs to be extended.')
	}),

	// Shows errors in an unordered list
	errorsView: Ember.View.extend({
		tagName: 'ul',
		template: Ember.Handlebars.compile('{{#each error in view.errors}}<li>{{error}}</li>{{/each}}'),
		errorsBinding: 'parentView.errors'
	}),

	/**
	 * Sets the correct "for" value for the label.
	 */
	didInsertElement: function() {
		this._super.apply(this);
		this.set('labelViewInstance.inputFieldId', this.get('inputViewInstance.elementId'))
	}
});