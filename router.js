Router.route('/', function () {
  this.render('getStarted', {data: { subtitle: 'What program are you here for today?' }});
});

Router.route('/reason', function() {
  this.render('reason', {data: { subtitle: 'What brings you here today?' }});
});

Router.route('/contactInfo', function() {
  this.render('contactInfo', {data: { subtitle: 'Could you please fill out your contact information?' }});
});

Router.route('/employee', function () {
  this.render('employee');
});

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
