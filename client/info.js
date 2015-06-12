Template.contactInfo.events({
  'click #submit': function (e) {
    e.preventDefault();

    var info = {};
    var obj = {};

    info["first_name"] = $("#first_name").val();
    info["last_name"] = $("#last_name").val();
    info["addr1"] = $("#address_1").val();
    info["addr2"] = $("#address_2").val();
    info["city"] = $("#city").val();
    info["state"] = $("#state").val();
    info["zip"] = $("#zip").val();
    info["ssn"] = $("#ssn").val();
    info["medicaid"] = $("#medicaid").val();
    info["dob"] = $("#dob").val();

    obj["info"] = info;
    obj["program"] = Session.get("program");
    obj["reason"] = Session.get("reason");
    obj["office"] = Session.get("office");

    Visitors.create(obj);

    Meteor.call('addVisitor', obj);
    Router.go('/thankYou');
  }
});
