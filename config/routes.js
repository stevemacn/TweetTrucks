module.exports = function(app,passport, streamable){

    //user routes
    var users = require('../app/controllers/users')
    app.get('/signup', users.signup)
    app.post('/users', users.create)
   
    app.get('/login', users.login)

    app.get('/logout', users.logout)

    //general routes
	app.get('/', users.index);

    //stream routes
    //var streams = require('../app/controllers/streams.js')
    //app.get('/streams/:domain/*', streamable, streams.getSource)

    //authentication
    app.post('/users/session',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: "User name or password incorrect"
        }), users.session)
};
