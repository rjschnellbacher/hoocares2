if(Meteor.isClient) {
	Template.contactInfo.events({

		'click #submit': function (e) {
			e.preventDefault();
	    var obj = {};
			obj["first_name"] = $("#first_name").val();
			obj["last_name"] = $("#last_name").val();
			obj["addr1"] = $("#address_1").val();
			obj["addr2"] = $("#address_2").val();
			obj["city"] = $("#city").val();
			obj["state"] = $("#state").val();
			obj["zip"] = $("#zip").val();
			obj["ssn"] = $("#ssn").val();
			obj["dob"] = $("#dob").val();
			obj["addr2"] = $("#address_2").val();

			console.log("Session.get('program'): ", Session.get('program'));
			console.log("Session.get('reason'): ", Session.get('reason'));

			obj["program"] = Session.get("program");
			obj["reason"] = Session.get("reason");

			obj["timestamp"] = new Date();
		  obj["office"] = "here";

		  obj["status"] = "waiting";

			console.log("Visitor obj: ", obj);

			Visitors.insert(obj);

			Meteor.call('addVisitor', obj);
      Router.go('/thankYou')
	  }
	});
}
