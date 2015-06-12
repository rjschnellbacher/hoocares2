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

Visitors = new Mongo.Collection('Visitors');

Visitors.helpers({
  updateVisitor: function (data) {
    if( _.keys(data).every(function(k) { return k.charAt(0) !== '$'; }) )
      data = { $set: data };

    return Visitors.update(this._id, data);
  },

  setWaiting: function () {
    console.log("this: ", this);
    var audit_log;

    if (!this.audit_log)
      audit_log = [{ timestamp: new Date(), office: this.office, status: 'waiting' }];
    else
      audit_log = this.audit_log;

    audit_log.push({ timestamp: new Date(), office: this.office, status: 'waiting' });
    this.updateVisitor({ status: 'waiting' });
    this.updateVisitor({ audit_log: audit_log });
  },

  setDone: function (emp) {
    if (this.audit_log === null)  this.audit_log = [];

    var audit_log = this.audit_log;
    audit_log.push({ timestamp: new Date(), office: this.office, old_status: 'in progress', status: 'done', employee: emp });
    this.update({ status: 'done' });
    this.update({ audit_log: audit_log });
  },

  setInProgress: function (emp) {
    if (this.audit_log === null)  this.audit_log = [];
    
    var audit_log = this.audit_log;
    audit_log.push({ timestamp: new Date(), office: this.office, old_status: 'waiting', status: 'in progress', employee: emp });
    this.update({ status: 'in progress' });
    this.update({ audit_log: audit_log });
  },

  setNext: function () {
    this.update({ status: 'next' });
  },

  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Meteor.methods({
  create: function(obj) {
    var visitor = Visitors.insert(obj);
    visitor.setWaiting();

    return ;
  }
});
