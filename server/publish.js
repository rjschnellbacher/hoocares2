Meteor.publish("visitors", function () {
  return Visitors.find();
});
