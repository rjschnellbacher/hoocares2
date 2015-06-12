Accounts.onLogin(function(attemptInfo) {
  var user = attemptInfo.user
  Meteor.users.update(
    user._id,
    {
      $currentDate: {
        lastLoggedInAt: true
      }
    }
  );
})
