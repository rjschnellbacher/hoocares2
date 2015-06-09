/*

  first_name = str
  last_name = str
  addr1 = str
  addr2 = str
  city = str
  state = str
  zip = str
  dob = str
  ssn = str
  medicaid = str
  timestamp
  office = str (location)
  program = str
  reason = str
  status = str (waiting/done/in progress/next)

 */

Visitors = new Mongo.Collection('Visitors');

Visitors.helpers({
  update: function (data) {
    if( _.keys(data).every(function(k) { return k.charAt(0) !== '$'; }) )
      data = { $set: data };

    return Visitors.update(this._id, data);
  },

  setWaiting: function () {
    this.update({ status: "waiting" });
  },

  setDone: function () {
    this.update({ status: "done" });
  },

  setInProgress: function () {
    this.update({ status: "in progress" });
  },

  setNext: function () {
    this.update({ status: "next" });
  }
});

Meteor.methods({
  addVisitor: function(obj) {
    obj["timestamp"] = new Date();
    obj["office"] = "here";

    return Visitors.insert(obj);
  }
});
