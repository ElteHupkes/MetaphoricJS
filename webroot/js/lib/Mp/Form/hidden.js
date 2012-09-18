/**
 * Hidden field implementation
 * TODO finish implementation
 * @author Elte Hupkes
 */
var Mp = window.Mp;
Mp.Form.Hidden = Em.View.extend({
	type: 'hidden',
	attributeBindings: ['type', 'style'],
	tagName: 'input',
	style: 'display:none;'
});