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
