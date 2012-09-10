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
 * These bindings are automatic for built-in input types, but have
 * to be specified for other field types. Bindings can of course be
 * overridden.
 *
 * A full input field consist of three elements:
 * - A label
 * - An input element (input, checkbox, select box, etc)
 * - A potential list of error messages
 *
 * These items are denoted with "label", "input" and "error"
 * respectively. Options for these items can be passed to the helper
 * by prefixing the option.
 *
 * The three items are wrapped in a containing element which takes
 * options as well. These options are:
 *
 * type="type"
 * The type of input to use. You can either specify one of the
 * default types (text, textarea, select, or checkbox), or
 * specify a view class. When using a custom input class,
 * you will have to provide value bindings yourself.
 *
 * container="container"
 * The container view class.
 *
 *
 *
 * @author Elte Hupkes
 */
App.InputHelper = (function() {
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
				type: 'text'
			}, options.hash);

			var inputClass, match,
				currentView = options.data.view;

			var subOptions = {
				'label' : { controller : thisContext },
				'input' : {},
				'error' : {}
			};

			for (var prop in settings) {
				if (settings.hasOwnProperty(prop)) {
					match = prop.match(/^(label|input|error)(.)(.*)$/);

					if(match) {
						// Convert itemShouldFoo -> shouldFoo
						subOptions[match[1]][match[2].toLowerCase() + match[3]] = settings[prop];
						// Delete from hash as this will end up getting passed to the
						// {{view}} helper method.
						delete settings[prop];
					}
				}
			}

			switch (settings.type) {
				case 'text':
					inputClass = App.TextField;
					break;
				case 'textarea':
					inputClass = App.TextArea;
					break;
				case 'select':
					inputClass = App.Select;
					break;
				case 'checkbox':
					inputClass = App.Checkbox;
					break;
				default:
					// Try to get the view class from the window scope
					inputClass = Em.get(window, settings.type);
			}

			var container = App.InputContainerView.create({
				controller: thisContext
			}), childViews = container.get('childViews');

			childViews.pushObject(App.InputLabelView.create(subOptions['label']));
			console.log(subOptions);
			currentView.appendChild(container);
		}
	};
}());
Handlebars.registerHelper('input', function(name, options) {
	return App.InputHelper.helper(this, name, options);
});