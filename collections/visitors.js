/*

  info: {
    first_name: str
    last_name: str
    addr1: str
    addr2: str
    city: str
    state: str
    zip: str
    ssn: str
    medicaid: str
    dob: str
  }
  office: str (location)
  program: str
  reason: str
  status: str (waiting/done/in progress/next)

  audit_log: [
    { timestamp: {date object}, office: thisOffice, old_status: 'in progress', status: 'done', employee: 'username' }
    { timestamp: {date object}, office: thisOffice, old_status: 'waiting', status: 'in progress', employee: 'username' },
    { timestamp: {date object}, office: thisOffice, status: 'waiting' }
  ]

 */
Visitor = function(doc) {
  _.extend(this, doc);
};

_.extend(Visitor.prototype, {
  updateVisitor: function (data) {
    if( _.keys(data).every(function(k) { return k.charAt(0) !== '$'; }) )
      data = { $set: data };

    return Visitors.update(this._id, data);
  },

  setWaiting: function () {
    var auditLogEntry = { timestamp: new Date(), office: this.office, status: 'waiting' };
    Visitors.update({_id: this._id}, { $set: { status: 'waiting' }, $push: { audit_log: auditLogEntry }});
  },

  setDone: function (emp) {
    var auditLogEntry = { timestamp: new Date(), office: this.office, old_status: 'in progress', status: 'done', employee: emp };
    Visitors.update({_id: this._id}, { $set: { status: 'done' }, $push: { audit_log: auditLogEntry }});
  },

  setInProgress: function (emp) {
    var auditLogEntry = { timestamp: new Date(), office: this.office, old_status: 'waiting', status: 'in progress', employee: emp };
    Visitors.update({_id: this._id}, { $set: { status: 'in progress' }, $push: { audit_log: auditLogEntry }});
  },

  setNext: function () {
    this.update({ status: 'next' });
    Visitors.update({_id: this._id}, { $set: { status: 'next' }});
  },

  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Visitors = new Mongo.Collection('Visitors', {
  transform: function(doc) { return new Visitor(doc); }
});

Meteor.methods({
  addVisitor: function(obj) {
    obj.status = 'waiting';
    var visitorId = Visitors.insert(obj);
    return visitorId;
  },

  setInProgress: function(id, currentUser) {
    var visitor = Visitors.findOne(id);
    visitor.setInProgress(currentUser);
    return visitor;
  },

  setWaiting: function(id) {
    var visitor = Visitors.findOne(id);
    visitor.setWaiting();
    return visitor;
  },

  setDone: function(id, currentUser) {
    var visitor = Visitors.findOne(id);
    visitor.setDone(currentUser);
    return visitor;
  }

});
