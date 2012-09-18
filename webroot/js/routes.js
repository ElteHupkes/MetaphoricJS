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

		// Post subroutes
		posts: Ember.Route.extend({
			route: '/posts',

			// Subroutes
			// Posts index
			index: Ember.Route.extend({
				route: '/',
				connectOutlets : function(router, context) {
					router.get('applicationController').connectOutlet({
						viewClass : App.PostsIndexView,
						controller : router.get('postsController'),
						context : App.Post.findAll()
					});
				}
			}),

			// View a specific post
			view: Ember.Route.extend({
				route: '/view/:id',
				connectOutlets : function(router, context) {

				}
			})
		}),

		// User subroutes
		users: Em.Route.extend({
			route: '/users',

			index: Em.Route.extend({
				route: '/',
				connectOutlets: function(router) {
					router.get('applicationController').connectOutlet({
						controller: router.get('usersController'),
						viewClass: App.UserIndexView,
						context: App.User.findAll()
					});
				}
			}),

			create_first: Em.Route.extend({
				route: '/create_first',

				connectOutlets: function(router) {
					router.get('applicationController').connectOutlet({
						controller: router.get('usersController'),
						viewClass: App.UserCreateFirstView
					});
				}
			}),

			edit: Em.Route.extend({
				route: '/edit/:user_id',
				connectOutlets: function(router, context) {
					router.get('usersController').set('data.user', App.User.find(context.get('id')));
					router.get('applicationController').connectOutlet({
						controller: router.get('usersController'),
						viewClass: App.UserEditView
					});
				},
				serialize: function(router, obj) {
					return {'user_id' : obj.get('id')};
				},
				deserialize: function(router, params) {
					return Ember.Object.create({id : params.user_id});
				}
			}),

			// Actions
			editUser: Em.Route.transitionTo('edit')
		}),

		// Actions
		doHome : Em.Route.transitionTo('root.index'),
		doUsers: Em.Route.transitionTo('users.index'),
		doCreateFirstUser: Em.Route.transitionTo('users.create_first')
	})
});
