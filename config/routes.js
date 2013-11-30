module.exports = function(app,passport, streamable){

    //user routes
    var users = require('../app/controllers/users')
    app.get('/signup', users.signup)
    app.post('/users', users.create)
    
    app.get('/login', users.login)
    app.get('/logout', users.logout)
    
    //general routes
	app.get('/', users.index);

    var twitter = require('../app/controllers/twitter.js')
    app.get('/tweets', twitter.init)

    //trucks routes
    var trucks = require('../app/controllers/trucks.js')
    
    app.get('/trucks', trucks.get)
    //  /trucks/thepigandcow/today/12-3/35.309,-80.987/8d76dfae13ee
    app.post('/truck',trucks.post)
    
    //authentication
    app.post('/users/session',
       passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: "User name or password incorrect"
        }), users.session)
};
