/**
 * Post model / object
 *
 * @author Elte Hupkes
 */
App.Post = App.Model.extend({
	id: null,

	/**
	 * Saves this post to persistent storage
	 */
	save: function() {
		var edit = this.get('id'),
			url = edit ? '/admin/posts/edit/'+this.get('id') : '/admin/posts/add',
			fields = Em.A(['title', 'preview', 'content', 'published']);
	}
});
App.Post.reopenClass({
	/**
	 * Finds a post by slug
	 * @param slug
	 */
	find: function(slug) {

	},

	/**
	 * Returns a list of all posts for
	 * the index page.
	 */
	findAll: function() {
		return [];
	}
});