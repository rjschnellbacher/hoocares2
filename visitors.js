/*

  first_name = str
  last_name = str
  addr1 = str
  addr2 = str
  zip = int
  dob = date

 */


Visitors = new Mongo.Collection('Visitors');

Visitors.helpers({
  update: function (data) {
    if( _.keys(data).every(function(k) { return k.charAt(0) !== '$'; }) )
      data = { $set: data };

    return Visitors.update(this._id, data);
  },

  markDone: function () {
    this.update({ isDone: true });
  }
});

Visitors.create = function(str, obj) {
  if(typeof(str) === 'object') {
    obj = str;
    str = '';
  }

  // stuff
  
  return; //Visitors.insert(obj);
};