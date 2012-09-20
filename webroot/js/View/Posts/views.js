/**
 * This file contains all the classes for post views.
 *
 * @author Elte Hupkes
 */
App.PostsIndexView = Em.View.extend({
	templateName : 'posts-index'
});

App.PostsAddView = Em.View.extend({
	templateName: 'posts-add',
	tagName: 'form',
	submit: function() {
		this.get('controller').save();
	}
});