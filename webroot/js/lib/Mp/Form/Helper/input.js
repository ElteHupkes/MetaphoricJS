/**
 * Input field helper. It is meant to mimic the CakePHP
 * form input helper (since it's very convenient :]).
 * Basically every input field (whether it's text, select or checkbox)
 * has two important bindings: one for its value, and one for its
 * validation errors. It works in a way similar to CakePHP's FormHelper::input()
 * method. Say you show a new input field using:
 *
 * {{input User.name}}
 *
 * With a certain context "context", then the field's value binding
 * is looked up from context.data.User.name, whereas its validation
 * errors are retrieved from context.validationErrors.User.name.
 * These bindings can be overridden, see options below.
 *
 * A full input field consist of three elements:
 * - A label
 * - An input element (input, checkbox, select box, etc)
 * - A potential list of error messages
 *
 * They are shown like the template in field.js: A containing div element
 * with an "input [type]" class, inside it a label followed by the input
 * field, followed by an <ul /> containing a list of errors if applicable.
 *
 * === Options ===
 * All the default input options are available (label, value, placeholder,
 * disabled, maxlength, name) and their bindings can be set as if dealing directly
 * with the underlying input element. All other options are passed to
 * the input container view; in addition you can use:
 *
 * type
 * Default types "text", "textarea", "select" and "checkbox"
 * correspond to built-in types. HTML5 input types that behave
 * as simple text with a pattern (being color, email, url, tel)
 * are also supported, and will be implemented as a simple TextField
 * with the specified type.
 *
 * You can also supply the name
 * of a view class, which will be retrieved as a path.
 * If no type is specified or the type is a custom view,
 * the type will be inferred from the options object.
 * This is done as follows:
 * - If "inferredType" is specified as an option, the value
 * 	 of this attribute is used.
 * - If a "checked" or "checkedBinding" is is present,
 *   "checkbox" is used.
 * - If a "content" or "contentBinding" is present,
 *   "select" is used.
 * - If none of these options applies, "text" is used.
 *
 * inputClassNames
 * Class names for the input field, bindings should be set up on the
 * input view to listen to this.
 *
 * @author Elte Hupkes
 */
Mp.Form.InputHelper = (function() {
	return {
		/**
		 * k=>v map for default classes, so they can
		 * be overridden by separate applications.
		 */
		defaultClasses: {
			text : Mp.Form.TextField,
			textarea: Mp.Form.TextArea,
			select: Mp.Form.Select,
			checkbox: Mp.Form.Checkbox
		},

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

				// Get own validation errors property from context
				errorsBinding: 'controller.validationErrors.'+name,

				// We'll just create a value binding, and let the sub input classes
				// listen to it.
				valueBinding : 'controller.data.'+name,

				classNames: ['input']
			}, options.hash), inputClass, inferredType;


			// Try to infer the type
			if ('inferredType' in settings) {
				inferredType = settings['inferredType'];
				delete settings['inferredType'];
			} else if (settings.hasOwnProperty('checked') || settings.hasOwnProperty('checkedBinding')) {
				inferredType = 'checkbox';
			} else if (settings.hasOwnProperty('content') || settings.hasOwnProperty('contentBinding')) {
				inferredType = 'select';
			} else {
				inferredType = 'text';
			}

			if (!settings.type) {
				settings.type = inferredType;
			}

			switch (settings.type) {
				case 'text':
				case 'textarea':
				case 'select':
				case 'checkbox':
					inputClass = this.defaultClasses[settings.type];
					inferredType = settings.type;
					break;

				// HTML5 input types
				// These are just the types that are pretty much identical
				// to text inputs, only with a pattern. Other
				// input types (date, datetime, datetime-local, range,
				// month, number, time, week, search) are better implemented as
				// a new class (they all have other attributes, such as min/max/step)
				// and are not yet implemented.
				case 'color':
				case 'email':
				case 'tel':
				case 'url':
					inputClass = this.defaultClasses['text'];
					inferredType = settings.type;
					break;
				default:
					// Try to get the view class from the window scope
					inputClass = Ember.Handlebars.getPath(thisContext, settings.type, options);
			}

			if (typeof settings.classNames == 'array') {
				// classNames not overridden, add type.
				settings.classNames.push(inferredType);
			} else if (typeof settings.classNames == 'string') {
				// Split class names on whitespace
				settings.classNames = settings.classNames.split(/\s/);
			}

			var	container = inputClass.create(settings), currentView = options.data.view;
			currentView.appendChild(container);
		}
	};
}());

// Register the actual helper
Handlebars.registerHelper('input', function(name, options) {
	return Mp.Form.InputHelper.helper(this, name, options);
});