/**
 * App initialization, last loaded file.
 */
// Specify the logged in user.
App.authUser = App.AuthUser.create();
App.authUser.checkLogin();

// Actually initialize the app
App.initialize();
