/**
 * Router for metaphoric.nl
 */
App.Router = Ember.Router.extend({
	root : Ember.Route.extend({
		// Index route, redirects to posts index
		index: Ember.Route.extend({
			route: '/',
			redirectsTo: 'posts.index'
		}),

		posts : Ember.Route.extend({
			route: '/posts',

			// Subroutes
			// Posts index
			index: Ember.Route.extend({
				route: '/',
				connectOutlets : function(router, context) {
					router.get('applicationController').connectOutlet('postsIndex', App.Post.findAll())
				}
			}),

			// View a specific post
			view: Ember.Route.extend({
				route: '/view/:id',
				connectOutlets : function(router, context) {

				}
			})
		})
	})
});
