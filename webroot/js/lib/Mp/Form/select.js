/**
 * Select field for Mp.Form
 * @author Elte Hupkes
 */
Mp.Form.Select = Mp.Form.Field.extend({
	optionLabelPath: 'content',
	optionValuePath: 'content',

	// Just transfer value to selection
	selectionBinding: 'value',

	inputView: Ember.Select.extend(Mp.Form.InputSupport, {
		contentBinding:			'parentView.content',

		optionLabelPathBinding: 'parentView.optionLabelPath',
		optionValuePathBinding: 'parentView.optionValuePath',

		selectionBinding:		'parentView.selection',
		promptBinding:			'parentView.prompt',
		multipleBinding:		'parentView.multiple'
	})
});