function submitInfo() {
	var obj = {};
	obj["first_name"] = $("#first_name").value;
	obj["last_name"] = $("#last_name").value;
	obj["addr1"] = $("#address_1").value;
	obj["addr2"] = $("#address_2").value;
	obj["city"] = $("#city").value;
	obj["state"] = $("#state").value;
	obj["zip"] = $("#zip").value;
	obj["ssn"] = $("#ssn").value;
	obj["dob"] = $("#dob").value;
	obj["addr2"] = $("#address_2").value;

	obj["program"] = Session.get("program");
	obj["reason"] = Session.get("reason");

	Visitors.create(obj);
}