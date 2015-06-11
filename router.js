Router.route('/', function () {
	Session.set("office", "");
	
  this.render('getStarted', {data: { subtitle: 'What program are you here for today?', location: 'Indiana' }});
});

Router.route('/loc/:loc', function () {
	Session.set("office", this.params.loc);

	// Maybe sometime set  location: this.params.loc  to see the office you're at
  this.render('getStarted', {data: { subtitle: 'What program are you here for today?', location: 'Indiana' }});
});

Router.route('/reason', function() {
  this.render('reason', {data: { subtitle: 'What brings you here today?', location: 'Indiana' }});
});

Router.route('/contactInfo', function() {
  this.render('contactInfo', {data: { subtitle: 'Could you please fill out your contact information?', location: 'Indiana' }});
});

Router.route('/employee', function () {
  this.render('employee');
});

Router.route('/visitorList', function() {
  this.render('visitorList');
});


Router.route('/thankYou', function() {
  this.render('thankYou', {data: { subtitle: 'Thank you for sending your information!', location: 'Indiana' }});
})

// Router.route('/items/:_id', function () {
//   var item = Items.findOne({_id: this.params._id});
//   this.render('ShowItem', {data: item});
// });

// Router.route('/files/:filename', function () {
//   this.response.end('hi from the server\n');
// }, {where: 'server'});

// Router.route('/restful', {where: 'server'})
//   .get(function () {
//     this.response.end('get request\n');
//   })
//   .post(function () {
//     this.response.end('post request\n');
//   });
