Template.visitorList.helpers({
  visitors: function() {
    return Visitors.find({ status: 'waiting' });
  }
});

Template.helpingList.helpers({
  visitors: function() {
    return Visitors.find({ status: 'in progress' });
  }
});

Template.visitorList.events({
  'click #help-next': function(e) {
    e.preventDefault();
    Meteor.call('setInProgress', this._id, Meteor.currentUser);
  }
});

Template.helpingList.events({
  'click #return-to-waiting': function(e) {
    e.preventDefault();
    Meteor.call('setWaiting', this._id);
  },

  'click #done-helping': function(e) {
    e.preventDefault();
    Meteor.call('setDone', this._id, Meteor.currentUser);
  }
})

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
