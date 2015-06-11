Session.setDefault('program', '');
Session.setDefault('reason', '');

Template.getStarted.helpers({
  program: function() {
    return Session.get('program');
  },
});

Template.getStarted.events({
  'click div.clickable': function (e) {
    Session.set('program', e.target.innerHTML);
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
