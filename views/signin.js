if (Meteor.isClient) {
  Session.setDefault('choice', '');
  Session.setDefault('reason', '');

  Template.getStarted.helpers({
    choice: function() {
      return Session.get('choice');
    },
  });

  Template.getStarted.events({
    'click div.clickable': function (e) {
      Session.set('choice', e.target.innerHTML);
    }
  });

  Template.reason.helpers({
    reason: function() {
      return Session.get('reason')
    }
  })

  Template.reason.events({
    'click div.clickable': function(e) {
      Session.set('reason', e.target.innerHTML);
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
