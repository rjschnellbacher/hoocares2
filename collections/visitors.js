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
  update: function (data) {
    if( _.keys(data).every(function(k) { return k.charAt(0) !== '$'; }) )
      data = { $set: data };

    return Visitors.update(this._id, data);
  },

  setWaiting: function () {
    var audit_log;

    // undefined.push() is not a function... surprise
    if (!this.audit_log)
      audit_log = [{ timestamp: new Date(), office: this.office, status: 'waiting' }];
    else {
      audit_log = this.audit_log;
      audit_log.push({ timestamp: new Date(), office: this.office, status: 'waiting' });
    }

    this.update({ status: 'waiting' });
    this.update({ audit_log: audit_log });
    
    return this;
  },

  setDone: function (emp) {
    if (this.audit_log === null)  this.audit_log = [];

    var audit_log = this.audit_log;
    audit_log.push({ timestamp: new Date(), office: this.office, old_status: 'in progress', status: 'done', employee: emp });
    
    this.update({ status: 'done' });
    this.update({ audit_log: audit_log });
    
    return this;
  },

  setInProgress: function (emp) {
    if (this.audit_log === null)  this.audit_log = [];
    
    var audit_log = this.audit_log;
    audit_log.push({ timestamp: new Date(), office: this.office, old_status: 'waiting', status: 'in progress', employee: emp });
    
    this.update({ status: 'in progress' });
    this.update({ audit_log: audit_log });
    
    return this;
  },

  setNext: function () {
    return this.update({ status: 'next' });
  },

  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Meteor.methods({
  addVisitor: function(obj) {
    console.log("CREATE");
    var visitor_id = Visitors.insert(obj);
    var visitor = Visitors.findOne(visitor_id);
    console.log("visitor: ", visitor);

    // FIX: Doesn't appear that setWaiting is working...
    return visitor.setWaiting();
  }
});
