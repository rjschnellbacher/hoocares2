if (Meteor.isClient) {
  Session.setDefault('choice', '');

  Template.getStarted.helpers({
    choice: function () {
      return Session.get('choice');
    }
  });

  Template.getStarted.events({
    'click div.clickable': function (e) {
      e.preventDefault()
      Session.set('choice', e.target.innerHTML);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
