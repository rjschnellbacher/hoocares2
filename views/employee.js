if (Meteor.isClient) {
  if (Meteor.userId()) Meteor.subscribe("visitors");

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

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.publish("visitors", function () {
    return Visitors.find();
  });
}

Accounts.config({
  forbidClientAccountCreation: true,
  loginExpirationInDays: 1
});
