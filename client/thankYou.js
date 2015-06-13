Template.thankYou.events({
  'click .thankYou-button': function (e) {
    e.preventDefault();

    var office = Session.get("office");

    Router.go("/"+office);
  }
});

Template.thankYou.helpers({
  employeeCount: function() {
    var count = employeeCount();
    return count > 0 ? count : 1;
  },

  visitorCount: function() {
    return visitorCount();
  },

  waitTime: function() {
    return waitTime();
  }
})

// We need these methods to be callable by one another - in particular, waitTime calls
// the other two. Not possible when shoved into helpers. So, we've pulled them out into
// good ol' fashioned JS functions. Arguably should put them in an object/prototype, if
// for no other reason than logical grouping for code cleanliness. (It would also make
// them easier to unit test.)
var employeeCount =  function() {
  var date = new Date();
  var beginning_of_today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  var count = Meteor.users.find({
    lastLoggedInAt: { $gte: beginning_of_today }
  }).count();
  return count > 0 ? count : 1;
}

var visitorCount = function() {
  var count = Visitors.find({
    status: 'waiting'
  }).count() - 1;
  return count > 0 ? count : 0;
}

// At the moment, we aren't going to have enough data to really calculate
// a meaningful average wait time. (Perhaps we should ask?) In the fuure, this should be:
//
//   currentAverageWaitTime * numberOfVisitorsWaiting / numberOfEmployees
//
// where currentAverageWaitTime is calculated from the activity log.
// For now, we'll use a constant number of our choosing.
var waitTime = function() {
  var averageMinutesWaited = 5
  return averageMinutesWaited * visitorCount(this) / employeeCount(this)
}
