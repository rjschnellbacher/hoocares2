Template.visitorList.helpers({
  visitors: function() {
    return Visitors.find({ status: 'waiting' });
  }
});

Template.registerHelper('since', function() {
  return moment(this.audit_log[0].timestamp).format('h:mm a');
});

Template.helpingList.helpers({
  visitors: function() {
    return Visitors.find({ status: 'in progress' });
  },

  employee: function() {
    return this.audit_log[0].employee.username;
  }
});

Template.visitorList.events({
  'click #help-next': function(e) {
    e.preventDefault();
    console.log(Meteor.user())
    Meteor.call('setInProgress', this._id, Meteor.user());
  }
});

Template.helpingList.events({
  'click #return-to-waiting': function(e) {
    e.preventDefault();
    Meteor.call('setWaiting', this._id, Meteor.user());
  },

  'click #done-helping': function(e) {
    e.preventDefault();
    Meteor.call('setDone', this._id, Meteor.user());
  }
})

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
