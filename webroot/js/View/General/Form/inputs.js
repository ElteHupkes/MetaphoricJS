/**
 * JS Classes for input fields. For now these
 * just extend their ember counterparts.
 *
 * @author Elte Hupkes
 */
App.InputContainerView = Em.ContainerView.extend({
	tagName: 'div'
});
App.InputLabelView = Em.View.extend({
	tagName: 'label',
	template: Em.Handlebars.compile('{{text}}')
});

App.TextField = Em.TextField.extend();
App.Select = Em.Select.extend();
App.Checkbox = Em.Checkbox.extend();
App.TextArea = Em.TextArea.extend();
