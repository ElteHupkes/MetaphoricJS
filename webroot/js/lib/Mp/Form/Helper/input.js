/**
 * Input field helper. It is meant to mimic the CakePHP
 * form input helper (since it's very convenient :]).
 * Basically every input field (whether it's text, select or checkbox)
 * has two important bindings: one for its value, and one for its
 * validation errors. I'll have this work in a way similar to CakePHP.
 * Say you show a new input field using:
 *
 * {{input User.name}}
 *
 * With a certain context "context", then the field's value binding
 * is looked up from context.data.User.name, whereas its validation
 * errors are retrieved from context.validationErrors.User.name.
 * Bindings can of course be overridden.
 *
 * A full input field consist of three elements:
 * - A label
 * - An input element (input, checkbox, select box, etc)
 * - A potential list of error messages
 *
 * @author Elte Hupkes
 */
Mp.Form.InputHelper = (function() {
	return {
		/**
		 * The actual helper method
		 * @param thisContext
		 * @param name
		 * @param options
		 */
		helper : function(thisContext, name, options) {
			var settings = $.extend({
				// The field type
				controller: thisContext,
				type: 'text',

				// Get own validation errors property from context
				errorsBinding: 'controller.validationErrors.'+name,

				// We'll just create a value binding, and let the sub input classes
				// listen to it.
				valueBinding : 'controller.data.'+name
			}, options.hash), inputClass;

			switch (settings.type) {
				case 'text':
					inputClass = Mp.Form.TextField;
					break;
				case 'textarea':
					inputClass = Mp.Form.TextArea;
					break;
				case 'select':
					inputClass = Mp.Form.Select;
					break;
				case 'checkbox':
					inputClass = Mp.Form.Checkbox;
					break;
				default:
					// Try to get the view class from the window scope
					inputClass = Ember.Handlebars.getPath(thisContext, settings.type, options);
			}

			// Delete type as we don't want it to be an options variable
			delete settings['type'];

			var	container = inputClass.create(settings), currentView = options.data.view;
			currentView.appendChild(container);
		}
	};
}());
Handlebars.registerHelper('input', function(name, options) {
	return Mp.Form.InputHelper.helper(this, name, options);
});